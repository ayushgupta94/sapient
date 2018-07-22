import { MockOrderAdapter } from './mock-order.adapter';
import { MockServerAdapter } from './mock-server.adapter';
import { OrderStore } from '../order.store';

export default class TestRootStore {
    orderStore = new OrderStore(this);

    // Adapters for use by all stores
    adapters = {
        orderAdapter: new MockOrderAdapter(),
        serverAdapter: new MockServerAdapter()
    };
}
