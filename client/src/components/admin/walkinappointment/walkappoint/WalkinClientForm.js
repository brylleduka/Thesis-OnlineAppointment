import React from "react";
import { Content } from "../../../styled/containers";
import { Form } from "semantic-ui-react";

const WalkinClientForm = ({ setClientValues, clientValues }) => {
  const handleChangeWalkinClientInfo = (e) => {
    setClientValues({ ...clientValues, [e.target.name]: e.target.value });
  };

  return (
    <Content
      flex
      justify="space-around"
      align="center"
      direct="column"
      width="90%"
      heigh="100%"
      margin="0 auto"
    >
      <Form style={{ width: "100%" }}>
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={clientValues.firstName}
            onChange={handleChangeWalkinClientInfo}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={clientValues.lastName}
            onChange={handleChangeWalkinClientInfo}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={clientValues.email}
            onChange={handleChangeWalkinClientInfo}
          />
        </Form.Field>
        <Form.Field>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={clientValues.contact}
            onChange={handleChangeWalkinClientInfo}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={clientValues.address}
            onChange={handleChangeWalkinClientInfo}
          />
        </Form.Field>
      </Form>
    </Content>
  );
};

export default WalkinClientForm;
