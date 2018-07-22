import Input from '@material-ui/core/Input';
import * as React from 'react';
import TextButton from './basics/text-button';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
    input: {
        width: '25px'
    }
});

export interface INewOrder {
    text?: string;
    numOrdersToCreate?: number;
    onNumOrdersToCreateChanged: any;
}

const decorate = withStyles(styles);

export const NewOrder = decorate<INewOrder>(
    class extends React.Component<INewOrder & WithStyles<'input'>> {
        state = {
            numOrdersToCreate: this.props.numOrdersToCreate
        };
        handleNumOrdersToCreateChanged = (event: any): void => {
            this.setState({ numOrdersToCreate: event.target.value });
        };
        onNumOrdersToCreateChanged = () => {
            this.props.onNumOrdersToCreateChanged(this.state.numOrdersToCreate);
        };
        public render() {
            const { classes } = this.props;
            return (
                <div>
                    <Input
                        className={classes.input}
                        id="name-helper"
                        defaultValue={this.props.numOrdersToCreate}
                        onChange={this.handleNumOrdersToCreateChanged}
                    />
                    <TextButton
                        color="primary"
                        variant={'contained'}
                        text={'New Orders'}
                        onClick={this.onNumOrdersToCreateChanged}
                    />
                </div>
            );
        }
    }
);
