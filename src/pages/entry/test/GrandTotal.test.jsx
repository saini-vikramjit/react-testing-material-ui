import { render, screen } from '../../../test-utils/testing-library-utils';

// import userEvent from '@testing-library/user-event';

import GrandTotal from '../GrandTotal';

test('check the grand total element exists', () => {
    render(<GrandTotal />);

    const grandTotal = screen.getByText('Grand Total:', { exact: false });
    expect(grandTotal).toBeInTheDocument();
});