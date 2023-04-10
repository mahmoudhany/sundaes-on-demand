import { render, screen, waitFor } from "@testing-library/react";
import { Options } from "../Options";

describe("test options", () => {
  test("should display image for each scoop from the server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((elm) => elm.alt);
    expect(altText).toEqual(["Mint chip scoop", "Vanilla scoop"]);
  });
});