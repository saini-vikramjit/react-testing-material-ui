import { render, screen } from '../../../test-utils/testing-library-utils';

// import userEvent from '@testing-library/user-event';

import OrderSummary from '../OrderSummary';

test('check the order summary component exists', () => {
    render(<OrderSummary />);

    const orderSummary = screen.getByText('Order Summary', { exact: true });
    expect(orderSummary).toBeInTheDocument();
});
