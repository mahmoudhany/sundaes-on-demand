import "./App.css";
import SummaryForm from "./pages/Summary/SummaryForm";
import { Options } from "./pages/Entry/Options";

function App() {
  return (
    <div className="App">
      <SummaryForm />
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
    </div>
  );
}

export default App;
