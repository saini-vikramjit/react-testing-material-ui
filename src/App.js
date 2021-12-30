import SummaryForm from './pages/summary/SummaryForm';

import './App.css';
import OrderEntry from './pages/entry/OrderEntry';

const App = () => {
    return (
        <div className="App">
            <OrderEntry />
            <SummaryForm />
        </div>
    );
};

export default App;
