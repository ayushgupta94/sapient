import { Order, Side, Placement, Execution } from '../domain';
import { jsOrders, jsPlacements, jsExecutions } from '../data/index';
export function loadOrders(): Map<string, Order> {
    // TODO: load JS orders from ../../data and convert them to Order objects
    const ordersMap: Map<string, Order> = new Map<string, Order>();
    // let executionObj : any = objectMapper(jsExecutions,'placementId');
    // let placementObj: any = objectMapper(jsPlacements,'orderId');
    // console.log(placementObj);

    jsOrders.map((order) => {
        const orderObj = new Order(order.id, order.side as Side, order.symbol, order.quantity);
        jsPlacements.map(placement => {
            if (placement.orderId === order.id) {
                const placementObj = new Placement(placement.id, placement.side as Side, placement.symbol, placement.quantity);
                jsExecutions.map(execution => {
                    const executionObj = new Execution(execution.id, execution.quantity);
                    if (execution.placementId === placement.id) {
                        placementObj.executionMap.set(execution.id, executionObj)
                    }
                })
                orderObj.placementMap.set(placement.id, placementObj);
            }
        })
        ordersMap.set(order.id, orderObj);
    })
    return ordersMap;
}
















// function objectMapper(data: any,key:any){
//     var result: { [key: string]: any[] } = {};
//     data.map((item:any) =>{
//         return Array.isArray(result[item[key]])? result[item[key]].push(item): result[item[key]]=[item];
//     }) 
//     return result;
// }


// let obj={
//     id: 'o100',
//     side: 'BUY',
//     symbol: 'AAPL',
//     quantity: 10000,
//     placementMap: [
//         {'p110': {
//             id: 'p110',
//             side: 'BUY',
//             symbol: 'AAPL',
//             quantity: 3000,
//             orderId: 'o100',
//             executionMap: [
//                 {'e111': {
//                     id: 'e111',
//                     quantity: 1500,
//                     placementId: 'p110'
//                 }},
//                 {'e112': {
//                     id: 'e112',
//                     quantity: 500,
//                     placementId: 'p110'
//                 }}
//             ]
//         }},
//          {'p120': {
//             id: 'p120',
//             side: 'BUY',
//             symbol: 'AAPL',
//             quantity: 4000,
//             orderId: 'o100',
//             executionMap: [
//          {'e121': {
//                     id: 'e121',
//                     quantity: 800,
//                     placementId: 'p120'
//                 }},
//         {'e112': {
//                     id: 'e122',
//                     quantity: 1200,
//                     placementId: 'p120'
//                 }}
//             ]
//         }}
//     ]
// };

// var x: Map<string, Order> = new Map<string, Order>();
// x.set('0100',obj);
// return x;