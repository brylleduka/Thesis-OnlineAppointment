import React from "react";
import AccountDetails from "./AccountDetails";
import AccountSched from "./AccountSched";

const AccountInfo = ({ isAccount, employee, fetchEmployee }) => {
  switch (isAccount) {
    case "details":
      return (
        <AccountDetails employee={employee} fetchEmployee={fetchEmployee} />
      );
    case "schedule":
      return <AccountSched />;
  }
};

export default AccountInfo;
