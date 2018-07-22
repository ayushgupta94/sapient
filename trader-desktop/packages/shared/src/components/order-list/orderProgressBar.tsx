import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import { OrderStatus, Side } from '../../domain/order';

export interface Props {
    orderStatus: OrderStatus;
    orderSide: string;
}

const styles = (theme: Theme) => ({
    buyDone: {
        background: theme.palette.business.buyBackground,
        display: 'inline-block',
        height: '1.5em'
    },
    sellDone: {
        background: theme.palette.business.sellBackground,
        display: 'inline-block',
        height: '1.5em'
    },
    notDone: {
        background: theme.palette.business.notDone,
        display: 'inline-block',
        height: '1.5em'
    },
    unCommited: {
        background: theme.palette.business.uncommitted,
        display: 'inline-block',
        height: '1.5em'
    }
});

const decorate = withStyles(styles);

export const OrderProgressBar = decorate<Props>(
    class extends React.Component<
        Props & WithStyles<'buyDone' | 'sellDone' | 'notDone' | 'unCommited'>
    > {
        public render() {
            const { classes, orderSide } = this.props;
            return (
                <div className="stacked-bar-graph">
                    <span
                        style={{
                            width: `${this.props.orderStatus.pctDone * 100}%`
                        }}
                        className={
                            (orderSide as Side) === Side.BUY
                                ? classes.buyDone
                                : classes.sellDone
                        }
                    />
                    <span
                        style={{
                            width: `${this.props.orderStatus.pctNotDone * 100}%`
                        }}
                        className={classes.notDone}
                    />
                    <span
                        style={{
                            width: `${this.props.orderStatus.pctUncommitted *
                                100}%`
                        }}
                        className={classes.unCommited}
                    />
                </div>
            );
        }
    }
);
