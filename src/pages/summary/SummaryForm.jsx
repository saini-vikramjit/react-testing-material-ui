import React, { useState } from 'react';

import {
    Button, Checkbox, Typography, Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PHASES } from '../../constants';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    checkboxLabel: {
        display: 'inline',
    },
}));

const SummaryForm = (props) => {
    const classes = useStyles();
    const { phaseChangeHandler } = props;

    const [tcChecked, setTcChecked] = useState(true);
    const checkboxHandler = () => {
        setTcChecked(!tcChecked);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const onMouseOverHandler = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const onMouseLeaveHandler = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div> 
            <Checkbox
                checked={!tcChecked}
                onChange={checkboxHandler}
                name="checkedB"
                color="primary"
                inputProps={{
                    "data-testid": 'terms-checkbox',
                }}
            />
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseOver={onMouseOverHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={classes.checkboxLabel}
            >
                I Agree to Terms and Conditions
            </Typography>
            <br />
            <Button
                color="primary"
                disabled={tcChecked}
                size="large"
                variant="contained"
                onClick={() => phaseChangeHandler(PHASES.COMPLETE)}
            >
                Confirm Order
            </Button>
            <br />
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                onClose={onMouseLeaveHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>No Ice cream will be deleivered</Typography>
            </Popover>
        </div>
    )
};

export default SummaryForm;