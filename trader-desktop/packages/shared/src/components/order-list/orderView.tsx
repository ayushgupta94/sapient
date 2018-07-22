import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import { Order } from '../../domain/order';
import { OrderProgressBar } from './orderProgressBar';

export interface Props {
    order: Order;
}

const styles = (theme: Theme) => ({
    buyTextClass: {
        color: theme.palette.business.buyText
    },
    sellTextClass: {
        color: theme.palette.business.sellText
    }
});

const decorate = withStyles(styles);

export const OrderView = decorate<Props>(
    class extends React.Component<
        Props & WithStyles<'buyTextClass' | 'sellTextClass'>
    > {
        public render() {
            const {
                id,
                side,
                symbol,
                quantity,
                committed,
                executed
            } = this.props.order;
            const { classes } = this.props;
            console.log(this.props.order);
            console.log(this.props.order.status);

            return (
                <tr key={id}>
                    <td
                        className={
                            side === 'BUY'
                                ? classes.buyTextClass
                                : classes.sellTextClass
                        }
                    >
                        {side}
                    </td>
                    <td>{symbol}</td>
                    <td>{quantity}</td>
                    <td>{committed}</td>
                    <td>{executed}</td>
                    <td>
                        <OrderProgressBar
                            orderSide={side}
                            orderStatus={this.props.order.status}
                        />
                    </td>
                </tr>
            );
        }
    }
);
