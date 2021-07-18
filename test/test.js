'use strict';

const expect = require('chai').expect;
const { LuckyItem, default: defaultLucky } = require('../lucky-item');

describe('test', () => {
  let lucky;

  before(() => {
    lucky = new LuckyItem({
      unique: true,
      random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    });
  });

  it('default', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];

    const luckyItem = defaultLucky.item(arr);
    expect(luckyItem).to.be.oneOf(arr);
  });

  it('items', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const count = 3;

    const luckyItems = lucky.items(arr, count);
    expect(luckyItems).to.have.lengthOf(count);
    expect(new Set(luckyItems).size).equal(count);
    luckyItems.forEach((item) => {
      expect(item).to.be.oneOf(arr);
    });

    const items = lucky.items(arr, arr.length + 1);
    expect(items).to.have.lengthOf(arr.length);
    expect(new Set(items).size).equal(arr.length);
    items.forEach((item) => {
      expect(item).to.be.oneOf(arr);
    });
  });

  it('item', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];

    const luckyItem = lucky.item(arr, { unique: false });
    expect(luckyItem).to.be.oneOf(arr);
  });

  it('itemsBy', () => {
    const arr = [
      { title: 'a', weights: 10 },
      { title: 'b', weights: 20 },
      { title: 'c', weights: 40 },
      { title: 'd', weights: 80 },
      { title: 'e', weights: 160 },
    ];
    const count = 3;

    const luckyItems = lucky.itemsBy(arr, 'weights', count);
    expect(luckyItems).to.have.lengthOf(count);
    expect(new Set(luckyItems).size).equal(count);
    luckyItems.forEach((item) => {
      expect(item).to.be.oneOf(arr);
    });

    const items = lucky.itemsBy(arr, 'weights', arr.length + 1);
    expect(items).to.have.lengthOf(arr.length);
    expect(new Set(items).size).equal(arr.length);
    items.forEach((item) => {
      expect(item).to.be.oneOf(arr);
    });
  });

  it('itemBy', () => {
    const arr = [
      { title: 'a', weights: 10 },
      { title: 'b', weights: 20 },
      { title: 'c', weights: 40 },
      { title: 'd', weights: 80 },
      { title: 'e', weights: 160 },
    ];

    const getWeight = (o) => o.weights;
    const luckyItem = lucky.itemBy(arr, getWeight, { unique: false });
    expect(luckyItem).to.be.oneOf(arr);
  });
});
