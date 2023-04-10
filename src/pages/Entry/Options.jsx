import axios from "axios";
import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3030/${optionType}`);
      setItems(data);
    } catch (error) {
      // TODO: handle error response
    }
  };

  useEffect(() => {
    getData();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  return (
    <Row>
      {items.map(({ name, imagePath }) => (
        <ItemComponent key={name} name={name} imagePath={imagePath} />
      ))}
    </Row>
  );
};
