import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0, "toppings");

    // make sure we're using a number and not a string to validate
    // const currentValueFloat = parseFloat(currentValue);
    // const valueIsValid =
    //   0 <= currentValueFloat &&
    //   currentValueFloat <= 10 &&
    //   Math.floor(currentValueFloat) === currentValueFloat;

    // // validate
    // setIsValid(valueIsValid);

    // // adjust scoop count with currentValue if it's valid; 0 if it's not
    // const newValue = valueIsValid ? parseInt(currentValue) : 0;
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Col xs="5">
          <Form.Check type="checkbox" onChange={handleChange} label={name} />
        </Col>
      </Form.Group>
    </Col>
  );
};
export default ToppingOption;
