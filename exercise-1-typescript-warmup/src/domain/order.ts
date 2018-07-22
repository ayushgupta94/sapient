import { Placement } from './placement';
import { Side } from './types';

export interface OrderStatus {
    committed: number;
    done: number;
    notDone: number;
    uncommitted: number;
    pctDone: number;
    pctNotDone: number;
    pctUncommitted: number;
}

/**
 * An order to buy or sell a security for a specific fund.
 */
export class Order {
    placementMap: Map<string, Placement> = new Map();

    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number
    ) { }

    place(placement: Placement) {
        this.placementMap.set(placement.id, placement);
    }

    get status(): OrderStatus {
        // TODO: Convert placementMap into an array
        // Use the array reduce function to compute OrderStatus
  
        let done = 0;
        const committed = Array.from(this.placementMap).reduce((totalPlacement, [pKey, pValue]) => {
            const map = Array.from(pValue.executionMap);
            const res = map.reduce((totalExecution, [eKey, eValue]) => {
                return totalExecution + eValue.quantity;
            }, 0);
            done += res;
            return totalPlacement + pValue.quantity;
        }, 0);

        const notDone = committed - done;
        const uncommitted = this.quantity - committed;

        return {
            committed,
            done,
            notDone,
            uncommitted,
            pctDone: done / this.quantity,
            pctNotDone: notDone / this.quantity,
            pctUncommitted: uncommitted / this.quantity
        };
    }
}




  // const pctDone = done / this.quantity;
        // const pctNotDone = notDone / this.quantity;
        // const pctUncommitted = uncommitted / this.quantity;
