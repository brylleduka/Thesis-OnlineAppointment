import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import { Modal, Form } from "semantic-ui-react";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const PersonalModal = ({ personalOpen, setPersonalOpen, employee }) => {
  // const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(
    new Date(parseInt(employee.dateOfBirth))
  );

  const [values, setValues] = useState({
    title: employee.title,
    firstName: employee.firstName,
    lastName: employee.lastName,
    contact: employee.contact,
    email: employee.email
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted(result) {
      setPersonalOpen(false);
      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">Updated Successfully</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    },
    variables: {
      employeeId: employee._id,
      dateOfBirth: startDate,
      ...values
    }
  });

  const handleDateChanged = date => {
    setStartDate(date);
  };

  const updateEmployeeCallBack = () => {
    updateEmployee();
  };

  return (
    <Modal
      size="small"
      open={personalOpen}
      onClose={() => setPersonalOpen(false)}
    >
      <Modal.Header>Personal Details</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Group widths="equal">
            <Form.Field>
              <DLabel style={{ width: "100px" }}>Title</DLabel>
              <select value={values.title} name="title" onChange={handleChange}>
                <option>Dr.</option>
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
            </Form.Field>
            <Form.Field inline>
              <DLabel style={{ width: "100px" }}>First Name</DLabel>
              <input
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field inline>
              <DLabel style={{ width: "100px" }}>Last Name</DLabel>
              <input
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Date of Birth</DLabel>
            <DatePicker
              selected={startDate}
              onChange={handleDateChanged}
              showYearDropdown
            />
          </Form.Field>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Contact</DLabel>
            <input
              name="contact"
              value={values.contact}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Email</DLabel>
            <input name="email" value={values.email} onChange={handleChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton type="submit" onClick={updateEmployeeCallBack}>
          {loading ? <Spinner small inverted /> : "Save Changes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $employeeId: ID!
    $title: String
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $contact: String
    $email: String
  ) {
    updateEmployee(
      _id: $employeeId
      title: $title
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      contact: $contact
      email: $email
    ) {
      _id
      title
      firstName
      lastName
      contact
      email
      dateOfBirth
    }
  }
`;

export default PersonalModal;
