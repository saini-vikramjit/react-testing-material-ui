import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Options from "./Options"; 
import GrandTotal from './GrandTotal';

import { useOrderDetails } from '../../context/OrderDetails';

import { PHASES } from '../../constants';

const useStyles = makeStyles((theme) => ({
    containerStyle: {
        paddingTop: '20px',
    },
}));

const OrderEntry = (props) => {
    const classes = useStyles();
    const { phaseChangeHandler } = props;

    const [ orderDetails ] = useOrderDetails();

    const orderBtnDisabled = (orderDetails.totals.scoops === "$0.00") ? true : false;

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <Grid item>
                <Typography
                    color="primary"
                    align="center"
                    display="block"
                    gutterBottom
                    variant="h2"
                >Design your Sundae!</Typography>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <Options optionType="scoops" />
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <Options optionType="toppings" />
            </Grid>
            <Grid item className={classes.containerStyle}>
                <GrandTotal />
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <Grid item>
                    <Button
                        color="primary"
                        disabled={orderBtnDisabled}
                        size="medium"
                        variant="outlined"
                        onClick={() => phaseChangeHandler(PHASES.IN_REVIEW)}
                    >
                        Order Sundae!
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default OrderEntry;