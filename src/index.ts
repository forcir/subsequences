import camelcase from "camelcase";
import { merge } from "object-deep-merge";

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

const DEFAULT_SUBSEQUENCE_CONFIG: Subsequence.Config = {
  camelcase: true,
  separator: "_",
};

class Subsequence<V extends string = string, K extends string = string> extends Map<K, V> {
  public constructor(
    entries?: readonly (readonly [K, V])[] | undefined,
    config: Subsequence.Config = DEFAULT_SUBSEQUENCE_CONFIG,
  ) {
    super(entries);

    const { camelcase, separator } = merge(DEFAULT_SUBSEQUENCE_CONFIG, config);

    this.camelcase = camelcase;
    this.separator = separator;
  }

  public static fromArray(inputArray: Array<string>): Array<Array<string>> {
    const subsequences: Array<Array<string>> = [];

    for (const subset of subsets(inputArray)) {
      subsequences.push(subset);
    }

    return subsequences.filter((subsequence) => subsequence.length > 0);
  }

  public static fromString(input: string): Array<Array<string>> {
    const inputArray = input.split("");

    return Subsequence.fromArray(inputArray);
  }

  private composeKeyValuePairs(keys: Array<string>, values: Array<string>) {
    if (keys.length !== values.length) {
      throw `Length of keys (${keys.length}) does not match the length of values (${values.length}).`;
    }

    return keys.reduce((accumulator, key, index) => {
      key = camelcase(key);

      const value = values[index];

      if (typeof value === "undefined") throw `Could not find associative value for key: ${key}`;

      return { ...accumulator, [key]: camelcase(value) };
    }, {});
  }

  public get entrySubsequences() {
    const entries = this.entries();
    const entriesKeyValueArray = Array.from(entries);
    const entriesArray = entriesKeyValueArray.map(([key, value]) => [key, value].join(this.separator));
    return Subsequence.fromArray(entriesArray);
  }

  public get i18nSubsequences() {
    return this.entrySubsequences.reduce((previousValue, currentValue, currentIndex) => {
      const outputKey = currentValue.map((fragment) => camelcase(fragment)).join(this.separator);

      const keys = this.keySubsequences[currentIndex];
      const values = this.valueSubsequences[currentIndex];

      if (!keys) throw `Could not find associated keys for key ${outputKey}`;
      if (!values) throw `Could not find associated values for key ${outputKey}`;

      const outputValues = this.composeKeyValuePairs(keys, values);

      const output: Subsequence.I18nPair = {
        key: outputKey,
        values: outputValues,
      };

      return [...previousValue, output];
    }, [] as Array<Subsequence.I18nPair>);
  }

  public get keySubsequences() {
    const keys = this.keys();
    const keysArray = Array.from(keys);
    return Subsequence.fromArray(keysArray);
  }

  public get valueSubsequences() {
    const values = this.values();
    const valuesArray = Array.from(values);
    return Subsequence.fromArray(valuesArray);
  }
}

interface Subsequence extends Subsequence.Config {}

namespace Subsequence {
  export type Config = { camelcase: boolean; separator: string };
  export type Entry = { keyFragments: Array<string>; values: Record<string, string> };
  export type I18nPair = { key: string; values: Record<string, string> };
}

export { Subsequence };
export default { Subsequence };
