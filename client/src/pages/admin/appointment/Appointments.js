import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DSection,
  DGrid,
  Content,
} from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import Layout from "../../../components/admin/layout/Layout";
import CurrentAppointments from "../../../components/admin/appointment/CurrentAppointments";
// import HistoryAppointments from "../../components/admin/appointment/HistoryAppointments";

const Appointments = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <DSection width="90%" mcenter height="100%">
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
        >
          <Breadcrumb size="big">
            <Breadcrumb.Section>Appointment</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Online</Breadcrumb.Section>
          </Breadcrumb>
          {/* <DButton onClick={() => setOpen(true)}>New Appointment</DButton> */}
        </Content>
        <DGrid>
          <CurrentAppointments />
          {/* <HistoryAppointments /> */}
        </DGrid>
      </DSection>
    </Layout>
  );
};

export default Appointments;
