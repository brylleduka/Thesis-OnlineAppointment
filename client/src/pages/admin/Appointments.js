import React from "react";

import { DSection, DGrid } from "../../components/styled/containers";
import Layout from "../../components/admin/layout/Layout";
import CurrentAppointments from "../../components/admin/appointment/CurrentAppointments";
import HistoryAppointments from "../../components/admin/appointment/HistoryAppointments";

const Appointments = () => {
  return (
    <Layout>
      <DSection width="90%" height="100%">
        <DGrid>
          <CurrentAppointments />
          <HistoryAppointments />
        </DGrid>
      </DSection>
    </Layout>
  );
};

export default Appointments;
