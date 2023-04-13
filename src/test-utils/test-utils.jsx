import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const AllTheProviders = ({ children }) => {
  return <OrderDetailsProvider>{children}</OrderDetailsProvider>;
};
export const renderWithProviders = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render };
