import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import { Breadcrumb } from "semantic-ui-react";
import { DSection, Content } from "../../../components/styled/containers";
import Promotions from "../../../components/admin/cms/promotion/Promotions";
import NewPromotion from "../../../components/admin/cms/promotion/NewPromotion";

const Promotion = () => {
  return (
    <Layout>
      <DSection
        height="100%"
        width="90%"
        mcenter
        flex
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
          pad="10px"
          height="5em"
        >
          <Breadcrumb size="big">
            <Breadcrumb.Section>Content Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Promotion</Breadcrumb.Section>
          </Breadcrumb>
          <NewPromotion />
        </Content>

        <Promotions />
      </DSection>
    </Layout>
  );
};

export default Promotion;
