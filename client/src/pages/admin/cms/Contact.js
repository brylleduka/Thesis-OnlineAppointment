import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CONTACT_INFO } from "../../../util/graphql/contact";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import ContactModal from "../../../components/admin/contact/ContactModal";
import Spinner from "../../../components/Spinner";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const {
    data: dataContactInfo,
    loading: loadContactInfo,
    error: errContactInfo,
  } = useQuery(FETCH_CONTACT_INFO);

  useEffect(() => {
    if (dataContactInfo) setContacts(dataContactInfo.contact);
  }, [dataContactInfo]);

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
            <Breadcrumb.Section active>Contact Info</Breadcrumb.Section>
          </Breadcrumb>
          {contacts.length < 1 && <ContactModal />}
        </Content>
        <DSection width="100%" height="100%" flex direct="column">
          <Content>Details</Content>
          <Content>Map</Content>
        </DSection>
      </DSection>
    </Layout>
  );
};

export default Contact;
