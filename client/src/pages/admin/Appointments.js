import React from "react";
import { Link } from "react-router-dom";
import { DSection, DGrid, Content } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import { Breadcrumb, Divider } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import CurrentAppointments from "../../components/admin/appointment/CurrentAppointments";
import HistoryAppointments from "../../components/admin/appointment/HistoryAppointments";

const Appointments = () => {
  return (
    <Layout>
      <DSection width="90%" height="100%">
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
        >
          <Breadcrumb size={"huge"}>
            <Breadcrumb.Section as={Link} to="/zeadmin/appointments" active>
              Appointment
            </Breadcrumb.Section>
          </Breadcrumb>
          <Link to="/zeadmin/new_appointment" className="btn">
            New Appointment
          </Link>
        </Content>
        <DGrid>
          <CurrentAppointments />
          <HistoryAppointments />
        </DGrid>
      </DSection>
    </Layout>
  );
};

export default Appointments;
