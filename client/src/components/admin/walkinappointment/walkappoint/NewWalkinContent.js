import React from "react";
import WalkinClientForm from "./WalkinClientForm";
import AppointmentContentForms from "./AppointmentContentForms";
import WalkinAppointmentConfirm from "./WalkinAppointmentConfirm";

const NewWalkinContent = ({
  stepCount,
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
  clientValues,
  setClientValues,
}) => {
  switch (stepCount) {
    case 1:
      return (
        <WalkinClientForm
          clientValues={clientValues}
          setClientValues={setClientValues}
          stepCount={stepCount}
        />
      );
    case 2:
      return (
        <AppointmentContentForms
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          serviceValue={serviceValue}
          setServiceValue={setServiceValue}
          employeeVal={employeeVal}
          setEmployeeVal={setEmployeeVal}
          setStartDate={setStartDate}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          startDate={startDate}
        />
      );
    case 3:
      return (
        <WalkinAppointmentConfirm
          clientValues={clientValues}
          categoryValue={categoryValue}
          serviceValue={serviceValue}
          employeeVal={employeeVal}
          startDate={startDate}
          selectedTime={selectedTime}
        />
      );
  }
};

export default NewWalkinContent;
