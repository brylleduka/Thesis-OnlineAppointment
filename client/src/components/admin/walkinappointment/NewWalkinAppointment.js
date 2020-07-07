import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_CURRENT_WALKIN_APPOINTMENTS } from "../../../util/graphql/walkinappointment";
import { Modal, Button } from "semantic-ui-react";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";
import toaster from "toasted-notes";
import NewWalkinContent from "./walkappoint/NewWalkinContent";
import moment from "moment";

const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

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
    contact: "",
    address: "",
  });

  const [
    createWalkinAppointment,
    { loading: loadCreateWalkAppoint },
  ] = useMutation(CREATE_WALKIN_APPOINTMENT, {
    variables: {
      ...clientValues,
      serviceId: serviceValue,
      employeeId: employeeVal,
      date: moment(startDate).format("L"),
      time: selectedTime,
    },
    onCompleted() {
      setOpenWalkinAppoint(false);
      setStepCount(1);
      setCategoryValue("");
      setEmployeeVal("");
      setStartDate(new Date());
      setSelectedTime("");
      setClientValues({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        address: "",
      });

      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          Successfully booked an appointment
        </Toasted>
      ));
    },
    refetchQueries: [{ query: FETCH_CURRENT_WALKIN_APPOINTMENTS }],
  });

  // HANDLES

  const handleCreateWalkAppoint = () => {
    createWalkinAppointment();
  };

  const nextStep = () => {
    setStepCount(stepCount + 1);
  };

  const prevStep = () => {
    setStepCount(stepCount - 1);
  };

  const closeModal = () => {
    setOpenWalkinAppoint(false);
    setStepCount(1);
    setCategoryValue("");
    setEmployeeVal("");
    setStartDate(new Date());
    setSelectedTime("");
    setClientValues({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address: "",
    });
  };

  return (
    <Modal
      size={stepCount >= 2 ? null : "tiny"}
      open={openWalkinAppoint}
      onClose={closeModal}
      closeIcon
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        {stepCount === 1 ? (
          <h2>Client's Details</h2>
        ) : stepCount === 2 ? (
          <h2>Appointment's Details</h2>
        ) : stepCount === 3 ? (
          <h2>Appointment Confirmation</h2>
        ) : (
          ""
        )}
      </Modal.Header>
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
        {stepCount === 1 ? (
          <Button
            color="blue"
            onClick={nextStep}
            disabled={
              clientValues.firstName.trim() === "" ||
              clientValues.lastName.trim() === "" ||
              (clientValues.email && !clientValues.email.match(regex))
                ? true
                : null
            }
          >
            Next
          </Button>
        ) : stepCount === 2 ? (
          <>
            <Button color="blue" onClick={prevStep}>
              Back
            </Button>
            <Button
              color="blue"
              onClick={nextStep}
              disabled={
                serviceValue === "" || employeeVal === "" || selectedTime === ""
                  ? true
                  : null
              }
            >
              Next
            </Button>
          </>
        ) : stepCount === 3 ? (
          <>
            <Button color="blue" onClick={prevStep}>
              Back
            </Button>
            <Button color="green" onClick={handleCreateWalkAppoint}>
              {loadCreateWalkAppoint ? (
                <Spinner inverted row small content="Booking..." />
              ) : (
                "Book"
              )}
            </Button>
          </>
        ) : (
          ""
        )}

        {/* {stepCount < 3 ? (
          <Button color="blue" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button color="green" onClick={handleCreateWalkAppoint}>
            {loadCreateWalkAppoint ? (
              <Spinner inverted row small content="Booking..." />
            ) : (
              "Book"
            )}
          </Button>
        )} */}
      </Modal.Actions>
    </Modal>
  );
};

const CREATE_WALKIN_APPOINTMENT = gql`
  mutation createWalkinAppointment(
    $firstName: String
    $lastName: String
    $contact: String
    $email: String
    $address: String
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $time: String!
  ) {
    createWalkinAppointment(
      firstName: $firstName
      lastName: $lastName
      contact: $contact
      email: $email
      address: $address
      serviceId: $serviceId
      employeeId: $employeeId
      date: $date
      slot_start: $time
    ) {
      _id
      date
      slot_start
      walkinClient {
        _id
        firstName
        lastName
        contact
        email
        address
      }
      service {
        _id
        name
        price
        duration
        photo
      }
      employee {
        _id
        empId
        firstName
        lastName
      }
    }
  }
`;

export default NewWalkinAppointment;
