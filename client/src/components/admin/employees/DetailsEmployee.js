import React from "react";

import { DGrid, Content } from "../../styled/containers";

import PersonalCard from "./PersonalCard";
import EmployeeCard from "./EmployeeCard";
import ServiceCard from "./ServiceCard";

const DetailsEmployee = ({ employee }) => {
  return (
    <Content width="100%" height="100%">
      <DGrid gap="5px" med7="1fr" med10="1fr">
        <PersonalCard employee={employee} />
        <EmployeeCard employee={employee} />
        <ServiceCard employee={employee} />
      </DGrid>
    </Content>
  );
};

export default DetailsEmployee;
