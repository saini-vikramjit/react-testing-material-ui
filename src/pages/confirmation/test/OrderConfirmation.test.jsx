import { render, screen } from "../../../test-utils/testing-library-utils";

import OrderConfirmation from '../OrderConfirmation';

test('check if the order confirmation component exists', async () => {
    render(<OrderConfirmation />);

    const orderConfirmation = await screen.findByText('Your order nunber is', { exact: false });
    expect(orderConfirmation).toBeInTheDocument();
});
