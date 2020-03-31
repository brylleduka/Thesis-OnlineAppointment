import React from "react";
import Layout from "../../../components/admin/layout/Layout";
import Showcase from "../../../components/admin/cms/home/showcase/Showcase";
import SectionAbout from "../../../components/admin/cms/home/sectionabout/SectionAbout";

const Home = () => {
  return (
    <Layout>
      <Showcase />
      <SectionAbout />
    </Layout>
  );
};

export default Home;
