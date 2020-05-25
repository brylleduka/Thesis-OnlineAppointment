import React from "react";
import ArchEmp from "./employee/ArchEmp";

const Archiving = ({ isArchive }) => {
  switch (isArchive) {
    case "arch-emp":
      return <ArchEmp />;

    case "arch-serv":
      return <h1>Serv</h1>;

    case "arch-review":
      return <h1>Review</h1>;

    default:
      return <h3>Not Found</h3>;
  }
};

export default Archiving;
