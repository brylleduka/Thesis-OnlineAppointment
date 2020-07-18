import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { AuthContext } from "../../../context/auth";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { Form, Label, Dimmer, Loader, Input, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const SigninForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { handleChange, handleSubmit, values } = useForm(adminLoginCallback, {
    employeeId: "",
    password: "",
  });

  const [loginEmployee, { loading }] = useMutation(EMPLOYEE_LOGIN_MUTATION, {
    update(_, { data: { employeeLogin: employeeData } }) {
      context.employeeLogin(employeeData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function adminLoginCallback() {
    loginEmployee();
  }

  return (
    <Content width="100%" height="100%" flex justify="center" align="center">
      <Form noValidate onSubmit={handleSubmit} style={{ width: "80%" }}>
        <h2>
          <Icon name="lock" />
          Account Signin
        </h2>

        <Form.Field error={errors.empId || errors.isNotEqual ? true : false}>
          <label>Employee ID</label>

          {errors.empId || errors.isNotEqual ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.empId || errors.isNotEqual}
            </Label>
          ) : (
            ""
          )}
          <Input
            name="employeeId"
            type="text"
            placeholder="Enter your Employee ID"
            values={values.employeeId}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field error={errors.password || errors.general ? true : false}>
          <label>Password</label>

          {errors.password || errors.isNotEqual ? (
            <Label basic color="red" style={{ border: "none" }}>
              {errors.password || errors.isNotEqual}
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
          fluid
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
      </Form>
    </Content>
  );
};

const EMPLOYEE_LOGIN_MUTATION = gql`
  mutation employeeLogin($employeeId: String!, $password: String!) {
    employeeLogin(empId: $employeeId, password: $password) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      role
      level
      employeeToken
    }
  }
`;

export default SigninForm;
