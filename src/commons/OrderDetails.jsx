import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { pricePerItem } from '../constants/index';

const currencyFormater = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

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
    for(const count of optionCounts[optionType]) {
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

    const [totals, setTotals] = useState(
        {
            scoops: 0,
            toppings: 0,
            grandTotal: 0,
        }
    );

    useEffect(() => {
        const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubTotal + toppingsSubTotal;

        setTotals({
            scoops: scoopsSubTotal,
            toppings: toppingsSubTotal,
            grandTotal,
        });
        
    }, [optionCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName, newItemCount, optionType) => {
            const newOptionCounts = { ...optionCounts };
            const optionCountMap = optionCounts[optionType];
            optionCountMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        };
        return [{ ...optionCounts, totals }, updateItemCount];
    }, [optionCounts, totals]);

    return (
        <OrderDetails.Provider value={value} {...props} />
    )
}

export { useOrderDetails, OrderDetailsProvider };