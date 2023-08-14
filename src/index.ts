import camelcase from "camelcase";
import { merge } from "object-deep-merge";

import type { Config, I18nPair, SubsequenceInterface } from "./types.js";

function* subsets(array: Array<string>, offset = 0): Generator<Array<string>> {
    while (offset < array.length) {
        const first = array[offset++];
        for (const subset of subsets(array, offset)) {
            if (first) subset.unshift(first);
            yield subset;
        }
    }
    yield [];
}

const DEFAULT_SUBSEQUENCE_CONFIG: Config = {
    camelcase: true,
    separator: "_",
};

class Subsequence<TValue extends string = string, TKey extends string = string>
    extends Map<TKey, TValue>
    implements SubsequenceInterface
{
    camelcase: boolean;
    separator: string;

    public constructor(
        entries?: readonly (readonly [TKey, TValue])[] | undefined,
        config: Config = DEFAULT_SUBSEQUENCE_CONFIG,
    ) {
        super(entries);

        const { camelcase, separator } = merge(DEFAULT_SUBSEQUENCE_CONFIG, config);

        this.camelcase = camelcase;
        this.separator = separator;
    }

    public static fromArray(inputArray: Array<string>): Array<Array<string>> {
        return [...subsets(inputArray)].filter((subsequence) => subsequence.length > 0);
    }

    public static fromString(input: string): Array<Array<string>> {
        return Subsequence.fromArray([...input]);
    }

    private composeKeyValuePairs(keys: Array<string>, values: Array<string>): Record<string, string> {
        if (keys.length !== values.length) {
            throw `Length of keys (${keys.length}) does not match the length of values (${values.length}).`;
        }

        const output: Record<string, string> = {};

        for (const [index, key] of keys.entries()) {
            const camelcaseKey = camelcase(key);
            const value = values[index];
            if (value === undefined) throw `Could not find associative value for key: ${key}`;

            output[camelcaseKey] = camelcase(value);
        }

        return output;
    }

    public get entrySubsequences(): Array<Array<string>> {
        const entries = this.entries();
        const entriesArray = [...entries].map(([key, value]) => [key, value].join(this.separator));
        return Subsequence.fromArray(entriesArray);
    }

    public get i18nSubsequences(): Array<I18nPair> {
        const output: Array<I18nPair> = [];

        for (const [index, entry] of this.entrySubsequences.entries()) {
            const outputKey = entry.map((fragment) => camelcase(fragment)).join(this.separator);

            const keys = this.keySubsequences[index];
            const values = this.valueSubsequences[index];

            if (!keys) throw `Could not find associated keys for key ${outputKey}`;
            if (!values) throw `Could not find associated values for key ${outputKey}`;

            const outputValues = this.composeKeyValuePairs(keys, values);

            const pair: I18nPair = {
                key: outputKey,
                values: outputValues,
            };

            output.push(pair);
        }

        return output;
    }

    public get keySubsequences(): Array<Array<string>> {
        return Subsequence.fromArray([...this.keys()]);
    }

    public get valueSubsequences(): Array<Array<string>> {
        return Subsequence.fromArray([...this.values()]);
    }
}

export { Subsequence };
export default { Subsequence };
export * from "./types.js";
