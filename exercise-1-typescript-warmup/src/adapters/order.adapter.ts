import { Order, Side, Placement, Execution } from '../domain';
import { jsOrders, jsPlacements, jsExecutions } from '../data/index';

// This function denormalise the order,placement and execution.It returns orders having their placement and executions linked to them.
export function loadOrders(): Map<string, Order> {
    // TODO: load JS orders from ../../data and convert them to Order objects
    const ordersMap: Map<string, Order> = new Map<string, Order>();
    let executionIns: any = objectMapper(jsExecutions, 'placementId');
    let placementIns: any = objectMapper(jsPlacements, 'orderId');

    jsOrders.map((order) => {
        const orderObj = new Order(order.id, order.side as Side, order.symbol, order.quantity);
        placementIns[order.id] && placementIns[order.id].map((placement: any) => {
            const placementObj = new Placement(placement.id, placement.side as Side, placement.symbol, placement.quantity);
            executionIns[placement.id] && executionIns[placement.id].map((execution: any) => {
                const executionObj = new Execution(execution.id, execution.quantity);
                placementObj.executionMap.set(execution.id, executionObj)
            })
            orderObj.placementMap.set(placement.id, placementObj);
        })
        ordersMap.set(order.id, orderObj);
    })
    return ordersMap;
}

function objectMapper(data: any, key: any) {
    var result: { [key: string]: any[] } = {};
    data.map((item: any) => {
        return Array.isArray(result[item[key]]) ? result[item[key]].push(item) : result[item[key]] = [item];
    })
    return result;
}