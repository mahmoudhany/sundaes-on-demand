import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import {
  renderWithProviders,
  screen,
  waitFor,
} from "../../../test-utils/test-utils";

describe("test server errors", () => {
  test("should display alert for error", async () => {
    renderWithProviders(<OrderEntry />);
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});
