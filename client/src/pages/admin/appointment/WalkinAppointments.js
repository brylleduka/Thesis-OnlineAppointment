import React, { useState } from "react";

import {
  DSection,
  DGrid,
  Content,
} from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import { Breadcrumb } from "semantic-ui-react";
import CurrentWalkinAppointment from "../../../components/admin/walkinappointment/CurrentWalkinAppointment";
import NewWalkinAppointment from "../../../components/admin/walkinappointment/NewWalkinAppointment";
import Layout from "../../../components/admin/layout/Layout";
import { Plus } from "@styled-icons/boxicons-regular";

const Appointments = () => {
  const [openWalkinAppoint, setOpenWalkinAppoint] = useState(false);
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
            <Breadcrumb.Section active>Walk in</Breadcrumb.Section>
          </Breadcrumb>
          <DButton onClick={() => setOpenWalkinAppoint(true)}>
            <Plus size="22px" />
            Appointment
          </DButton>
        </Content>
        <DGrid>
          <CurrentWalkinAppointment />
        </DGrid>
      </DSection>
      <NewWalkinAppointment
        openWalkinAppoint={openWalkinAppoint}
        setOpenWalkinAppoint={setOpenWalkinAppoint}
      />
    </Layout>
  );
};

export default Appointments;
