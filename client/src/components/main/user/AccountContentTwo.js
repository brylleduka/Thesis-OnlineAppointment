import React from "react";
import UserDetails from "./UserDetails";
import UserAppointments from "./UserAppointments";

const AccountContentTwo = ({ isAccount, userInfo }) => {
  switch (isAccount) {
    case "details":
      return <UserDetails userInfo={userInfo} />;
    case "appointments":
      return <UserAppointments />;
    default:
      return <h1>Something went wrong</h1>;
  }
};

export default AccountContentTwo;
