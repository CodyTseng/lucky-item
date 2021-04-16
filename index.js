
'use strict';

module.exports = new LuckyItem();
module.exports.LuckyItem = LuckyItem;

function LuckyItem(options = {}) {
    this.random = options.random || _random;
    this.unique = options.unique === undefined ? true : options.unique;
}

/**
 * Randomly select some indexs from the array.
 * 
 * @param {object[]} arr The array for selection.
 * @param {number} count The number of indexs you want to select.
 * @param {object} options 
 * @returns Returns the array of lucky indexs.
 */
LuckyItem.prototype.indexs = function (arr, count, options = {}) {
    const unique = options.unique === undefined ? this.unique : options.unique;
    const random = options.random || this.random;
    count = unique && arr.length < count ? arr.length : count;

    const indexs = [...new Array(arr.length).keys()];
    return [...new Array(count)].map(() => unique
        ? indexs.splice(random(0, indexs.length - 1), 1)[0]
        : indexs[random(0, indexs.length - 1)]
    );
}

/**
 * Randomly select an index from the array.
 * 
 * @param {object[]} arr The array for selection.
 * @param {object} options 
 * @returns Returns the lucky index.
 */
LuckyItem.prototype.index = function (arr, options = {}) {
    return this.indexs(arr, 1, options)[0];
}

/**
 * Randomly select some items from the array.
 * 
 * @param {object[]} arr The array for selection.
 * @param {number} count The number of items you want to select.
 * @param {object} options 
 * @returns Returns the array of lucky items
 */
LuckyItem.prototype.items = function (arr, count, options = {}) {
    return this.indexs(arr, count, options).map(index => arr[index]);
}

/**
 * Randomly select an item from the array.
 * 
 * @param {object[]} arr The array for selection.
 * @param {object} options 
 * @returns Returns the lucky item.
 */
LuckyItem.prototype.item = function (arr, options = {}) {
    return arr[this.index(arr, options)];
}

/**
 * Randomly select some indexs from the array based on weights.
 * 
 * @param {object[]} arr The array for selection.
 * @param {string | Function} weights The field name of weights or a function that returns weights.
 * @param {number} count The number of indexs you want to select.
 * @param {object} options 
 * @returns Returns the array of lucky indexs.
 */
LuckyItem.prototype.indexsBy = function (arr, weights, count, options = {}) {
    const unique = options.unique === undefined ? this.unique : options.unique;
    const random = options.random || this.random;
    count = unique && arr.length < count ? arr.length : count;

    const weightsFunc = typeof weights === 'string'
        ? o => o[weights]
        : weights;
    const weightsArr = arr.map(a => weightsFunc(a));

    let totalWeights = weightsArr.reduce((acc, cur) => acc + cur, 0);
    const arrWithIndex = weightsArr.map((value, index) => [index, value]);

    return [...new Array(count)].map(() => {
        const randomInt = random(1, totalWeights);
        let startWeight = 0;
        const find = arrWithIndex.find(a => {
            startWeight += a[1];
            return startWeight >= randomInt;
        });

        if (unique) {
            totalWeights -= find[1];
            arrWithIndex[find[0]][1] = 0;
        }

        return find[0];
    });
}

/**
 * Randomly select an index from the array based on weights.
 * 
 * @param {object[]} arr The array for selection.
 * @param {string | Function} weights The field name of weights or a function that returns weights.
 * @param {object} options 
 * @returns Returns the lucky index.
 */
LuckyItem.prototype.indexBy = function (arr, weights, options = {}) {
    return this.indexsBy(arr, weights, 1, options)[0];
}

/**
 * Randomly select some items from the array based on weights.
 * 
 * @param {object[]} arr The array for selection.
 * @param {string | Function} weights The field name of weights or a function that returns weights.
 * @param {number} count The number of items you want to select.
 * @param {object} options 
 * @returns Returns the array of lucky items.
 */
LuckyItem.prototype.itemsBy = function (arr, weights, count, options = {}) {
    return this.indexsBy(arr, weights, count, options).map(index => arr[index]);
}

/**
 * Randomly select an item from the array based on weights.
 * 
 * @param {object[]} arr The array for selection.
 * @param {string | Function} weights The field name of weights or a function that returns weights.
 * @param {object} options 
 * @returns Returns the lucky item.
 */
LuckyItem.prototype.itemBy = function (arr, weights, options = {}) {
    return arr[this.indexBy(arr, weights, options)];
}

function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}