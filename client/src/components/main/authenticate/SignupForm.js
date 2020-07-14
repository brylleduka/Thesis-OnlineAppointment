import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { useHistory } from "react-router-dom";
import { Form, Icon, Dimmer, Loader, Label, Input } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import TermsConditionsModal from "./TermsConditionsModal";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import { HashLink as Link } from "react-router-hash-link";

const SignupForm = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const { handleChange, handleSubmit, values } = useForm(registerCallBack, {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { loading }] = useMutation(REGISTER_USER, {
    variables: {
      ...values,
    },
    onCompleted(res) {
      console.log(res);
      history.push(`/account_created/${res._id}`);
    },
    onError(err) {
      if (err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function registerCallBack() {
    if (isTermsChecked) {
      register();
    } else {
      toaster.notify(({ onClose }) => (
        <Toasted alert onClick={onClose}>
          Agreeing to our terms and conditions in order to proceed.
        </Toasted>
      ));
    }
  }

  const handleTermsChecked = (e) => {
    setIsTermsChecked(!isTermsChecked);
  };

  return (
    <Content width="100%" flex justify="center" margin="50px 0 80px 0">
      <Form noValidate onSubmit={handleSubmit} style={{ width: "80%" }}>
        <h2>Create a free account</h2>

        <Form.Group widths="equal">
          <Form.Field error={errors.firstName ? true : undefined}>
            <label>First Name</label>
            {errors.firstName && (
              <Label basic color="red" style={{ border: "none" }}>
                {errors.firstName.message && "First name must not be empty"}
              </Label>
            )}

            <Input
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
                {errors.lastName.message && "Last name must not be empty"}
              </Label>
            )}
            <Input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              fluid
              placeholder="Last name"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            error={
              errors.email || errors.emailX || errors.userTaken ? true : false
            }
          >
            <label>Email</label>
            {errors.email || errors.emailX || errors.userTaken ? (
              <Label basic color="red" style={{ border: "none" }}>
                {(errors.email && "Email must not be empty") ||
                  errors.emailX ||
                  errors.userTaken}
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
            error={errors.contact || errors.contactLength ? true : false}
          >
            <label>Contact</label>

            {values.contact.trim() === "" ? (
              ""
            ) : !values.contact.match(/^\d+$/) ||
              values.contact.length !== 10 ? (
              <Label basic color="red" style={{ border: "none" }}>
                {(!values.contact.match(/^\d+$/) &&
                  "Must contain numbers only") ||
                  (values.contact.length !== 10 &&
                    "Please enter your 10 digit contact numbers")}
              </Label>
            ) : (
              ""
            )}

            <Input
              label="+63"
              name="contact"
              value={values.contact}
              onChange={handleChange}
              placeholder="9361234789"
            />
          </Form.Field>
        </Form.Group>

        <Form.Field
          error={
            errors.password || errors.confirmPassword || errors.pwdShort
              ? true
              : false
          }
        >
          <label>Password</label>

          {errors.pwdEmpty || errors.pwdShort || errors.confirmPassword ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.pwdEmpty || errors.pwdShort || errors.confirmPassword}
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
          {errors.pwdEmpty || errors.confirmPassword ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.pwdEmpty || errors.confirmPassword}
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
        <Form.Field>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="pretty p-default  p-curve p-pulse">
              <input
                type="checkbox"
                name="terms"
                value="terms"
                onChange={handleTermsChecked}
              />
              <div className="state  p-info-o">
                <label></label>
              </div>
            </div>
            <TermsConditionsModal />
          </div>
        </Form.Field>

        <DButton
          type="submit"
          fluid="true"
          size="3rem"
          fSize="18px"
          text="uppercase"
        >
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
            fontWeight: "700",
          }}
        >
          <Link to="/login/#log">
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
    $contact: String
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        contact: $contact
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export default SignupForm;
