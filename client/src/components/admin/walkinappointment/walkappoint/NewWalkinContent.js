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
        />
      );
    case 2:
      return <AppointmentContentForms />;
    case 3:
      return <WalkinAppointmentConfirm clientValues={clientValues} />;
  }
};

export default NewWalkinContent;
