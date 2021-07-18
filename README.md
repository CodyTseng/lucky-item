# lucky-item

[![Build Status](https://travis-ci.com/CodyTseng/lucky-item.svg?branch=master)](https://travis-ci.com/CodyTseng/lucky-item)

Randomly select some items from an array. Also can random based on weights.

```bash
npm install lucky-item --save
```

Eglish | [中文简体](./README_zh.md)

## Usage

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

If you want lucky indexs or items can repeated:

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

Randomly select some indexs from the array.

**@param arr** The array for selection.

**@param count** The number of indexs you want to select.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the array of lucky indexs.

### index

```typescript
index<T>(arr: T[], options?: Options): number;
```

Randomly select an index from the array.

**@param arr** The array for selection.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the lucky index.

### items

```typescript
items<T>(arr: T[], count: number, options?: Options): T[];
```

Randomly select some items from the array.

**@param arr** The array for selection.

**@param count** The number of items you want to select.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the array of lucky items

### item

```typescript
item<T>(arr: T[], options?: Options): T;
```

Randomly select an item from the array.

**@param arr** The array for selection.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the lucky item.

### indexsBy

```typescript
indexsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): number[];
```

Randomly select some indexs from the array based on weights.

**@param arr** The array for selection.

**@param weights** The field name of weights or a function that returns weights.

**@param count** The number of indexs you want to select.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the array of lucky indexs.

### indexBy

```typescript
indexBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): number;
```

Randomly select an index from the array based on weights.

**@param arr** The array for selection.

**@param weights** The field name of weights or a function that returns weights.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the lucky index.

### itemsBy

```typescript
itemsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): T[];
```

Randomly select some items from the array based on weights.

**@param arr** The array for selection.

**@param weights** The field name of weights or a function that returns weights.

**@param count** The number of items you want to select.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the array of lucky items.

### itemBy

```typescript
itemBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): T;
```

Randomly select an item from the array based on weights.

**@param arr** The array for selection.

**@param weights** The field name of weights or a function that returns weights.

**@param options** (optional) For more details, please see the following description of the interface.

**@returns** Returns the lucky item.

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

If `unique` is false, lucky indexs or items can be repeated.

#### random:

Type: `Function`

Default:

```js
function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

A function that return a number between `min` and `max`.

```ts
(min: number, max: number): number
```

### GetWeightsFunc

```typescript
declare interface GetWeightsFunc<T> {
    (a: T): number;
}
```

A function that return weights. This function will be called when we need the weights of an item. This function should return a non-negative number.

## License

[MIT](./LICENSE) © Cody Tseng