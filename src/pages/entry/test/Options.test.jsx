import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from '../Options.jsx';

test('display image from each scoop from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(4);

    const scoopImagesAltText = scoopImages.map(item => item.alt);
    expect(scoopImagesAltText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop']);
});

test.only('update the scoops sub-totals when value is valid', async () => {
    render(<Options optionType="scoops" />);

    const vanillaScoop = await screen.findByTestId("Vanilla-count");
    
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '-2');

    const scoopsSubTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsSubTotal).toBeInTheDocument();

});