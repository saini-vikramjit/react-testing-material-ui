import { useState, useEffect } from "react";
import { Grid, Typography } from '@material-ui/core';

import axios from "axios";

import { upperFirst } from 'lodash'; 

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../commons/AlertBanner";

import { useOrderDetails } from '../../context/OrderDetails';

import { pricePerItem } from "../../constants";

import { currencyFormater } from '../../utils/index';

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const[error, setError] = useState(false);
    const [ orderDetails, updateItemCount ] = useOrderDetails();

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => { setItems(response.data); })
            .catch((error) => setError(true));
    }, [optionType]);

    if (error) {
        return <AlertBanner alertType="error" />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    
    const optionItems = items.map(({name, imagePath}) => (
        <ItemComponent
            key={name}
            name={name}
            imagePath={imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
        />
    ));

    return (
        <>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    color="primary"
                >
                    {upperFirst(optionType)}
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle2"
                    color="textPrimary"
                >
                    { currencyFormater(pricePerItem[optionType]) } each
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                >
                    {`${upperFirst(optionType)} total: ${orderDetails.totals[optionType]}`}
                </Typography>
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {optionItems}
            </Grid>
        </>
    );
}

export default Options;