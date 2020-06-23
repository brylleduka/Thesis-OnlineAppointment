import React, { useState } from "react";
import SigninForm from "./SigninForm";
import EmailResetPwdForm from "./EmailResetPwdForm";
import Spinner from "../../Spinner";

const SigninContent = () => {
  const [isSign, setIsSign] = useState("signInForm");

  const handleIsRestPwdEmail = (e) => {
    setIsSign("resetPwdForm");
  };

  const handleIsSigninForm = (e) => {
    setIsSign("signInForm");
  };

  switch (isSign) {
    case "signInForm":
      return <SigninForm handleIsRestPwdEmail={handleIsRestPwdEmail} />;
    case "resetPwdForm":
      return <EmailResetPwdForm handleIsSigninForm={handleIsSigninForm} />;
    default:
      return <Spinner medium content="Loading..." />;
  }
};

export default SigninContent;
