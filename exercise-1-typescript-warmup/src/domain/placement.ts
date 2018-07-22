import { Execution } from './execution';
import { Side } from './types';

/**
 * A buy or sell order placed with a broker.
 */
export class Placement {
    executionMap: Map<string, Execution> = new Map();

    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number
    ) { }

    execute(execution: Execution) {
        this.executionMap.set(execution.id, execution);
    }

    get done(): number {
        const executionArr = Array.from(this.executionMap);

        // TODO: Convert executionMap into an array
        // Use the array reduce function to compute done


        const result = executionArr.reduce((acc, [key, value]) => {
            return acc + value.quantity;
        }, 0);
        return result;
    }
}
