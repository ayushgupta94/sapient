import * as React from 'react';
import { Header } from 'shared';
import { OrderList } from 'shared';

export class HomePage extends React.Component<{}, {}> {
    public render() {
        const styles = {
            content: {
                padding: 16
            }
        };

        return (
            <div>
                <Header>TRADER DESKTOP</Header>
                {/* <div style={styles.content}>Hello World!</div> */}
                <div style={styles.content}>
                    {' '}
                    <OrderList />
                </div>
            </div>
        );
    }
}
