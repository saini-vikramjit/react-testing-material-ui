import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from '../Options';

// import { OrderDetailsProvider } from '../../../commons/OrderDetails';

test('display image from each topping from server', async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(5);

    const toppingAltText = toppingImages.map((item) => item.alt);
    expect(toppingAltText).toEqual(['Hot fudge topping', 'Peanut butter cups topping', 'Gummi bears topping', 'Mochi topping', 'Cherries topping']);
});