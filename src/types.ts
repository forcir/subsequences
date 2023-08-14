interface SubsequenceInterface extends Config {}

type Config = { camelcase: boolean; separator: string };
type Entry = { keyFragments: Array<string>; values: Record<string, string> };
type I18nPair = { key: string; values: Record<string, string> };

export type { Config, Entry, I18nPair, SubsequenceInterface };
