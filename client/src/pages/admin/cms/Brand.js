import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import {
  DSection,
  Content,
  DCard,
} from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import NewBrand from "../../../components/admin/cms/brand/NewBrand";
import BrandList from "../../../components/admin/cms/brand/BrandList";

const Brand = () => {
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
            <Breadcrumb.Section active>Brand</Breadcrumb.Section>
          </Breadcrumb>
        </Content>

        <NewBrand />
        <BrandList />
      </DSection>
    </Layout>
  );
};

export default Brand;
