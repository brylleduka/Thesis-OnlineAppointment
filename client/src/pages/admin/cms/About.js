import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import Heading from "../../../components/admin/cms/about/Heading";
import Story from "../../../components/admin/cms/about/Story";
import Mission from "../../../components/admin/cms/about/Mission";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Content } from "../../../components/styled/containers";

const About = () => {
  return (
    <Layout>
      <Content
        width="90%"
        flex
        justify="flex-start"
        margin="20px auto"
        align="center"
      >
        <div>
          <h3>Content Management</h3>
        </div>
        <div style={{ margin: "0 1em" }}>
          <Icon name="angle right" size="large" fitted />
        </div>
        <div>
          <Link
            to="/zeadmin/cms_about"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              borderBottom: "2px solid",
              paddingBottom: "5px"
            }}
          >
            About Us
          </Link>
        </div>
      </Content>
      <Heading />
      <Mission />
      <Story />
    </Layout>
  );
};

export default About;
