import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Label } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const EmailResetPwdForm = ({ handleIsSigninForm }) => {
  const [isEmail, setIsEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isForgotPwdEmailSent, setIsForgotPwdEmailSent] = useState(false);

  const [forgotPassword, { loading: loadForgotPwdSent }] = useMutation(
    FORGOT_PASSWORD,
    {
      variables: {
        email: isEmail,
      },
      onCompleted() {
        setIsForgotPwdEmailSent(true);
        setIsEmail("");
        toaster.notify("Email sent");
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
    }
  );

  const handleSubmitPasswordEmail = (e) => {
    e.preventDefault();
    forgotPassword();
  };

  const handleEmailChanged = (e) => {
    setIsEmail(e.currentTarget.value);
  };

  return (
    <Content
      width="70%"
      height="100%"
      flex
      justify="center"
      align="center"
      direct="column"
    >
      {isForgotPwdEmailSent ? (
        <h3>We sent you an email. Please check your email. Thank you!</h3>
      ) : (
        <>
          <h3>Forgot your password ?</h3>
          <p
            style={{
              fontWeight: 500,
            }}
          >
            Please enter your email address you use in your account. We will
            send you a reset password link. Thank you!
          </p>
          <Form
            noValidate
            onSubmit={handleSubmitPasswordEmail}
            style={{ width: "100%" }}
          >
            <Form.Field>
              <label>Email</label>
              {errors.email || errors.emailX || errors.userX ? (
                <Label basic color="red" style={{ border: "none" }}>
                  {errors.email || errors.emailX || errors.userX}
                </Label>
              ) : (
                ""
              )}
              <Input
                type="text"
                value={isEmail}
                name="email"
                onChange={handleEmailChanged}
              />
            </Form.Field>
            <DButton
              type="submit"
              fluid
              size="3rem"
              fSize="18px"
              text="uppercase"
            >
              {loadForgotPwdSent ? (
                <Spinner small row content="Sending..." />
              ) : (
                "Send"
              )}
            </DButton>
          </Form>
        </>
      )}

      <p
        style={{
          justifySelf: "flex-start",
          alignSelf: "flex-start",
          color: "#2193b0",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={handleIsSigninForm}
      >
        Back to Sign in
      </p>
    </Content>
  );
};

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email)
  }
`;

export default EmailResetPwdForm;
