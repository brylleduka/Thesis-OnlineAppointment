import React, { useState } from "react";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import { Breadcrumb } from "semantic-ui-react";
import DRadio from "../../../components/DRadio";

const Gallery = () => {
  const [isRadioCheck, setIsRadioCheck] = useState("all");

  const handleRadioGallery = (e) => {
    setIsRadioCheck(e.target.value);
  };

  console.log(isRadioCheck);

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
          align="center"
          width="100%"
          margin="24px auto"
          bgcolor="#eee"
          rounded
          pad="3px 10px"
          height="5em"
        >
          <Breadcrumb size="big">
            <Breadcrumb.Section>Content Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Gallery</Breadcrumb.Section>
          </Breadcrumb>
        </Content>
        <Content height="100%" width="100%" flex align="center" margin="0 auto">
          <DRadio.RadioGroup>
            <DRadio.RadioInput
              value="all"
              label="All"
              id="radion-one"
              name="switch-one"
              checked={isRadioCheck === "all" ? true : false}
              onChange={handleRadioGallery}
            />
            <DRadio.RadioInput
              value="facility"
              label="Facility"
              id="radion-two"
              name="switch-one"
              checked={isRadioCheck === "facility" ? true : false}
              onChange={handleRadioGallery}
            />
            <DRadio.RadioInput
              value="event"
              label="Event"
              id="radion-three"
              name="switch-one"
              checked={isRadioCheck === "event" ? true : false}
              onChange={handleRadioGallery}
            />
          </DRadio.RadioGroup>
        </Content>
      </DSection>
    </Layout>
  );
};

export default Gallery;
