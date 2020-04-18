import React from "react";
import { DGrid, DCard, Content } from "../../styled/containers";

const DetailsEmployee = ({ employee }) => {
  return (
    <Content width="100%" height="100%">
      <DGrid gap="10px">
        <DCard dw="100%" dh="100%" p="10px 20px">
          {employee.firstName} {employee.lastsName}
        </DCard>
      </DGrid>
    </Content>
  );
};

export default DetailsEmployee;
