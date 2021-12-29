import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test('Initial state of Checkbox and button', () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).not.toBeChecked();

    const buttonElement = screen.getByRole('button', {name: 'Confirm Order'});
    expect(buttonElement).toBeDisabled();
});

test('Checking checkbox enables button', () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole('checkbox');
    userEvent.click(checkboxElement);

    const buttonElement = screen.getByRole('button', {name: 'Confirm Order'});
    expect(buttonElement).toBeEnabled();
});

test('Unchecking checkbox again disables button', () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole('checkbox');
    const buttonElement = screen.getByRole('button', {name: 'Confirm Order'});

    userEvent.click(checkboxElement);
    expect(buttonElement).toBeEnabled();

    userEvent.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
});

test('popover reponds to hover event', async () => {
    render(<SummaryForm />);

    // popover will be hidden initialy
    const nullpopover = screen.queryByText(/no ice cream will be deleivered/i);
    expect(nullpopover).not.toBeInTheDocument();

    // popover will appear on mouse hover
    const checkboxElement = screen.getByText(/terms and conditions/i);
    userEvent.hover(checkboxElement);
    const popover = screen.getByText(/no ice cream will be deleivered/i);
    expect(popover).toBeInTheDocument();

    // popover will disappear on mouse out
    userEvent.unhover(checkboxElement);
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will be deleivered/i)); 
});


