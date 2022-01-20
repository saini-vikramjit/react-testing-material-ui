import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { server } from '../../../mocks/server.js';

import OrderEntry from "../OrderEntry";

test('handles server error for scoops and toppings', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({
                    errorMessage: 'Server error',
                }),
            )
            
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({
                    errorMessage: 'Server error',
                }),
            )
        })
    )

    render(<OrderEntry phaseChangeHandler={jest.fn()} />);

    await waitFor( async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});

test('disable order button if no scoops added', async () => {
    render(<OrderEntry phaseChangeHandler={jest.fn()} />);

    const orderButtonDisabled = screen.getByRole('button', { name: /Order Sundae!/i });
    expect(orderButtonDisabled).toBeDisabled();

    const vanillaScoop = await screen.findByTestId("Vanilla-count");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');

    const orderButtonEnabled = screen.getByRole('button', { name: /Order Sundae!/i });
    expect(orderButtonEnabled).toBeEnabled();

});

test('check scoop input value is valid', async () => {
    render(<OrderEntry phaseChangeHandler={jest.fn()} />);

    const vanillaScoop = await screen.findByTestId("Vanilla-count");
    expect(vanillaScoop).toHaveAttribute('aria-invalid', 'false');
    
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '-2');
    expect(vanillaScoop).toHaveAttribute('aria-invalid', 'true');

    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    expect(vanillaScoop).toHaveAttribute('aria-invalid', 'false');

});