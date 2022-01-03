import { useState, useEffect } from "react";

import axios from "axios";

import { upperFirst } from 'lodash'; 

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../commons/AlertBanner";

import { useOrderDetails } from '../../commons/OrderDetails';

import { pricePerItem } from "../../constants";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const[error, setError] = useState(false);
    const [ orderDetails, updateItemCount ] = useOrderDetails();

    useEffect(() => {
        axios
            .get(`http://localhost.com:3000/${optionType}`)
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
            <div>{upperFirst(optionType)}</div>
            <div>{`${pricePerItem[optionType]} each`}</div>
            <div>{`${upperFirst(optionType)} total: $${orderDetails.totals[optionType]}`}</div>
            <div>{optionItems}</div>
        </>
    );
}

export default Options;