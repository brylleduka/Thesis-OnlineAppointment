import React, { useState, useEffect } from "react";
import { FETCH_HISTORY_APPOINTMENTS } from "../../util/graphql/appointment";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { DSection, DGrid, Content } from "../../components/styled/containers";
import { Breadcrumb, Divider } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import HistoryAppointments from "../../components/admin/appointment/HistoryAppointments";
import NewModal from "../../components/admin/appointment/NewModal";
import { NoPrint } from "react-easy-print";

const FileReport = () => {
  const [open, setOpen] = useState(false);
  const [historyAppointments, setHistoryAppointments] = useState([]);

  const { loading, data: historyAppointmentData } = useQuery(
    FETCH_HISTORY_APPOINTMENTS
  );

  useEffect(() => {
    if (historyAppointmentData) {
      setHistoryAppointments(historyAppointmentData.appointmentHistory);
    }
  }, [historyAppointmentData]);

  return (
    <Layout>
      <DSection width="90%" mcenter height="100%">
        <NoPrint force>
          <Content
            flex
            justify="space-between"
            align="center"
            width="100%"
            margin="24px auto"
          >
            <Breadcrumb size={"huge"}>
              <Breadcrumb.Section as={Link} to="/zeadmin/report" active>
                File Report
              </Breadcrumb.Section>
            </Breadcrumb>
          </Content>
        </NoPrint>
        <Content
          width="100%"
          height="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <HistoryAppointments
            loading={loading}
            historyAppointments={historyAppointments}
          />
        </Content>
      </DSection>
    </Layout>
  );
};

export default FileReport;
