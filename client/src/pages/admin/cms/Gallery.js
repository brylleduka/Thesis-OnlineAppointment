import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";

const Gallery = () => {
  return (
    <Layout>
      <DSection
        height="100%"
        width="90%"
        mcenter
        flex
        justify="space-between"
        align="center"
        direct="column"
        minh="90vh"
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
            <Breadcrumb.Section content>Content Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Gallery</Breadcrumb.Section>
          </Breadcrumb>
        </Content>
        <Content
          height="100%"
          width="90%"
          flex
          justify="center"
          align="center"
          margin="0 auto"
        >
          Content
        </Content>
      </DSection>
    </Layout>
  );
};

export default Gallery;
