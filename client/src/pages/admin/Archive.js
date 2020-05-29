import React, { useState } from "react";
import { Breadcrumb } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import { DSection, Content } from "../../components/styled/containers";
import DRadio from "../../components/DRadio";
import Archiving from "../../components/admin/archive/Archiving";

const Archive = () => {
  const stored = localStorage.getItem("archive");
  const [isArchive, setIsArchive] = useState(
    stored === "arch-emp"
      ? "arch-emp"
      : stored === "arch-serv"
      ? "arch-serv"
      : "arch-emp"
  );

  const handleRadio = (e) => {
    setIsArchive(e.target.value);
    localStorage.setItem("archive", e.target.value);
  };

  return (
    <Layout>
      <DSection
        mcenter
        flex
        justify="space-around"
        align="center"
        direct="column"
        width="90%"
        height="100%"
      >
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
          bgcolor="#eee"
          rounded
          pad="3px 10px"
          height="5em"
        >
          <Breadcrumb size="big">
            <Breadcrumb.Section>File Maintenance</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Archive</Breadcrumb.Section>
          </Breadcrumb>
        </Content>
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="6px auto"
          bgcolor="#eee"
          rounded
          pad="3px 10px"
          height="100%"
        >
          <DRadio.RadioGroup>
            <DRadio.RadioInput
              checked={isArchive === "arch-emp" ? true : false}
              label="Employee"
              name="archive"
              value="arch-emp"
              id="employee"
              onChange={handleRadio}
            />
            <DRadio.RadioInput
              checked={isArchive === "arch-serv" ? true : false}
              label="Service"
              name="archive"
              value="arch-serv"
              id="service"
              onChange={handleRadio}
            />
          </DRadio.RadioGroup>
        </Content>
        <Content width="100%" margin="20px 0">
          <Archiving isArchive={isArchive} />
        </Content>
      </DSection>
    </Layout>
  );
};

export default Archive;
