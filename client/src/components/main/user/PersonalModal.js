import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import { Modal, Form } from "semantic-ui-react";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const PersonalModal = ({ personalOpen, setPersonalOpen, userInfo }) => {
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(
    new Date(parseInt(userInfo.dateOfBirth))
  );

  const [values, setValues] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    contact: userInfo.contact,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
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
      userId: userInfo._id,
      dateOfBirth: startDate,
      ...values,
    },
  });

  const handleDateChanged = (date) => {
    setStartDate(date);
  };

  const updateUserCallBack = () => {
    updateUser();
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton type="submit" onClick={updateUserCallBack}>
          {loading ? <Spinner small inverted /> : "Save Changes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $contact: String
  ) {
    updateUser(
      _id: $userId
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      contact: $contact
    ) {
      _id
      firstName
      lastName
      contact
      dateOfBirth
    }
  }
`;

export default PersonalModal;
