import React from "react";
import { Content, DGrid } from "../../../styled/containers";
import AppointmentSelection from "./AppointmentSelection";
import AppointmentDateTime from "./AppointmentDateTime";
import useWindowSize from "../../../../util/hooks/useWindowSize";
const AppointmentContentForms = ({
  categoryValue,
  setCategoryValue,
  serviceValue,
  setServiceValue,
  employeeVal,
  setEmployeeVal,
  startDate,
  setStartDate,
  selectedTime,
  setSelectedTime,
}) => {
  const { width: wid } = useWindowSize();

  return (
    <Content width="100%" height="100%" margin="0 auto">
      <DGrid custom={wid <= 768 ? "1fr" : "1fr 2fr"}>
        <AppointmentSelection
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          serviceValue={serviceValue}
          setServiceValue={setServiceValue}
          employeeVal={employeeVal}
          setEmployeeVal={setEmployeeVal}
        />
        <AppointmentDateTime
          setStartDate={setStartDate}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          startDate={startDate}
          employeeVal={employeeVal}
          serviceValue={serviceValue}
          categoryValue={categoryValue}
        />
      </DGrid>
    </Content>
  );
};

export default AppointmentContentForms;
