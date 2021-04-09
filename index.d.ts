
export default lucky;
export let LuckyItem: LuckyItem;

declare let lucky: Lucky;

declare interface Lucky {

    /**
     * Randomly select some indexs from the array.
     * 
     * @param arr The array for selection.
     * @param count The number of indexs you want to select.
     * @param options 
     * @returns Returns the array of lucky indexs.
     */
    indexs<T>(arr: T[], count: number, options?: Options): number[];

    /**
     * Randomly select an index from the array.
     * 
     * @param arr The array for selection.
     * @param options 
     * @returns Returns the lucky index.
     */
    index<T>(arr: T[], options?: Options): number;

    /**
     * Randomly select some items from the array.
     * 
     * @param arr The array for selection.
     * @param count The number of items you want to select.
     * @param options 
     * @returns Returns the array of lucky items
     */
    items<T>(arr: T[], count: number, options?: Options): T[];

    /**
     * Randomly select an item from the array.
     * 
     * @param arr The array for selection.
     * @param options 
     * @returns Returns the lucky item.
     */
    item<T>(arr: T[], options?: Options): T;


    /**
     * Randomly select some indexs from the array based on weights.
     * 
     * @param arr The array for selection.
     * @param weights The field name of weights or a function that returns weights.
     * @param count The number of indexs you want to select.
     * @param options 
     * @returns Returns the array of lucky indexs.
     */
    indexsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): number[];

    /**
     * Randomly select an index from the array based on weights.
     * 
     * @param arr The array for selection.
     * @param weights The field name of weights or a function that returns weights.
     * @param options 
     * @returns Returns the lucky index.
     */
    indexBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): number;

    /**
     * Randomly select some items from the array based on weights.
     * 
     * @param arr The array for selection.
     * @param weights The field name of weights or a function that returns weights.
     * @param count The number of items you want to select.
     * @param options 
     * @returns Returns the array of lucky items.
     */
    itemsBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, count: number, options?: Options): T[];

    /**
     * Randomly select an item from the array based on weights.
     * 
     * @param arr The array for selection.
     * @param weights The field name of weights or a function that returns weights.
     * @param options 
     * @returns Returns the lucky item.
     */
    itemBy<T>(arr: T[], weights: string | GetWeightsFunc<T>, options?: Options): T;
}

declare interface RandomFunc {
    (min: number, max: number): number;
}

declare interface GetWeightsFunc<T> {
    (a: T): number;
}

declare interface Options {
    unique?: boolean;
    random?: RandomFunc;
}

declare interface LuckyItem {
    new(options?: Options): Lucky;
}