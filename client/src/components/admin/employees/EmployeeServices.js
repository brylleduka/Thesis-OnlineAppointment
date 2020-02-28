import React, { useState } from "react";
import { Content, DGrid } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { DLabel } from "../../styled/utils";
import ServiceAdd from "./ServiceAdd";

const EmployeeServices = ({ employee }) => {
  const [open, setOpen] = useState(false);

  return (
    <DGrid rowCustom="4fr 1fr">
      <Content width="100%" style={{ overflow: "auto" }}>
        {employee &&
          employee.services.map(service => (
            <DLabel
              bgcolor="#2980B9"
              color="white"
              rounded
              pad="3px 8px"
              hover
              style={{ display: "inline-block" }}
            >
              {service.name}
              <span style={styles.close}>&times;</span>
            </DLabel>
          ))}
      </Content>
      <Content width="100%">
        <DButton onClick={() => setOpen(true)}>Add</DButton>
      </Content>
      <ServiceAdd open={open} setOpen={setOpen} employeeId={employee._id} />
    </DGrid>
  );
};

const styles = {
  close: {
    fontSize: "16px",
    marginLeft: "3px"
  }
};

export default EmployeeServices;
