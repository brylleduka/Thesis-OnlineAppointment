import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_MY_APPOINTMENTS } from "../../../util/graphql/appointment";

import { Link } from "react-router-dom";
import { Form, Icon, Dimmer, Loader, Label, Input } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import ResendVerify from "./ResendVerify";

const SigninForm = ({ hist, from }) => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { userLogin: userData } }) {
      context.login(userData);

      values.email = "";
      values.password = "";
      return hist.push(from);
    },
    refetchQueries: [{ query: FETCH_MY_APPOINTMENTS }],
    onCompleted() {
      console.log("success");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser();
  };

  return (
    <Content width="100%" flex justify="center" margin="50px 0 80px 0">
      {errors.notVerify ? (
        <ResendVerify email={values.email} />
      ) : (
        <Form noValidate onSubmit={handleSubmit} style={{ width: "80%" }}>
          <h2>Account Login</h2>

          <Form.Field
            error={
              errors.email || errors.emailX || errors.userX || errors.general
                ? true
                : false
            }
          >
            <label>Email</label>

            {errors.email || errors.emailX || errors.userX || errors.general ? (
              <Label basic color="red" style={{ border: "none" }}>
                {errors.email ||
                  errors.emailX ||
                  errors.userX ||
                  errors.general}
              </Label>
            ) : (
              ""
            )}
            <Input
              name="email"
              type="text"
              placeholder="example@example.com"
              values={values.email}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field error={errors.password || errors.general ? true : false}>
            <label>Password</label>

            {errors.password || errors.general ? (
              <Label basic color="red" style={{ border: "none" }}>
                {errors.password || errors.general}
              </Label>
            ) : (
              ""
            )}
            <Input
              name="password"
              type="password"
              placeholder="********"
              values={values.password}
              onChange={handleChange}
            />
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
              "Login"
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
            <Link to="/signup">
              <Icon name="arrow left" />
              Create your account
            </Link>
          </div>
        </Form>
      )}
    </Content>
  );
};

const LOGIN_USER = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`;

export default SigninForm;
