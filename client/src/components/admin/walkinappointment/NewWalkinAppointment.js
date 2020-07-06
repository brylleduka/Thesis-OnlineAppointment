import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Button } from "semantic-ui-react";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";
import toaster from "toasted-notes";
import NewWalkinContent from "./walkappoint/NewWalkinContent";

const NewWalkinAppointment = ({ openWalkinAppoint, setOpenWalkinAppoint }) => {
  const [stepCount, setStepCount] = useState(1);
  const [categoryValue, setCategoryValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [clientValues, setClientValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    contact: "",
    address: "",
  });

  // HANDLES

  const nextStep = () => {
    setStepCount(stepCount + 1);
  };

  const prevStep = () => {
    setStepCount(stepCount - 1);
  };

  const closeModal = () => {
    setOpenWalkinAppoint(false);
    setStepCount(1);
  };

  console.log(clientValues);

  return (
    <Modal
      size={stepCount === 2 ? "small" : "tiny"}
      open={openWalkinAppoint}
      onClose={closeModal}
      closeIcon
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <NewWalkinContent
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          serviceValue={serviceValue}
          setServiceValue={setServiceValue}
          employeeVal={employeeVal}
          setEmployeeVal={setEmployeeVal}
          startDate={startDate}
          setStartDate={setStartDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          clientValues={clientValues}
          setClientValues={setClientValues}
          stepCount={stepCount}
        />
      </Modal.Content>
      <Modal.Actions>
        {stepCount > 1 && (
          <Button color="blue" onClick={prevStep}>
            Back
          </Button>
        )}
        {stepCount < 3 ? (
          <Button color="blue" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button color="green" onClick={() => toaster.notify("ok")}>
            Book
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default NewWalkinAppointment;
