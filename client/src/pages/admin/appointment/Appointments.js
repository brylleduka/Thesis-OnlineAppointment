import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  DSection,
  DGrid,
  Content,
} from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import Layout from "../../../components/admin/layout/Layout";
import CurrentAppointments from "../../../components/admin/appointment/CurrentAppointments";

const Appointments = () => {
  const [open, setOpen] = useState(false);

  const [viewAppoints] = useMutation(VIEW_APPOINTMENT, {
    variables: { view: true },
  });

  useEffect(() => {
    viewAppoints();
  }, []);

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
        </Content>
        <DGrid>
          <CurrentAppointments />
          {/* <HistoryAppointments /> */}
        </DGrid>
      </DSection>
    </Layout>
  );
};

const VIEW_APPOINTMENT = gql`
  mutation viewAppointments($view: Boolean) {
    viewAppointments(view: $view) {
      _id
      view
    }
  }
`;

export default Appointments;
