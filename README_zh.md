# lucky-item

从集合中随机抽出几个元素，也可以根据元素的权重进行抽取。

```bash
npm install lucky-item --save
```

[Eglish](./README.md) | 中文简体

## 使用

```js
const lucky = require('lucky-item');

const arr = [
    { id: 1, weight: 10 },
    { id: 2, weight: 20 },
    { id: 3, weight: 40 },
    { id: 4, weight: 80 },
    { id: 5, weight: 160 },
    { id: 6, weight: 320 },
    { id: 7, weight: 640 },
    { id: 8, weight: 1280 },
    { id: 9, weight: 2560 },
    { id: 10, weight: 5120 },
];

lucky.indexs(arr, 3);
// [ 3, 8, 5 ]

lucky.index(arr);
// 4

lucky.items(arr, 3);
// [
//   { id: 7, weight: 640 },
//   { id: 8, weight: 1280 },
//   { id: 2, weight: 20 }
// ]

lucky.item(arr);
// { id: 10, weight: 5120 }

lucky.indexsBy(arr, 'weight', 3);
// [ 9, 8, 3 ]

lucky.indexBy(arr, 'weight');
// 9

lucky.itemsBy(arr, 'weight', 3);
// [
//   { id: 10, weight: 5120 },
//   { id: 9, weight: 2560 },
//   { id: 6, weight: 320 }
// ]

lucky.itemBy(arr, 'weight');
// { id: 10, weight: 5120 }
```

如果你希望幸运下标或幸运条目可重复：

```js
const arr = [
    { id: 1, weight: 10 },
    { id: 2, weight: 20 },
    { id: 3, weight: 40 },
    { id: 4, weight: 80 },
    { id: 5, weight: 160 },
    { id: 6, weight: 320 },
    { id: 7, weight: 640 },
    { id: 8, weight: 1280 },
    { id: 9, weight: 2560 },
    { id: 10, weight: 5120 },
];

// Method 1:
const lucky = require('lucky-item');

lucky.itemsBy(arr, 'weight', 3, { unique: false });
// [
//   { id: 10, weight: 5120 },
//   { id: 9, weight: 2560 },
//   { id: 10, weight: 5120 }
// ]

// Method 2:
const LuckyItem = require('lucky-item').LuckyItem;
const repeatableLucky = new LuckyItem({ unique: false });

repeatableLucky.itemsBy(arr, 'weight', 3);
// [
//   { id: 10, weight: 5120 },
//   { id: 4, weight: 80 },
//   { id: 10, weight: 5120 }
// ]

```

## API

### indexs

```typescript
indexs<T>(arr: T[], count: number, options?: Options): number[];
```

从 `arr` 中随机出若干个幸运下标。

**@param arr** 供随机的集合。

**@param count** 要随机出的下标数。

**@param options** （可选）可配置参数看下文。

**@returns** 返回幸运下标数组。

### index

```typescript
index<T>(arr: T[], options?: Options): number;
```

从 `arr` 中随机出一个幸运下标。

**@param arr** 供随机的集合。

**@param options** （可选）可配置参数看下文。

**@returns** 返回一个幸运下标。

### items

```typescript
items<T>(arr: T[], count: number, options?: Options): T[];
```

从 `arr` 中随机出若干个幸运条目。

**@param arr** 供随机的集合。

**@param count** 要随机出的条目数

**@param options** （可选）可配置参数看下文。

**@returns** 返回幸运条目数组。

### item

```typescript
item<T>(arr: T[], options?: Options): T;
```

从 `arr` 中随机出一个幸运条目。

**@param arr** 供随机的集合。

**@param options** （可选）可配置参数看下文。

**@returns** 返回一个幸运条目。

### indexsBy

```typescript
indexsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): number[];
```

根据条目权重从 `arr` 中随机出若干个幸运下标。

**@param arr** 供随机的集合。

**@param weights** 权重的字段名或计算出权重的函数。

**@param count** 要随机出的下标数。

**@param options** （可选）可配置参数看下文。

**@returns** 返回幸运下标数组。

### indexBy

```typescript
indexBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): number;
```

根据条目权重从 `arr` 中随机出一个幸运下标。

**@param arr** 供随机的集合。

**@param weights** 权重的字段名或计算出权重的函数。

**@param options** （可选）可配置参数看下文。

**@returns** 返回一个幸运下标。

### itemsBy

```typescript
itemsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): T[];
```

根据条目权重从 `arr` 中随机出若干个幸运条目。

**@param arr** 供随机的集合。

**@param weights** 权重的字段名或计算出权重的函数。

**@param count** 要随机出的条目数。

**@param options** （可选）可配置参数看下文。

**@returns** 返回幸运条目数组。

### itemBy

```typescript
itemBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): T;
```

根据条目权重从 `arr` 中随机出一个幸运条目。

**@param arr** 供随机的集合。

**@param weights** 权重的字段名或计算出权重的函数。

**@param options** （可选）可配置参数看下文。

**@returns** 返回一个幸运条目。

## Interface

### Options

```typescript
declare interface Options {
    unique?: boolean;
    random?: RandomFunc;
}
```

#### unique:

Type: `boolean`

Default: `true`

如果该值为 `false` ，则随机出的幸运下标或幸运条目可重复。

#### random:

Type: `Function`

Default:

```js
function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

用于生成一个在 `min` 和 `max` 之间的数（包含 `min` 和 `max`）。

```ts
(min: number, max: number): number
```

### GetWeightsFunc

```typescript
declare interface GetWeightsFunc<T> {
    (a: T): number;
}
```

用户计算条目权重的函数，传入一个条目，返回该条目的权重。

## License

[MIT](./LICENSE) © Cody Tseng