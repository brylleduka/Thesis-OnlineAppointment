import React from "react";
import UserDetails from "./UserDetails";
import UserAppointments from "./UserAppointments";

const AccountContentTwo = ({ isAccount, userInfo }) => {
  switch (isAccount) {
    case "appointments":
      return <UserAppointments />;
    case "details":
      return <UserDetails userInfo={userInfo} />;
    default:
      return <h1>Something went wrong</h1>;
  }
};

export default AccountContentTwo;
