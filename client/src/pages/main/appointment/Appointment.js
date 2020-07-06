import React, { useState } from "react";
// import { AuthContext } from "../../context/auth";

import AppointDate from "../../../components/main/appointment/AppointDate";
import AppointmentInputs from "../../../components/main/appointment/AppointmentInputs";
import {
  DSection,
  Content,
  DGrid,
  Overlay,
  DContainer,
} from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import Confirmation from "../../../components/main/appointment/Confirmation";
import useWindowSize from "../../../util/hooks/useWindowSize";

const Appointment = () => {
  const { width: wid } = useWindowSize();
  const [open, setOpen] = useState(false);

  const [categoryValue, setCategoryValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <DContainer>
      <DSection
        height="40vh"
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        className="dark"
        flex
        justify="center"
        align="center"
        width="100%"
        direct="column"
      >
        <h1 style={{ margin: "24px" }}>Make an Appointment Now</h1>
        <p
          style={{
            width: "90%",
            margin: "0 auto",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Great skin doesn't happen by chance. It happens by Appointment
        </p>
      </DSection>
      <DSection
        flex
        justify="space-between"
        align={wid <= 1024 ? "center" : "flex-start"}
        width="90%"
        height="100%"
        margin="24px auto"
      >
        {/* <DGrid two> */}
        {/* <DSection
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
              justify="center"
              align="center"
            >
              <div className="overlay-box">
                <div className="overlay-box__content dark">
                  <h1>Advertisement</h1>
                </div>
              </div>
            </Overlay>
          </DSection> */}

        {/* <DGrid custom="1fr 2fr" gap="10px"> */}
        <Content
          flex
          justify={wid <= 1024 ? "center" : "flex-start"}
          align="flex-start"
          width="80%"
          height="100%"
        >
          <AppointmentInputs
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            employeeVal={employeeVal}
            serviceValue={serviceValue}
            setServiceValue={setServiceValue}
            setEmployeeVal={setEmployeeVal}
          />
        </Content>

        <Content width="100%" margin="20px 0">
          <DGrid>
            <AppointDate
              setStartDate={setStartDate}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
              startDate={startDate}
              employeeVal={employeeVal}
              serviceValue={serviceValue}
              categoryValue={categoryValue}
              calendarSize={"calendar_large"}
            />
            <Content width="100%" flex justify="center" align="center">
              <DButton
                size="50px"
                onClick={() => setOpen(true)}
                disabled={
                  categoryValue === "CHECK_UP"
                    ? false
                    : categoryValue === "" ||
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
                categoryValue={categoryValue}
                serviceValue={serviceValue}
                employeeVal={employeeVal}
                startDate={startDate}
                selectedTime={selectedTime}
              />
            </Content>
          </DGrid>
        </Content>
        {/* </DGrid> */}
        {/* </DGrid> */}
      </DSection>
    </DContainer>
  );
};

export default Appointment;
