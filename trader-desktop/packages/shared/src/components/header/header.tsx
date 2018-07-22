import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Chip from '@material-ui/core/Chip';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import TextButton from '../basics/text-button';
import { NewOrder } from '../new-orders';
import VisibilitySelector from '../visibility-selector';

const styles = (theme: Theme) => ({
    toolbar: {
        minHeight: 50
    },
    title: {
        color: theme.palette.grey[300],
        fontSize: 13,
        fontWeight: theme.typography.fontWeightMedium,
        flex: 1
    },
    chip: {
        margin: theme.spacing.unit,
        background: theme.palette.secondary.main
    }
});

const decorate = withStyles(styles);

export interface HeaderProps {
    rootStore?: any;
    children?: any;
}

export const Header = inject('rootStore')(
    decorate<HeaderProps>(
        observer(
            class extends React.Component<
                HeaderProps & WithStyles<'toolbar' | 'title' | 'chip'>
            > {
                onVisibilityChanged = (filter: string) => {
                    const { orderStore } = this.props.rootStore;
                    orderStore.setFilter(filter);
                };
                onNumOrdersToCreateChanged = (value: number) => {
                    const { orderStore } = this.props.rootStore;
                    orderStore.createOrdersAtServer(value);
                };

                render() {
                    const { classes, children } = this.props;
                    const { orderStore } = this.props.rootStore;

                    return (
                        <AppBar position="static" elevation={0} color="default">
                            <Toolbar className={classes.toolbar}>
                                <h1 className={classes.title}>{children}</h1>
                                <VisibilitySelector
                                    visibilityFilter={orderStore.filter}
                                    onVisibilityChanged={
                                        this.onVisibilityChanged
                                    }
                                />
                                <TextButton
                                    onClick={orderStore.resetServer}
                                    color="default"
                                    text={'Reset'}
                                />
                                <NewOrder
                                    onNumOrdersToCreateChanged={
                                        this.onNumOrdersToCreateChanged
                                    }
                                    numOrdersToCreate={
                                        orderStore.numOrdersToCreate
                                    }
                                />
                                <Chip
                                    color="secondary"
                                    label={orderStore.numOrders}
                                    className={classes.chip}
                                />
                            </Toolbar>
                        </AppBar>
                    );
                }
            }
        )
    )
);
