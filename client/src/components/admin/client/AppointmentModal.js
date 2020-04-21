import React, { useState, useEffect } from "react";
import { Modal } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import { DGrid } from "../../styled/containers";
import AppointmentInputs from "../../main/appointment/AppointmentInputs";
import AppointDate from "../../main/appointment/AppointDate";
import NewConfirm from "./NewConfirm";

const AppointmentModal = ({ clientId }) => {
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    category: "",
  });
  const [serviceValue, setServiceValue] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <>
      <DButton onClick={() => setOpen(true)}>New Appointment</DButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>New Appointment</Modal.Header>
        <Modal.Content>
          <DGrid custom="1fr 2fr">
            <AppointmentInputs
              values={values}
              setValues={setValues}
              employeeVal={employeeVal}
              serviceValue={serviceValue}
              setServiceValue={setServiceValue}
              setEmployeeVal={setEmployeeVal}
            />
            <AppointDate
              setStartDate={setStartDate}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
              startDate={startDate}
              employeeVal={employeeVal}
              serviceValue={serviceValue}
            />
          </DGrid>
        </Modal.Content>
        <Modal.Actions>
          <NewConfirm
            clientId={clientId}
            setOpen={setOpen}
            serviceValue={serviceValue}
            employeeVal={employeeVal}
            startDate={startDate}
            selectedTime={selectedTime}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AppointmentModal;
