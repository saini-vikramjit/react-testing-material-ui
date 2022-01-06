import { Typography } from '@material-ui/core';

import { useOrderDetails } from '../../commons/OrderDetails';

const GrandTotal = () => {
    
    const [ orderDetails ] = useOrderDetails();

    return (
        <Typography
            color="primary"
            variant="h2"
        >
            Grand Total: {orderDetails.totals.grandTotal}
        </Typography>
    )
};

export default GrandTotal;