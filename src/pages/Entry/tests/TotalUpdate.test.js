import {
  findByRole,
  render,
  screen,
  waitFor,
} from "../../../test-utils/test-utils";
import { Options } from "../Options";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

describe("test total for scoops", () => {
  test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType={"scoops"} />);

    const scoopSubtotal = screen.getByText("scoops total: $", { exact: false });
    // vanilla scoop
    expect(scoopSubtotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
  });
});

describe("test total for toppings", () => {
  test("update scoop subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType={"toppings"} />);

    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    expect(mAndMsCheckbox).not.toBeChecked();
    await user.click(mAndMsCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    // expect(hotFudgeCheckbox).not.toBeChecked();
    await user.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    await user.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });
});

describe("test grand total", () => {
  test.only("grand total should start at 0.00", () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaInput = await waitFor(() =>
      screen.findByRole("spinbutton", {
        name: "Vanilla",
      })
    );

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });

    await user.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    await user.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
