import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { isNull } from 'lodash';

import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PHASES } from '../../constants';

import { useOrderDetails } from '../../context/OrderDetails';

const useStyles = makeStyles((theme) => ({
    containerStyle: {
        paddingTop: '20px',
    },
}));

const OrderConfirmation = (props) => {
    const classes = useStyles();

    const [,,resetOrder] = useOrderDetails();

    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
            .post('http://localhost:3030/order')
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const { phaseChangeHandler } = props;

    const onClickHandler = () => {
        resetOrder();
        phaseChangeHandler(PHASES.IN_PROGRESS);
    }

    if (isNull(orderNumber)) {
        return (
            <p>Loading</p>
        )
    }
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
                >Thank You</Typography>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.containerStyle}
            >
                <p>Your order nunber is {orderNumber}</p>
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
                        // disabled
                        size="medium"
                        variant="outlined"
                        onClick={onClickHandler}
                    >
                        Create New Order
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderConfirmation;
