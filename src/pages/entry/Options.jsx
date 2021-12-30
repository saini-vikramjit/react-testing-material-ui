import { useState, useEffect } from "react";

import axios from "axios";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../commons/AlertBanner";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const[error, setError] = useState(false);

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
        />
    ));

    return (
        <div>{optionItems}</div>
    );
}

export default Options;