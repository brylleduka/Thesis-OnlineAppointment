import React from "react";
import { Content } from "../../styled/containers";
import { Form } from "semantic-ui-react";

const NewUserAppointment = ({ values, valueChange }) => {
  return (
    <Content width="90%">
      <h2>Guest Details</h2>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input
            name="firstName"
            value={values.firstName || ""}
            onChange={valueChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            name="lastName"
            value={values.lastName || ""}
            onChange={valueChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Contact</label>
          <input
            name="contact"
            value={values.contact || ""}
            onChange={valueChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            name="email"
            value={values.email || ""}
            onChange={valueChange}
          />
        </Form.Field>
      </Form>
    </Content>
  );
};

export default NewUserAppointment;
