import { Typography } from '@material-ui/core';

import { useOrderDetails } from '../../context/OrderDetails';

const GrandTotal = () => {
    
    const [ orderDetails ] = useOrderDetails();

    return (
        <Typography
            color="primary"
            variant="h4"
            align="right"
        >
            Grand Total: {orderDetails.totals.grandTotal}
        </Typography>
    )
};

export default GrandTotal;