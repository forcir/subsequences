<p align="center"></p>
<div align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://pqt.s3.ca-central-1.amazonaws.com/subsequences/assets/images/logos/dark.png?1" height="64">
        <img alt="Subsequences Title Image (Logo)" src="https://pqt.s3.ca-central-1.amazonaws.com/subsequences/assets/images/logos/light.png?1" height="64">
    </picture>
</div>
<p align="center"><strong>A subsequence is a sequence that can be derived from another sequence by removing zero or more elements, without changing the order of the remaining elements.</strong></p>

<p align="center"></p>

## Install

```bash
pnpm add subsequences
```

```bash
yarn add subsequences
```

```bash
npm install subsequences
```

## Basic Usage

```ts
import { Subsequence } from "subsequences";
```

### Generate subsequence from Array

```ts
const subsequences = Subsequence.fromArray(["1", "2", "3", "4"]);

console.log({ subsequences });
```

<details><summary>Output</summary>

```json
{
  "subsequences": [
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
    ["4"]
  ]
}
```

</details>

### Generate subsequence from String

```ts
const subsequences = Subsequence.fromString("1234");

console.log({ subsequences });
```

<details><summary>Output</summary>

```json
{
  "subsequences": [
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
    ["4"]
  ]
}
```

</details>

## Advanced Usage

### Instantiate with Map (Key/Value Pairs)

```ts
import { Subsequence } from "subsequences";

const subsequences = new Subsequence([
  ["first", "1"],
  ["second", "2"],
  ["third", "3"],
  ["fourth", "4"],
]);

console.log(subsequences.entrySubsequences);
console.log(subsequences.i18nSubsequences);
console.log(subsequences.keySubsequences);
console.log(subsequences.valueSubsequences);
```

<details><summary>entrySubsequences output</summary>

```json
[
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
  ["fourth_4"]
]
```

</details>

<details><summary>i18nSubsequences output</summary>

```json
[
  {
    "key": "first1_second2_third3_fourth4",
    "values": { "first": "1", "second": "2", "third": "3", "fourth": "4" }
  },
  {
    "key": "first1_second2_third3",
    "values": { "first": "1", "second": "2", "third": "3" }
  },
  {
    "key": "first1_second2_fourth4",
    "values": { "first": "1", "second": "2", "fourth": "4" }
  },
  { "key": "first1_second2", "values": { "first": "1", "second": "2" } },
  {
    "key": "first1_third3_fourth4",
    "values": { "first": "1", "third": "3", "fourth": "4" }
  },
  { "key": "first1_third3", "values": { "first": "1", "third": "3" } },
  { "key": "first1_fourth4", "values": { "first": "1", "fourth": "4" } },
  { "key": "first1", "values": { "first": "1" } },
  {
    "key": "second2_third3_fourth4",
    "values": { "second": "2", "third": "3", "fourth": "4" }
  },
  { "key": "second2_third3", "values": { "second": "2", "third": "3" } },
  { "key": "second2_fourth4", "values": { "second": "2", "fourth": "4" } },
  { "key": "second2", "values": { "second": "2" } },
  { "key": "third3_fourth4", "values": { "third": "3", "fourth": "4" } },
  { "key": "third3", "values": { "third": "3" } },
  { "key": "fourth4", "values": { "fourth": "4" } }
]
```

</details>

<details><summary>keySubsequences output</summary>

```json
[
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
  ["fourth"]
]
```

</details>

<details><summary>valueSubsequences output</summary>

```json
[
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
  ["4"]
]
```

</details>
