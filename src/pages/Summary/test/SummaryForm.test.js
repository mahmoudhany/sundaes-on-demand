import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("test summary form", () => {
  test("checkbox intially unchecked and confirm button disabled", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    expect(checkbox).not.toBeChecked();
    // button intially disabled
    expect(confirmButton).toBeDisabled();
  });

  test("checkbox enables and disables submit button", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    // on checking checkbox button will be enabled
    await waitFor(() => user.click(checkbox));
    expect(confirmButton).toBeEnabled();

    // on checking checkbox again button will be diabled
    await waitFor(() => user.click(checkbox));
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    //intially null
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // hover event
    // show on hover
    const termsAndConditions = screen.getByText(/terms and conditions/i);

    await waitFor(() => user.hover(termsAndConditions));
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // hide on unhover
    await waitFor(() => user.unhover(termsAndConditions));
    screen.queryByText(/no ice cream will actually be delivered/i);
    expect(popover).not.toBeInTheDocument();
  });
});
