import React, { useState } from "react";
import { Modal, Form } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import { DGrid } from "../../styled/containers";
import AppointmentInputs from "./AppointmentInputs";
import AppointDate from "./AppointDate";
import ReschedConfirm from "./ReschedConfirm";

const ReschedModal = ({
  appointmentId,
  setOpen,
  isAdmin,
  status,
  diffHours,
}) => {
  const [isResched, setIsResched] = useState(false);

  const [categoryValue, setCategoryValue] = useState("");
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
      <DButton
        onClick={handleModalResched}
        fluid={isAdmin ? true : null}
        disabled={diffHours < 12 && !isAdmin ? true : false}
      >
        Reschedule
      </DButton>
      <Modal size="large" open={isResched} onClose={() => setIsResched(false)}>
        <Modal.Header>Reschedule of Appointment</Modal.Header>
        <Modal.Content>
          <DGrid two>
            <AppointmentInputs
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
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
            diffHours={diffHours}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ReschedModal;
