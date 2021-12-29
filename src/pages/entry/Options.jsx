import { useState, useEffect } from "react";

import axios from "axios";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost.com:3000/${optionType}`)
            .then((response) => { setItems(response.data); })
            .catch((error) => {
                console.warn('Error occured');
            });
    }, [optionType])

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const optionItems = items.map(({name, imagePath}) => (
        <ItemComponent
            key={name}
            name={name}
            imagePath={imagePath}
        />
    ));

    return (
        <div>{optionItems}</div>
    );
}

export default Options;