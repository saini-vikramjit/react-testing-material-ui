import { Container } from '@material-ui/core';

// import SummaryForm from './pages/summary/SummaryForm';
import OrderEntry from './pages/entry/OrderEntry';

import { OrderDetailsProvider } from './commons/OrderDetails';

const App = () => {
    return (
        <Container>
            <OrderDetailsProvider>
                <OrderEntry />
            </OrderDetailsProvider>
        </Container>
    );
};

export default App;
