import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { pricePerItem } from '../constants/index';

import { currencyFormater } from '../utils/index';

const OrderDetails = createContext();

// create custom hook to check whether we are inside a provider
const useOrderDetails = () => {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error("useOrderDetails must be used within a OrderDetailsProvider");
    }

    return context;
};

const calculateSubTotal = (optionType, optionCounts) => {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()) {
        optionCount += parseInt(count);
    }
    return optionCount * pricePerItem[optionType];
}

const OrderDetailsProvider = (props) => {
    const [optionCounts, setOptionCounts] = useState(
        {
            scoops: new Map(),
            toppings: new Map(),
        }
    );

    const zeroCurrency = currencyFormater(0);
    const [totals, setTotals] = useState(
        {
            scoops: zeroCurrency,
            toppings: zeroCurrency,
            grandTotal: zeroCurrency,
        }
    );

    useEffect(() => {
        const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubTotal + toppingsSubTotal;

        setTotals({
            scoops: currencyFormater(scoopsSubTotal),
            toppings: currencyFormater(toppingsSubTotal),
            grandTotal: currencyFormater(grandTotal),
        });
        
    }, [optionCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName, newItemCount, optionType) => {
            const newOptionCounts = { ...optionCounts };

            const optionCountMap = optionCounts[optionType];
            optionCountMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        };

        const resetOrder = () => {
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map(),
            });
        }
        return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
    }, [optionCounts, totals]);

    return (
        <OrderDetails.Provider value={value} {...props} />
    )
}

export { useOrderDetails, OrderDetailsProvider };