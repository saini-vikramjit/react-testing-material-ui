import { render, screen } from "@testing-library/react";

import Options from '../Options';

test('display image from each topping from server', async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(5);

    const toppingAltText = toppingImages.map((item) => item.alt);
    expect(toppingAltText).toEqual(['Hot fudge topping', 'Peanut butter cups topping', 'Gummi bears topping', 'Mochi topping', 'Cherries topping']);
});