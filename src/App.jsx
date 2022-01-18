import { useState } from 'react';

import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

import { OrderDetailsProvider } from './context/OrderDetails';

import { PHASES } from './constants/index';

import theme from './theme';

const App = () => {
    const [orderPhase, setOrderPhase] = useState(PHASES.IN_PROGRESS);

    const phaseChangeHandler = (newPhase) => {
        setOrderPhase(newPhase);
    };

    let Component = OrderEntry;
    switch (orderPhase) {
        case PHASES.IN_PROGRESS:
            Component = OrderEntry;
            break;
        case PHASES.IN_REVIEW:
            Component = OrderSummary;
            break;
        case PHASES.COMPLETE:
            Component = OrderConfirmation;
            break;
        default:
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth='md'
                fixed={true}
            >
                <OrderDetailsProvider>
                    { <Component phaseChangeHandler={phaseChangeHandler} /> }
                </OrderDetailsProvider>
            </Container>
        </ThemeProvider>
    );
};

export default App;
