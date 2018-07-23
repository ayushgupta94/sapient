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
    },
    tableRow: {
        'border-bottom': '1px solid black',
        'border-top': '1px solid black',
        background: theme.palette.grey[750],
        height: '2em'
    }
});

const decorate = withStyles(styles);

export const OrderView = decorate<Props>(
    class extends React.Component<
        Props & WithStyles<'buyTextClass' | 'sellTextClass' | 'tableRow'>
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

            return (
                <tr className={classes.tableRow} key={id}>
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
