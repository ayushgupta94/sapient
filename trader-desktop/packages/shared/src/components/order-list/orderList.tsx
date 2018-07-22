import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { OrderView } from './OrderView';

const styles = (theme: Theme) => ({
    title: {
        color: theme.palette.grey[300],
        fontSize: 13,
        fontWeight: theme.typography.fontWeightBold,
        flex: 1
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
                OrderListProps & WithStyles<'title'>
            > {
                render() {
                    const { classes, children } = this.props;
                    const { orderStore } = this.props.rootStore;

                    return (
                        <table style={{ width: '100%' }}>
                            <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th style={{ width: '10%' }}>Side</th>
                                    <th style={{ width: '10%' }}>Symbol</th>
                                    <th style={{ width: '10%' }}>Quantity</th>
                                    <th style={{ width: '10%' }}>Executed</th>
                                    <th style={{ width: '10%' }}>Commited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderStore
                                    .getVisibleOrders()
                                    .map((order: any, index: number) => (
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
