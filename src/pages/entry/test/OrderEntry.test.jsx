import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";

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