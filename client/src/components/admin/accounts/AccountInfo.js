import React from "react";
import AccountDetails from "./AccountDetails";
import AccountSched from "./AccountSched";
import Page404 from "../../../pages/Page404";

const AccountInfo = ({ isAccount, employee, fetchEmployee }) => {
  switch (isAccount) {
    case "details":
      return (
        <AccountDetails employee={employee} fetchEmployee={fetchEmployee} />
      );
    case "schedule":
      return <AccountSched employee={employee} />;
    default:
      return <Page404 />;
  }
};

export default AccountInfo;
