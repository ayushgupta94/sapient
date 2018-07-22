/* tslint:disable:no-console */

import { loadOrders } from './adapters/order.adapter';
import { Order, OrderStatus, Side } from './domain';

const orderMap = loadOrders();
Array.from(orderMap).map(([k, v]) => { console.log(v.status) });
// TODO: iterate through orders and log their status
console.log(`${orderMap.size} orders`);
