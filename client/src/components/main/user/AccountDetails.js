import React, { useState } from "react";
import gql from "graphql-tag";
import {useMutation } from "@apollo/react-hooks";
import { Content } from "../../styled/containers";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import { Form } from "semantic-ui-react";
import { useForm } from "../../../util/hooks";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const AccountDetails = ({ myDetails, userId }) => {
  const [errors, setErrors] = useState({});
  const { handleChange, handleSubmit, values } = useForm(updateUserCallBack, {
    firstName: myDetails.firstName,
    lastName: myDetails.lastName,
    email: myDetails.email,
    contact: myDetails.contact
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(result) {
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
      userId,
      ...values
    }
  });

  function updateUserCallBack() {
    updateUser();
  }

  return (
    <Content
      width="100%"
      flex
      align="flex-start"
      justify="flex-start"
      bgcolor="white"
      pad="20px"
    >
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Field inline>
          <DLabel style={{ width: "100px" }}>ID</DLabel>
          <input value={userId} readOnly />
        </Form.Field>
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
          <DLabel style={{ width: "100px" }}>Email</DLabel>
          <input name="email" value={values.email} onChange={handleChange} />
        </Form.Field>
        <Form.Field inline>
          <DLabel style={{ width: "100px" }}>Contact</DLabel>
          <input
            name="contact"
            value={values.contact}
            onChange={handleChange}
          />
        </Form.Field>
        <Content flex justify="flex-end" width="100%">
          <DButton type="submit">
            {loading ? <Spinner small inverted /> : "Save"}
          </DButton>
        </Content>
      </Form>
    </Content>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $firstName: String
    $lastName: String
    $contact: String
    $email: String
  ) {
    updateUser(
      _id: $userId
      firstName: $firstName
      lastName: $lastName
      contact: $contact
      email: $email
    ) {
      _id
      firstName
      lastName
      email
      contact
    }
  }
`;

export default AccountDetails;
