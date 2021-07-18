
declare interface RandomFunc {
    (min: number, max: number): number;
}

declare interface Options {
    unique?: boolean;
    random?: RandomFunc;
}

declare interface GetWeightsFunc<T> {
    (a: T): number;
}

export class LuckyItem {
    random: RandomFunc;
    unique: boolean;

    constructor(options: Options = {}) {
        this.random = options.random || this._defaultRandom;
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
    indexs<A>(arr: A[], count: number, options: Options = {}): number[] {
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
    index<A>(arr: A[], options: Options = {}): number {
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
    items<A>(arr: A[], count: number, options: Options = {}): A[] {
        return this.indexs(arr, count, options).map(index => arr[index]);
    }

    /**
     * Randomly select an item from the array.
     * 
     * @param {object[]} arr The array for selection.
     * @param {object} options 
     * @returns Returns the lucky item.
     */
    item<A>(arr: A[], options: Options = {}): A {
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
    indexsBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, count: number, options: Options = {}): number[] {
        const unique = options.unique === undefined ? this.unique : options.unique;
        const random = options.random || this.random;
        count = unique && arr.length < count ? arr.length : count;

        const weightsFunc = typeof weights === 'string'
            ? (o: { [x: string]: any; }): number => o[weights]
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
                totalWeights -= find![1];
                arrWithIndex[find![0]][1] = 0;
            }

            return find![0];
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
    indexBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, options: Options = {}): number {
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
    itemsBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, count: number, options: Options = {}): A[] {
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
    itemBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, options: Options = {}): A {
        return arr[this.indexBy(arr, weights, options)];
    }

    private _defaultRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default new LuckyItem();