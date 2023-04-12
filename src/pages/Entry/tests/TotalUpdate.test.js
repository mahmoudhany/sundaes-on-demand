import { render, screen } from "../../../test-utils/test-utils";
import { Options } from "../Options";
import userEvent from "@testing-library/user-event";

describe("test total", () => {
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
