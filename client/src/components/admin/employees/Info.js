import React from "react";
import DetailsEmployee from "./DetailsEmployee";
import ScheduleEmployee from "./ScheduleEmployee";
import Page404 from "../../../pages/Page404";
import { DButton } from "../../styled/utils";
import { Content } from "../../styled/containers";

const Info = ({ isEmpInfo, employee }) => {
  switch (isEmpInfo) {
    case "emp_details":
      return <DetailsEmployee employee={employee} />;
    case "emp_sched":
      return <ScheduleEmployee employee={employee} />;
    default:
      return <Page404 />;
  }
};

export default Info;
