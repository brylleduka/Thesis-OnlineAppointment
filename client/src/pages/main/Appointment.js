import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";

import AppointDate from "../../components/main/appointment/AppointDate";
import AppointmentInputs from "../../components/main/appointment/AppointmentInputs";
import {
  DSection,
  Content,
  DGrid,
  Overlay
} from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import Confirmation from "../../components/main/appointment/Confirmation";
import { Carousel } from "react-responsive-carousel";

const Appointment = () => {
  const mql = window.matchMedia("(max-width: 768px)");

  const [open, setOpen] = useState(false);

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
        className="dark"
        flex
        justify="center"
        align="flex-end"
        width="100%"
      >
        <h1 style={{ margin: "24px" }}>Appointment</h1>
      </DSection>
      <DSection width="100%" height="100%">
        <DGrid two>
          <Carousel
            emulateTouch
            infiniteLoop
            useKeyboardArrows
            autoPlay
            showThumbs={false}
            showStatus={false}
            showArrows={mql.matches ? false : true}
          >
            <DSection
              width="100%"
              flex
              justify="center"
              align="center"
              background={
                "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              height="100vh"
            >
              <Overlay
                hovOpac="1"
                opac="0"
                bg={"rgba(0,0,0,0.7)"}
                flex
                jusitfy="center"
                align="center"
              >
                <div className="overlay-box">
                  <div className="overlay-box__content dark">
                    <h1>Advertisement</h1>
                  </div>
                </div>
              </Overlay>
            </DSection>
          </Carousel>
          <DGrid>
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
                <Content width="100%" flex justify="center" align="center">
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
        </DGrid>
      </DSection>
    </DGrid>
  );
};

const styles = {
  sec: {
    height: "30vh"
  }
};

export default Appointment;
