import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
// import { act } from 'react-dom/test-utils';

import Options from "../Options";
import OrderEntry from '../OrderEntry';

// import { OrderDetailsProvider } from '../../../commons/OrderDetails'; 

test('check scoops subtotal with total scoops', async () => {
    render(<Options optionType="scoops" />);

    // check initial scoopsTotal
    const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsTotal).toHaveTextContent('0.00');

    // update the vanilla scoop to 1 and verify the scoopsTotal
    const vanillaScoop = await screen.findByTestId("Vanilla-count");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    expect(scoopsTotal).toHaveTextContent('2.00');

    // update the chocolate scoop to 2 and verify the scoopsTotal
    const chocolateScoop = await screen.findByTestId("Chocolate-count");
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');
    expect(scoopsTotal).toHaveTextContent('6.00');
});

test('check topping subtotal with total toppings', async () => {
    render(<Options optionType="toppings" />);

    // check the initial toppingsTotal
    const toppingsTotal = screen.getByText('Toppings total: ', { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');

    // select the Gummi bears toppings and verify the toppingsTotal
    const gummibearsTopping = await screen.findByRole('checkbox', { name: /Gummi bears-checkbox/i });
    userEvent.click(gummibearsTopping);
    expect(toppingsTotal).toHaveTextContent('1.50');
    

    // select the Gummi bears toppings and verify the toppingsTotal
    const mochiTopping = await screen.findByRole('checkbox', { name: /Mochi-checkbox/i });
    userEvent.click(mochiTopping);
    expect(toppingsTotal).toHaveTextContent('3.00');

});

describe('grand total', () => {
    test('grand total starts at $0.00', () => {
        render(<OrderEntry phaseChangeHandler={jest.fn()} />);

        const grandTotal = screen.getByText('Grand Total: ', { exact: false });
        expect(grandTotal).toHaveTextContent('0.00');

    });
    test('grand total is updated properly if scoop is added first', async () => {
        render(<OrderEntry phaseChangeHandler={jest.fn()} />);

        const chocolateScoop = await screen.findByTestId("Chocolate-count");
        userEvent.clear(chocolateScoop);
        userEvent.type(chocolateScoop, '2');

        const grandTotal = screen.getByText('Grand Total: ', { exact: false });
        expect(grandTotal).toHaveTextContent('4.00');

    });
    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry phaseChangeHandler={jest.fn()} />);

        const gummibearsTopping = await screen.findByRole('checkbox', { name: /Gummi bears-checkbox/i });
        userEvent.click(gummibearsTopping);
        const grandTotal = screen.getByText('Grand Total: ', { exact: false });
        expect(grandTotal).toHaveTextContent('1.50');
    });
    test('grand total is updated properly if item is removed', async () => {
        render(<OrderEntry phaseChangeHandler={jest.fn()} />);

        const chocolateScoop = await screen.findByTestId("Chocolate-count");
        userEvent.clear(chocolateScoop);
        userEvent.type(chocolateScoop, '4');

        const gummibearsTopping = await screen.findByRole('checkbox', { name: /Gummi bears-checkbox/i });
        userEvent.click(gummibearsTopping);

        userEvent.clear(chocolateScoop);
        userEvent.type(chocolateScoop, '2');

        const grandTotal = screen.getByText('Grand Total: ', { exact: false });
        expect(grandTotal).toHaveTextContent('5.50');
    });
});