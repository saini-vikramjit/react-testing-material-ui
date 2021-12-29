import { render, screen } from "@testing-library/react";

import Options from '../Options.jsx';

test('display image from each scoop from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(4);

    const scoopImagesAltText = scoopImages.map(item => item.alt);
    expect(scoopImagesAltText).toEqual(['Mint chip scoop', 'Vanilla scoop', 'Chocolate scoop', 'Salted caramel scoop']);
});