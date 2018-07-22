import { Order } from '../domain/order';
import { orderStore } from '../stores/order-store';
import { broadcast } from '../adapters/broadcast-service';

class OrderAdapter {
    createOrder = (req, res) => {
        const data= req.body;
        if (Array.isArray(data)) {
            const orderArr=[];
            data.map((order) => {
            const newOrder = new Order(order.id, order.side, order.symbol, order.quantity);
            orderStore.addOrder(newOrder);
            orderArr.push(order);
            });
            broadcast('orderCreated', orderArr);
        } else {
        const order = new Order(data.id, data.side, data.symbol, data.quantity);
        orderStore.addOrder(order);
        broadcast('orderCreated', order);
        }
        res.status(204).send(); // No Content
    };

    getOrders = (req, res) => {
        res.send(orderStore.getOrders());
    };
}

export const orderAdapter = new OrderAdapter();
