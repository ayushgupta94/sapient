import { v4 } from 'uuid';
import { JsOrder } from '../domain/order';

const sides = ['BUY', 'SELL'];
const symbols = [
    'AAPL',
    'ADBE',
    'AKAM',
    'AMD',
    'AMZN',
    'BA',
    'BAC',
    'CCE',
    'CL',
    'CSCO',
    'CVX',
    'DIS',
    'DOW',
    'DWA',
    'EA',
    'EBAY',
    'EMC',
    'EMN',
    'GE',
    'GOOG',
    'GS',
    'K',
    'MSFT',
    'NU',
    'RTN',
    'TSLA',
    'TWTR',
    'URBN'
];
const numSymbols = symbols.length;

export const generateOrder = (): JsOrder => {
    return {
        id: v4(),
        side: sides[Math.floor(Math.random() * sides.length)],
        symbol: symbols[Math.floor(Math.random() * numSymbols)],
        quantity: Math.floor(Math.random() * 1000001),
        committed: 0,
        executed: 0
    };
};
