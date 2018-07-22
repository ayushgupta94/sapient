import { JsOrder } from '../../domain/order';

export interface OrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any>;
    fetchOrders(): Promise<JsOrder[]>;
}

export class MockOrderAdapter implements OrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any> {
        return Promise.resolve();
    }

    fetchOrders(): Promise<JsOrder[]> {
        return Promise.resolve([]);
    }
}
