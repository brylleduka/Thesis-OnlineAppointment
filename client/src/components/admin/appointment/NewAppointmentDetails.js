import React from "react";
import { Content, DGrid } from "../../styled/containers";
import NewAppointmentInput from "./NewAppointmentInput";
import NewDateTime from "./NewDateTime";

const NewAppointmentDetails = ({
  categoryVal,
  setCategoryVal,
  categories,
  employeeVal,
  service,
  setCategories,
  setService,
  setServiceEmp,
  serviceValue,
  setServiceValue,
  setEmployeeVal,
  startDate,
  setStartDate,
  selectedTime,
  setSelectedTime
}) => {
  return (
    <DGrid>
      <NewAppointmentInput
        categoryVal={categoryVal}
        setCategoryVal={setCategoryVal}
        categories={categories}
        service={service}
        employeeVal={employeeVal}
        setCategories={setCategories}
        setService={setService}
        setServiceEmp={setServiceEmp}
        serviceValue={serviceValue}
        setServiceValue={setServiceValue}
        setEmployeeVal={setEmployeeVal}
        startDate={startDate}
      />
      <NewDateTime
        setStartDate={setStartDate}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
        startDate={startDate}
        employeeVal={employeeVal}
        serviceValue={serviceValue}
      />
    </DGrid>
  );
};

export default NewAppointmentDetails;
