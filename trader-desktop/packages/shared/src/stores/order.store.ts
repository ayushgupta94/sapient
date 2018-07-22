import { action, computed, decorate, observable, ObservableMap } from 'mobx';
import { VisibilityFilter } from '../components/test-support/domain/types';
import { JsOrder, Order, Side } from '../domain/order';
import { generateOrder } from './generate-order';

export class OrderStore {
    ordersMap: ObservableMap<string, Order> = observable.map();

    filter: string = VisibilityFilter.ALL;

    numOrdersToCreate: number = 10;

    rootStore: any;
    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.map((jsOrder: any) => {
            return this.ordersMap.set(
                jsOrder.id,
                new Order(
                    jsOrder.id,
                    jsOrder.side as Side,
                    jsOrder.symbol,
                    jsOrder.quantity,
                    jsOrder.committed,
                    jsOrder.executed
                )
            );
        });
    };

    createOrder = (jsOrder: JsOrder | JsOrder[]) => {
        if (Array.isArray(jsOrder)) {
            this.initialize(jsOrder);
        } else {
            this.ordersMap.set(
                jsOrder.id,
                new Order(
                    jsOrder.id,
                    jsOrder.side as Side,
                    jsOrder.symbol,
                    jsOrder.quantity,
                    jsOrder.committed,
                    jsOrder.executed
                )
            );
        }
    };

    updateOrder = (jsOrder: JsOrder) => {
        this.ordersMap.set(
            jsOrder.id,
            new Order(
                jsOrder.id,
                jsOrder.side as Side,
                jsOrder.symbol,
                jsOrder.quantity,
                jsOrder.committed,
                jsOrder.executed
            )
        );
    };

    get numOrders(): number {
        return this.ordersMap.size;
    }

    createOrdersAtServer = (numOrdersToCreate: number) => {
        const { orderAdapter } = this.rootStore.adapters;

        // Create specified number of random JsOrders
        // Use the generateOrder() function for this (described below)
        const orderArr = [];
        let count = numOrdersToCreate;
        if (numOrdersToCreate > 1) {
            while (count > 0) {
                orderArr.push(generateOrder());
                count--;
            }
        }
        // }
        // Send the generated orders to the server using the orderAdapter
        orderAdapter.createOrder(
            numOrdersToCreate > 1 ? orderArr : generateOrder()
        );
    };

    resetServer = () => {
        const { serverAdapter } = this.rootStore.adapters;
        return serverAdapter.reset();
    };

    loadOrders() {
        const { orderAdapter } = this.rootStore.adapters;
        orderAdapter.fetchOrders().then(this.initialize);
    }

    deleteAllOrders() {}

    setFilter(filter: string) {
        this.filter = filter;
    }

    getVisibleOrders = () => {
        let orders = Array.from(this.ordersMap.values());
        switch (this.filter) {
            case 'ALL':
                break;

            case 'OPEN':
                orders = orders.filter(order => {
                    return order.committed > order.executed;
                });
                break;

            case 'DONE':
                orders = orders.filter(order => {
                    return order.committed === order.executed;
                });
                break;

            case 'default':
                orders = [];
        }
        return orders.length > 0 ? orders : [];
    };
}

decorate(OrderStore, {
    ordersMap: observable,
    filter: observable,
    numOrdersToCreate: observable,
    initialize: action,
    createOrder: action,
    updateOrder: action,
    numOrders: computed,
    setFilter: action
});