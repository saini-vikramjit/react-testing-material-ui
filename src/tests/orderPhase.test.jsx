import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test.skip('order phase testing', async () => {
    // render app
    render(<App />);

    // add icecream scoops and toppings
    const chocolateScoop = await screen.findByTestId("Chocolate-count");
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');

    const peanutButterTopping = await screen.findByRole('checkbox', { name: /Peanut butter cups-checkbox/i });
    userEvent.click(peanutButterTopping);

    // find and click order button
    const orderButton = screen.getByRole('button', { name: /Order Sundae!/i });
    userEvent.click(orderButton);

    // check summary information based on order
    const orderSummaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
    expect(orderSummaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $4.00' });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
    expect(toppingsHeading).toBeInTheDocument();

    expect(screen.getByText('Chocolate : 2')).toBeInTheDocument();
    expect(screen.getByText('Peanut butter cups : 1')).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    userEvent.click(termsCheckbox);

    const confirmOrderButton = screen.getByRole('button', { name: /Confirm Order/i });
    expect(confirmOrderButton).toBeEnabled();
    userEvent.click(confirmOrderButton);

    // loading text to appear
    const loadingText = screen.getByText('Loading');
    expect(loadingText).toBeInTheDocument();

    // confirm order number on confirmation page
    const orderConfirmationHeading = await screen.findByRole('heading', { name: 'Thank You' });
    expect(orderConfirmationHeading).toBeInTheDocument();

    // Loading text to disappear
    const notLoading = screen.queryByText('Loading');
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = screen.getByText('Your order nunber is', { exact: false });
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /Create new order/i });
    userEvent.click(newOrderButton);

    // check the scoops and toppings subtotal is reset to zero
    const scoopsTotal = await screen.findByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();

    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    await screen.findByTestId("Chocolate-count");
    await screen.findByRole('checkbox', { name: /Peanut butter cups-checkbox/i });
});

test('topping summary not displayed if no toppings selected', async () => {
    // render app
    render(<App />);

    // add icecream scoops and toppings
    const chocolateScoop = await screen.findByTestId("Chocolate-count");
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');

    // find and click order button
    const orderButton = screen.getByRole('button', { name: /Order Sundae!/i });
    userEvent.click(orderButton);

    // check summary information based on order
    const orderSummaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
    expect(orderSummaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $4.00' });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole('heading', { name: /Toppings:/i });
    expect(toppingsHeading).not.toBeInTheDocument();
    
});