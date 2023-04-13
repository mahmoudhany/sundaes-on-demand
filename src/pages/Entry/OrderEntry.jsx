import React from "react";
import { Options } from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderEntry = () => {
  const { grandTotals } = useOrderDetails();
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />

      <h2>Grand total: {formatCurrency(grandTotals)}</h2>
      <button>Order sundae</button>
    </div>
  );
};

export default OrderEntry;
