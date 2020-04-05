import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { Link } from "react-router-dom";
import { Form, Icon, Dimmer, Loader, Label, Input } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";

const SignupForm = ({ hist, from }) => {
  const [errors, setErrors] = useState({});

  const { handleChange, handleSubmit, values } = useForm(registerCallBack, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update() {
      hist.push(from);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerCallBack() {
    register();
  }

  return (
    <Content width="100%" flex justify="center" margin="50px 0 80px 0">
      <Form noValidate onSubmit={handleSubmit} style={{ width: "80%" }}>
        <h2>Create a free account</h2>

        <Form.Group widths="equal">
          <Form.Field error={errors.firstName ? true : false}>
            <label>First Name</label>
            {errors.firstName && (
              <Label basic color="red" style={{ border: "none" }}>
                {errors.firstName}
              </Label>
            )}

            <Input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              fluid
              placeholder="First name"
            />
          </Form.Field>

          <Form.Field error={errors.lastName ? true : false}>
            <label>Last Name</label>
            {errors.lastName && (
              <Label basic color="red" style={{ border: "none" }}>
                {errors.lastName}
              </Label>
            )}
            <Input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              fluid
              placeholder="Last name"
            />
          </Form.Field>
        </Form.Group>
        <Form.Field
          error={
            errors.email || errors.emailX || errors.userTaken ? true : false
          }
        >
          <label>Email</label>
          {errors.email || errors.emailX || errors.userTaken ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.email || errors.emailX || errors.userTaken}
            </Label>
          ) : (
            ""
          )}
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="example@example.com"
          />
        </Form.Field>

        <Form.Field
          error={
            errors.password || errors.confirmPassword || errors.pwdShort
              ? true
              : false
          }
        >
          <label>Password</label>

          {errors.password || errors.pwdShort || errors.confirmPassword ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.password || errors.pwdShort || errors.confirmPassword}
            </Label>
          ) : (
            ""
          )}

          <Input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="**********"
          />
        </Form.Field>
        <Form.Field
          error={
            errors.confirmPasswordEmpty || errors.confirmPassword ? true : false
          }
        >
          <label>Confirm Password</label>
          {errors.confirmPasswordEmpty || errors.confirmPassword ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.confirmPasswordEmpty || errors.confirmPassword}
            </Label>
          ) : (
            ""
          )}
          <Input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="************"
          />
        </Form.Field>

        <DButton type="submit" fluid size="3rem" fSize="18px" text="uppercase">
          {loading ? (
            <Dimmer active style={{ background: "transparent" }}>
              <Loader />
            </Dimmer>
          ) : (
            "Create an account"
          )}
        </DButton>

        <div
          style={{
            marginTop: "1rem",
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: "700"
          }}
        >
          <Link to="/login">
            Already have an account? Sign in <Icon name="arrow right" />
          </Link>
        </div>
      </Form>
    </Content>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    )
  }
`;

export default SignupForm;
