interface RandomFunc {
    (min: number, max: number): number;
}
interface Options {
    unique?: boolean;
    random?: RandomFunc;
}
interface GetWeightsFunc<T> {
    (a: T): number;
}
export declare class LuckyItem {
    random: RandomFunc;
    unique: boolean;
    constructor(options?: Options);
    /**
     * Randomly select some indexs from the array.
     *
     * @param {object[]} arr The array for selection.
     * @param {number} count The number of indexs you want to select.
     * @param {object} options
     * @returns Returns the array of lucky indexs.
     */
    indexs<A>(arr: A[], count: number, options?: Options): number[];
    /**
     * Randomly select an index from the array.
     *
     * @param {object[]} arr The array for selection.
     * @param {object} options
     * @returns Returns the lucky index.
     */
    index<A>(arr: A[], options?: Options): number;
    /**
     * Randomly select some items from the array.
     *
     * @param {object[]} arr The array for selection.
     * @param {number} count The number of items you want to select.
     * @param {object} options
     * @returns Returns the array of lucky items
     */
    items<A>(arr: A[], count: number, options?: Options): A[];
    /**
     * Randomly select an item from the array.
     *
     * @param {object[]} arr The array for selection.
     * @param {object} options
     * @returns Returns the lucky item.
     */
    item<A>(arr: A[], options?: Options): A;
    /**
     * Randomly select some indexs from the array based on weights.
     *
     * @param {object[]} arr The array for selection.
     * @param {string | Function} weights The field name of weights or a function that returns weights.
     * @param {number} count The number of indexs you want to select.
     * @param {object} options
     * @returns Returns the array of lucky indexs.
     */
    indexsBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, count: number, options?: Options): number[];
    /**
     * Randomly select an index from the array based on weights.
     *
     * @param {object[]} arr The array for selection.
     * @param {string | Function} weights The field name of weights or a function that returns weights.
     * @param {object} options
     * @returns Returns the lucky index.
     */
    indexBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, options?: Options): number;
    /**
     * Randomly select some items from the array based on weights.
     *
     * @param {object[]} arr The array for selection.
     * @param {string | Function} weights The field name of weights or a function that returns weights.
     * @param {number} count The number of items you want to select.
     * @param {object} options
     * @returns Returns the array of lucky items.
     */
    itemsBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, count: number, options?: Options): A[];
    /**
     * Randomly select an item from the array based on weights.
     *
     * @param {object[]} arr The array for selection.
     * @param {string | Function} weights The field name of weights or a function that returns weights.
     * @param {object} options
     * @returns Returns the lucky item.
     */
    itemBy<A>(arr: A[], weights: string | GetWeightsFunc<A>, options?: Options): A;
    private _defaultRandom;
}
declare const _default: LuckyItem;
export default _default;
