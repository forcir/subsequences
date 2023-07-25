import { Subsequence } from "../src/index.js";

describe(`Basic Usage`, () => {
    test(`Generate subsequence from Array`, () => {
        const subsequences = Subsequence.fromArray(["1", "2", "3", "4"]);
        expect(subsequences).toHaveLength(15);
    });

    test(`Generate subsequence from String`, () => {
        const subsequences = Subsequence.fromString("1234");
        expect(subsequences).toHaveLength(15);
    });
});

describe(`Advanced Usage`, () => {
    const subsequences = new Subsequence([
        ["first", "1"],
        ["second", "2"],
        ["third", "3"],
        ["fourth", "4"],
    ]);

    test(`entrySubsequences`, () => {
        expect(subsequences.entrySubsequences).toStrictEqual([
            ["first_1", "second_2", "third_3", "fourth_4"],
            ["first_1", "second_2", "third_3"],
            ["first_1", "second_2", "fourth_4"],
            ["first_1", "second_2"],
            ["first_1", "third_3", "fourth_4"],
            ["first_1", "third_3"],
            ["first_1", "fourth_4"],
            ["first_1"],
            ["second_2", "third_3", "fourth_4"],
            ["second_2", "third_3"],
            ["second_2", "fourth_4"],
            ["second_2"],
            ["third_3", "fourth_4"],
            ["third_3"],
            ["fourth_4"],
        ]);
    });

    test(`i18nSubsequences`, () => {
        expect(subsequences.i18nSubsequences).toStrictEqual([
            {
                key: "first1_second2_third3_fourth4",
                values: { first: "1", second: "2", third: "3", fourth: "4" },
            },
            {
                key: "first1_second2_third3",
                values: { first: "1", second: "2", third: "3" },
            },
            {
                key: "first1_second2_fourth4",
                values: { first: "1", second: "2", fourth: "4" },
            },
            { key: "first1_second2", values: { first: "1", second: "2" } },
            {
                key: "first1_third3_fourth4",
                values: { first: "1", third: "3", fourth: "4" },
            },
            { key: "first1_third3", values: { first: "1", third: "3" } },
            { key: "first1_fourth4", values: { first: "1", fourth: "4" } },
            { key: "first1", values: { first: "1" } },
            {
                key: "second2_third3_fourth4",
                values: { second: "2", third: "3", fourth: "4" },
            },
            { key: "second2_third3", values: { second: "2", third: "3" } },
            { key: "second2_fourth4", values: { second: "2", fourth: "4" } },
            { key: "second2", values: { second: "2" } },
            { key: "third3_fourth4", values: { third: "3", fourth: "4" } },
            { key: "third3", values: { third: "3" } },
            { key: "fourth4", values: { fourth: "4" } },
        ]);
    });

    test(`keySubsequences`, () => {
        expect(subsequences.keySubsequences).toStrictEqual([
            ["first", "second", "third", "fourth"],
            ["first", "second", "third"],
            ["first", "second", "fourth"],
            ["first", "second"],
            ["first", "third", "fourth"],
            ["first", "third"],
            ["first", "fourth"],
            ["first"],
            ["second", "third", "fourth"],
            ["second", "third"],
            ["second", "fourth"],
            ["second"],
            ["third", "fourth"],
            ["third"],
            ["fourth"],
        ]);
    });

    test(`valueSubsequences`, () => {
        expect(subsequences.valueSubsequences).toStrictEqual([
            ["1", "2", "3", "4"],
            ["1", "2", "3"],
            ["1", "2", "4"],
            ["1", "2"],
            ["1", "3", "4"],
            ["1", "3"],
            ["1", "4"],
            ["1"],
            ["2", "3", "4"],
            ["2", "3"],
            ["2", "4"],
            ["2"],
            ["3", "4"],
            ["3"],
            ["4"],
        ]);
    });
});
