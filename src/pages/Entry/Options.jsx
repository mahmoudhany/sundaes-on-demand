import axios from "axios";
import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3030/${optionType}`);
      setItems(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1);
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {optionType} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>
        {items.map(({ name, imagePath }) => (
          <ItemComponent key={name} name={name} imagePath={imagePath} />
        ))}
      </Row>
    </>
  );
};
