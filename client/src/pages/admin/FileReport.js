import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DSection, DGrid, Content } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import { Breadcrumb, Divider } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import CurrentAppointments from "../../components/admin/appointment/CurrentAppointments";
import HistoryAppointments from "../../components/admin/appointment/HistoryAppointments";
import NewModal from "../../components/admin/appointment/NewModal";

const FileReport = () => {
  const [open, setOpen] = useState(false);
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
            <Breadcrumb.Section as={Link} to="/zeadmin/report" active>
              File Report
            </Breadcrumb.Section>
          </Breadcrumb>
        </Content>
        <DGrid>
          <HistoryAppointments />
        </DGrid>
      </DSection>
      <NewModal open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default FileReport;
