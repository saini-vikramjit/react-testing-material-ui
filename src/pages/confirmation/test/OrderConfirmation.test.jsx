import { render, screen } from '../../../test-utils/testing-library-utils';

import { rest } from 'msw';
import { server } from '../../../mocks/server.js';

import OrderConfirmation from '../OrderConfirmation';


test('check if the order confirmation component exists', async () => {
    render(<OrderConfirmation phaseChangeHandler={jest.fn()} />);

    const orderConfirmation = await screen.findByText('Your order nunber is', { exact: false });
    expect(orderConfirmation).toBeInTheDocument();
});

test('handles server error for order confirmation', async () => {
    server.resetHandlers(
        rest.post('http://localhost:3031/order', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({
                    errorMessage: 'Server error',
                }),
            )
            
        }),
    )

    render(<OrderConfirmation phaseChangeHandler={jest.fn()} />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('An unexpected error occured. Please try again later');
});