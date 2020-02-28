import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";

import AppointDate from "../../components/main/appointment/AppointDate";
import AppointmentInputs from "../../components/main/appointment/AppointmentInputs";
import { DSection, Content, DGrid } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import Confirmation from "../../components/main/appointment/Confirmation";

const Appointment = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState([]);
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

  return (
    <DGrid>
      <DSection
        height="40vh"
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      ></DSection>
      <DSection height="100%" pad="0 20px">
        <DGrid custom="500px 1fr">
          <AppointmentInputs
            user={user}
            values={values}
            setValues={setValues}
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
          <Content width="100%" margin="20px 0">
            <DGrid>
              <AppointDate
                setStartDate={setStartDate}
                setSelectedTime={setSelectedTime}
                selectedTime={selectedTime}
                startDate={startDate}
                employeeVal={employeeVal}
                serviceValue={serviceValue}
              />
              <Content width="100%" flex justify="center">
                <DButton
                  size="50px"
                  onClick={() => setOpen(true)}
                  basic={
                    (values.category === "" ||
                      serviceValue === "" ||
                      employeeVal === "" ||
                      selectedTime === "") &&
                    true
                  }
                  disabled={
                    values.category === "" ||
                    serviceValue === "" ||
                    employeeVal === "" ||
                    selectedTime === ""
                      ? true
                      : false
                  }
                >
                  Book an Appointment
                </DButton>
                <Confirmation
                  open={open}
                  setOpen={setOpen}
                  serviceValue={serviceValue}
                  employeeVal={employeeVal}
                  startDate={startDate}
                  selectedTime={selectedTime}
                />
              </Content>
            </DGrid>
          </Content>
        </DGrid>
      </DSection>
    </DGrid>
  );
};

export default Appointment;
