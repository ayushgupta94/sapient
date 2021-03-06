import { RouterState, RouterStore } from 'mobx-state-router';
import { HttpOrderAdapter, MockServerAdapter, OrderStore } from 'shared';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore = new RouterStore(this, routes, notFound);
    orderStore = new OrderStore(this);
    adapters = {
        orderAdapter: new HttpOrderAdapter(),
        serverAdapter: new MockServerAdapter()
    };
    // ----- Lifecycle hooks -----
    // Useful for starting and stopping observers, autoruns and reactions

    init() {}

    destroy() {}
}
