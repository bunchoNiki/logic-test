/* eslint-disable @typescript-eslint/no-explicit-any */

export type Target = {
  key: string;
  maskRate: number;
};



export const targetsStandard = [
  { key: "ssn", maskRate: 1.0 },
  { key: "password", maskRate: 1.0 },
  { key: "secret", maskRate: 0.75 },
  { key: "id", maskRate: 0 }
];

export const targetsExtended = [
  { key: "ssn", maskRate: 1.0 },
  { key: "secret", maskRate: 0.75 },
  { key: "id", maskRate: 0 },
  { key: "zipcode", maskRate: 0.5 },
  { key: "isActive", maskRate: 1.0 },
  { key: "metadata", maskRate: 0.8 },
  { key: "deletedAt", maskRate: 1.0 }
];

export const targetsOnlyId = [{ key: "id", maskRate: 0 }];
export const targetsOnlySecretHalfMask = [{ key: "secret", maskRate: 0.5 }];
export const targetsOnlyC = [{ key: "c", maskRate: 0 }];
export const targetsOnlyIsActive = [{ key: "isActive", maskRate: 1.0 }];
export const targetsOnlyDeletedAt = [{ key: "deletedAt", maskRate: 1.0 }];
export const targetsOnlyMetadata = [{ key: "metadata", maskRate: 0.8 }];


export const HTTPS_DATA_FULL_EXAMPLE = [
  '{"id": 1, "secret": "abcdefgh", "isActive": true}',
  '{"user": {"name": "Alice", "ssn": "123456789", "metadata": {"tags": ["a"]}}, "id": 123, "deletedAt": null}'
];
export const HTTPS_DATA_SECRET_FIRST = [
  '{"user": {"secret": "abcdefgh", "name": "Bob"}}', '{"id": 456}'
];
export const HTTPS_DATA_NESTED_C = ['{"a": {"b": {"c": "nested"}}}', '{"d": 1}'];
export const HTTPS_DATA_BOOLEAN = ['{"isActive": true, "id": 1}'];
export const HTTPS_DATA_NULL = ['{"deletedAt": null, "id": 2}'];
export const HTTPS_DATA_OBJECT = ['{"metadata": {"version": 1}, "id": 3}'];
export const HTTPS_DATA_NOT_FOUND = ['{"a": 1}', '{"b": 2}'];
export const HTTPS_DATA_EMPTY_ARRAY = [];
export const HTTPS_DATA_INVALID_JSON = ['{"id": 1}', 'this is not json', '{"secret": "abc"}'];
export const HTTPS_DATA_SECRET_SIX_CHARS = ['{"secret": "123456"}'];


// SSE Style Data
export const SSE_DATA_SSN_ID = [
  'data: {"id": 999, "isActive": false}\ndata: {"user": {"ssn": "987654321"}}'
];
export const SSE_DATA_EMPTY_STRING_IN_ARRAY = [''];
export const SSE_DATA_NO_DATA_PREFIX = ['{"id": 1}'];
export const SSE_DATA_INVALID_JSON = ['data: {}', 'data: {"id": 1}'];


type TestCase = {
  name: string;
  rawData: Array<string>;
  targets: Array<Target>;
  expected: Record<string, any | undefined>;
};

export const testCases: Array<TestCase> = [
  {
    name: 'HTTPS形式: 複数の型が見つかるケース',
    rawData: HTTPS_DATA_FULL_EXAMPLE,
    targets: targetsExtended,
    expected: {
      id: 1,
      secret: "******gh",
      ssn: "*********",
      isActive: true,
      metadata: { tags: ["a"] },
      deletedAt: null,
      zipcode: undefined
    },
  },
    {
    name: 'HTTPS形式: secret(マスクあり)とid(マスクなし)が見つかる',
    rawData: HTTPS_DATA_SECRET_FIRST,
    targets: targetsStandard,
    expected: { ssn: undefined, password: undefined, secret: "******gh", id: 456 },
  },
  {
    name: 'HTTPS形式: ネストしたキー(c)が見つかる',
    rawData: HTTPS_DATA_NESTED_C,
    targets: targetsOnlyC,
    expected: { c: "nested" },
  },
    {
    name: 'HTTPS形式: 真偽値はマスクされない',
    rawData: HTTPS_DATA_BOOLEAN,
    targets: targetsOnlyIsActive,
    expected: { isActive: true },
  },
  {
    name: 'HTTPS形式: Null値はマスクされない',
    rawData: HTTPS_DATA_NULL,
    targets: targetsOnlyDeletedAt,
    expected: { deletedAt: null },
  },
  {
    name: 'HTTPS形式: オブジェクトはマスクされない',
    rawData: HTTPS_DATA_OBJECT,
    targets: targetsOnlyMetadata,
    expected: { metadata: { version: 1 } },
  },
  {
    name: 'HTTPS形式: targetsのキーが見つからない',
    rawData: HTTPS_DATA_NOT_FOUND,
    targets: targetsStandard,
    expected: { ssn: undefined, password: undefined, secret: undefined, id: undefined },
  },
  {
    name: 'HTTPS形式: 入力配列が空',
    rawData: HTTPS_DATA_EMPTY_ARRAY,
    targets: targetsStandard,
    expected: { ssn: undefined, password: undefined, secret: undefined, id: undefined },
  },
  {
    name: 'HTTPS形式: 不正なJSON文字列が含まれる',
    rawData: HTTPS_DATA_INVALID_JSON,
    targets: targetsOnlyId,
    expected: { id: 1 },
  },
    {
    name: 'マスク率50%のテスト (切り上げ)',
    rawData: HTTPS_DATA_SECRET_SIX_CHARS,
    targets: targetsOnlySecretHalfMask,
    expected: { secret: "***456" },
  },
  {
    name: 'SSE形式: id(数値)とssn(マスクあり)が見つかる',
    rawData: SSE_DATA_SSN_ID,
    targets: targetsExtended,
    expected: {
      id: 999,
      secret: undefined,
      ssn: "*********",
      isActive: false,
      metadata: undefined,
      deletedAt: undefined,
      zipcode: undefined
    },
  },
  {
    name: 'SSE形式: 入力配列の要素が空文字列',
    rawData: SSE_DATA_EMPTY_STRING_IN_ARRAY,
    targets: targetsStandard,
    expected: { ssn: undefined, password: undefined, secret: undefined, id: undefined },
  },
  {
    name: 'SSE形式: dataプレフィックスがない不正な形式',
    rawData: SSE_DATA_NO_DATA_PREFIX,
    targets: targetsOnlyId,
    expected: { id: 1 },
  },
  {
    name: 'SSE形式: 不正なJSONが含まれる',
    rawData: SSE_DATA_INVALID_JSON,
    targets: targetsOnlyId,
    expected: { id: undefined },
  },
];
