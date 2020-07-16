import React from "react";
import UserDetails from "./UserDetails";
import UserAppointments from "./UserAppointments";

const AccountContentTwo = ({ isAccount, userInfo }) => {
  switch (isAccount) {
    case "user_appointments":
      return <UserAppointments userInfo={userInfo} />;
    case "user_details":
      return <UserDetails userInfo={userInfo} />;
    default:
      return <h1>Something went wrong</h1>;
  }
};

export default AccountContentTwo;
