import { createContext, useContext, useReducer, useState } from "react";
import { PRICE_PER_ITEM } from "../constants";

const OrderDetails = createContext();
export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  return contextValue;
};

export const OrderDetailsProvider = (props) => {
  // const [optionCount, setOptionCount] = useState({
  //   toppings: {},
  //   scoops: {},
  // });
  const initialState = {
    toppings: {},
    scoops: {},
  };
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "updateCount":
        return { ...state, ...payload };
      case "resetOrder":
        return initialState;
      default:
        return state;
    }
  };
  const [optionsCount, dispatch] = useReducer(reducer, initialState);

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionsCount = { ...optionsCount };
    newOptionsCount[optionType][itemName] = newItemCount;
    dispatch({ type: "updateCount", payload: newItemCount });
  };

  const resetOptionsCount = () => {
    dispatch({ type: "resetOrder" });
  };

  const calculateTotal = (optionType) => {
    const newOptionsCount = { ...optionsCount };

    const countsArray = Object.values(newOptionsCount[optionType]);

    const totalCount = countsArray.reduce((total, cur) => total + cur, 0);
    return totalCount * PRICE_PER_ITEM[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const grandTotals = totals.scoops + totals.toppings;

  const value = {
    optionsCount,
    updateItemCount,
    resetOptionsCount,
    calculateTotal,
    totals,
    grandTotals,
  };
  return (
    <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
  );
};
