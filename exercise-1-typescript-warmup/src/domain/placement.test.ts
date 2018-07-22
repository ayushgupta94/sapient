import { Execution } from './execution';
import { Placement } from './placement';
import { Side } from './types';

test('A partially executed placement returns the correct done quantity', () => {
    const placement = new Placement('p110', Side.BUY, 'AAPL', 3000);
    const execution = new Execution('e111', 300);
    placement.execute(execution);
    // const execution1 = new Execution('e112', 400);
    // placement.execute(execution1);
    expect(placement.done).toBeCloseTo(300);
});
