import React from "react";
import { Content, DGrid, DCard } from "../../styled/containers";
import CurrentAppointment from "./CurrentAppointment";
import MyAppointmentHistory from "./MyAppointmentHistory";

const UserAppointments = () => {
  return (
    <Content width="100%" height="100%">
      <DGrid dh="100%" gap="20px">
        <DCard dw="100%" flex fcol justifyCenter>
          <h2>Ongoing Appointment</h2>
          <CurrentAppointment />
        </DCard>
        <DCard dw="100%" dh="100%" flex fcol justifyCenter>
          <h2>Appointment History</h2>
          <MyAppointmentHistory />
        </DCard>
      </DGrid>
    </Content>
  );
};

export default UserAppointments;
