import * as React from 'react';
import { Header } from 'shared';
import { OrderList } from 'shared';

export class HomePage extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Header>TRADER DESKTOP</Header>
                {/* <div style={styles.content}>Hello World!</div> */}
                <div>
                    <OrderList />
                </div>
            </div>
        );
    }
}
