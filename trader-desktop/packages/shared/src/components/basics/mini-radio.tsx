import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import * as React from 'react';

const styles = (theme: Theme) => ({
    size: {
        width: 40,
        height: 40
    },
    sizeIcon: {
        fontSize: 20
    }
});

export interface RadioProps {
    visibilityFilter: string;
    value: string;
    onVisibilityChanged: any;
}

const decorate = withStyles(styles);

export const MiniRadio = decorate<RadioProps>(
    class extends React.Component<
        RadioProps & WithStyles<'size' | 'sizeIcon'>
    > {
        state = {
            selectedValue: this.props.visibilityFilter
        };

        handleChange = (event: any) => {
            this.props.onVisibilityChanged(event.target.value);
        };

        render() {
            const { classes } = this.props;

            return (
                <span>
                    <Radio
                        checked={
                            this.props.visibilityFilter === this.props.value
                        }
                        onChange={this.handleChange}
                        value={this.props.value}
                        name="radio-button-demo"
                        aria-label="A"
                        icon={
                            <RadioButtonUncheckedIcon
                                className={classes.sizeIcon}
                            />
                        }
                        checkedIcon={
                            <RadioButtonCheckedIcon
                                className={classes.sizeIcon}
                            />
                        }
                    />
                </span>
            );
        }
    }
);
