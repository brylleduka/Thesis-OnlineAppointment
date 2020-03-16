import React, { useState } from "react";
import { Modal, Form } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import { DGrid } from "../../styled/containers";
import AppointmentInputs from "./AppointmentInputs";
import AppointDate from "./AppointDate";
import ReschedConfirm from "./ReschedConfirm";

const ReschedModal = ({ appointmentId, setOpen, isAdmin, status }) => {
  const [isResched, setIsResched] = useState(false);

  const [service, setService] = useState([]);
  const [serviceEmp, setServiceEmp] = useState([]);
  const [values, setValues] = useState({
    category: ""
  });
  const [serviceValue, setServiceValue] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [selectedTime, setSelectedTime] = useState("");

  const handleModalResched = () => {
    setIsResched(true);
  };

  return (
    <>
      <DButton onClick={handleModalResched}>Reschedule</DButton>
      <Modal size="large" open={isResched} onClose={() => setIsResched(false)}>
        <Modal.Header>Reschedule of Appointment</Modal.Header>
        <Modal.Content>
          <DGrid two>
            <AppointmentInputs
              values={values}
              setValues={setValues}
              employeeVal={employeeVal}
              setService={setService}
              setServiceEmp={setServiceEmp}
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
          <ReschedConfirm
            appointmentId={appointmentId}
            setOpen={setOpen}
            setIsResched={setIsResched}
            serviceValue={serviceValue}
            employeeVal={employeeVal}
            startDate={startDate}
            selectedTime={selectedTime}
            isAdmin={isAdmin}
            status={status}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ReschedModal;
