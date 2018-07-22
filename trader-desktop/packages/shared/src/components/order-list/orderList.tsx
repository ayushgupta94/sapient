import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Order } from '../../domain/order';
import { OrderView } from './OrderView';

const styles = (theme: Theme) => ({
    table: {
        width: '100%'
    },
    tableRow: {
        width: '10%'
    }
});

const decorate = withStyles(styles);

export interface OrderListProps {
    rootStore?: any;
    children?: any;
}

export const OrderList = inject('rootStore')(
    decorate<OrderListProps>(
        observer(
            class extends React.Component<
                OrderListProps & WithStyles<'table' | 'tableRow'>
            > {
                render() {
                    const { classes } = this.props;
                    const { orderStore } = this.props.rootStore;

                    return (
                        <table className={classes.table}>
                            <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th className={classes.tableRow}>Side</th>
                                    <th className={classes.tableRow}>Symbol</th>
                                    <th className={classes.tableRow}>
                                        Quantity
                                    </th>
                                    <th className={classes.tableRow}>
                                        Executed
                                    </th>
                                    <th className={classes.tableRow}>
                                        Commited
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderStore
                                    .getVisibleOrders()
                                    .map((order: Order, index: number) => (
                                        <OrderView
                                            key={order.id}
                                            order={order}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    );
                }
            }
        )
    )
);
