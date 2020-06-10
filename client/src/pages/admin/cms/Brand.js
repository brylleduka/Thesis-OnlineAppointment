import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import {
  DSection,
  Content,
  DCard,
} from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import { ReactComponent as ReactLogo } from "../../../ze_logo.svg";

const Brand = () => {
  return (
    <Layout>
      <DSection>
        <ReactLogo
          style={{
            width: "200px",
            filter: " brightness(0%) invert(100%)",
          }}
        />
      </DSection>
    </Layout>
  );
};

export default Brand;
