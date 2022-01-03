import { render, screen } from "../../../test-utils/testing-library-utils";
// import userEvent from "@testing-library/user-event";
// import { act } from 'react-dom/test-utils';

import Options from "../Options";

import { OrderDetailsProvider } from '../../../commons/OrderDetails'; 

test('check scoops subtotal with total scoops', async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // check initial scoopsTotal
    const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsTotal).toHaveTextContent('0');

    // update the vanilla scoop to 1 and verify the scoopsTotal
    /* const vanillaScoop = await screen.findByTestId("Vanilla-count");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    expect(scoopsTotal).toHaveTextContent('2'); */

    // update the chocolate scoop to 2 and verify the scoopsTotal
    /* const chocolateScoop = await screen.findByTestId("Chocolate-count");
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');
    expect(scoopsTotal).toHaveTextContent('6.00'); */
})