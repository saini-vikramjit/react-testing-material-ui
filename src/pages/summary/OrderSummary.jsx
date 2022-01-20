import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { size } from 'lodash';

import SummaryForm from './SummaryForm';
import GrandTotal from '../entry/GrandTotal';
import ListOrderItems from './ListOrderItems';

import { useOrderDetails } from '../../context/OrderDetails';

const useStyles = makeStyles((theme) => ({
    containerStyle: {
        paddingTop: '20px',
    },
}));

const OrderSummary = (props) => {
    const classes = useStyles();
    const { phaseChangeHandler } = props;

    const [ orderDetails ] = useOrderDetails();
    const {totals: { scoops, toppings } } = orderDetails;

    const scoopArr = Array.from(orderDetails.scoops.entries());
    const toppingArr = Array.from(orderDetails.toppings.entries());

    const ToppingsDisplay = () => {
        return (size(toppingArr) > 0) && (
            <>
                <Typography
                    color="primary"
                    align="center"
                    display="block"
                    gutterBottom
                    variant="h4"
                >
                    Toppings: {toppings}
                </Typography>
                <ListOrderItems items={toppingArr} />
            </>
        );
    };

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
                >Order Summary</Typography>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <Typography
                    color="primary"
                    align="center"
                    display="block"
                    gutterBottom
                    variant="h4"
                >Scoops: {scoops}</Typography>
                <ListOrderItems items={scoopArr} />
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <ToppingsDisplay />
            </Grid>
            <Grid item className={classes.containerStyle}>
                <GrandTotal />
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.containerStyle}
            >
                <Grid item>
                    <SummaryForm phaseChangeHandler={phaseChangeHandler} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderSummary;
