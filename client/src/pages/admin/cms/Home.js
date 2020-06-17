import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/admin/layout/Layout";
import Showcase from "../../../components/admin/cms/home/showcase/Showcase";
import SectionAbout from "../../../components/admin/cms/home/sectionabout/SectionAbout";
import SectionCategory from "../../../components/admin/cms/home/sectioncategory/SectionCategory";
import { Content, DSection } from "../../../components/styled/containers";
import { IconWrap } from "../../../components/styled/utils";
import { ChevronRight } from "@styled-icons/boxicons-solid/ChevronRight";

const Home = () => {
  return (
    <Layout>
      <DSection width="100%" height="100%" flex direct="column">
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
          <div style={{ margin: "0 5px" }}>
            <IconWrap size="22px" color="dark">
              <ChevronRight />
            </IconWrap>
          </div>
          <div>
            <Link
              to="/zeadmin/cms_home"
              style={{
                fontSize: "18px",
                fontWeight: 700,
                borderBottom: "2px solid",
                paddingBottom: "5px",
              }}
            >
              Home
            </Link>
          </div>
        </Content>
        <Showcase />
        <SectionAbout />
        <SectionCategory />
      </DSection>
    </Layout>
  );
};

export default Home;
