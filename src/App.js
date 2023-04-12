import { Container } from "react-bootstrap";
import SummaryForm from "./pages/Summary/SummaryForm";
import OrderEntry from "./pages/Entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <SummaryForm />
        <OrderEntry />
      </OrderDetailsProvider>
      {/*  confirmation page doesn't need a provider */}
    </Container>
  );
}

export default App;
