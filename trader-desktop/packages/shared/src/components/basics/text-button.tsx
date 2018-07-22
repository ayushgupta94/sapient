import Button from '@material-ui/core/Button';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    }
});

function TextButtons(props: any) {
    const { classes } = props;
    return (
        <span>
            <Button
                color={props.color}
                size="large"
                variant={props.variant}
                className={classes.button}
                onClick={props.onClick}
            >
                {props.text}
            </Button>
        </span>
    );
}

export default withStyles(styles)(TextButtons);
