import React from "react";
import { Content, DGrid, DCard } from "../../styled/containers";
import CurrentAppointment from "./CurrentAppointment";
import MyAppointmentHistory from "./MyAppointmentHistory";

const UserAppointments = ({ userInfo }) => {
  return (
    <Content width="100%" height="100%">
      <DGrid dh="100%" gap="20px" med7={"1fr"} med10="1fr">
        <DCard dw="100%" flex fcol justifyCenter>
          <h3>Ongoing Appointment</h3>
          <CurrentAppointment userInfo={userInfo} />
        </DCard>
        <DCard dw="100%" dh="100%" flex fcol justifyCenter>
          <h3>Appointment History</h3>
          <MyAppointmentHistory />
        </DCard>
      </DGrid>
    </Content>
  );
};

export default UserAppointments;
