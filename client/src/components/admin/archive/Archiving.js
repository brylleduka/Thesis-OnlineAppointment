import React from "react";
import ArchEmp from "./employee/ArchEmp";
import ArchServ from "./service/ArchServ";

const Archiving = ({ isArchive }) => {
  switch (isArchive) {
    case "arch-emp":
      return <ArchEmp />;

    case "arch-serv":
      return <ArchServ />;

    case "arch-review":
      return <h1>Review</h1>;

    default:
      return <h3>Not Found</h3>;
  }
};

export default Archiving;
