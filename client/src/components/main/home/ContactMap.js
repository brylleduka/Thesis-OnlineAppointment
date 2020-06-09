import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";

import { FETCH_CONTACT_INFO } from "../../../util/graphql/contact";
import { DSection, Content } from "../../styled/containers";
import FancyText from "../../FancyText";
import Spinner from "../../Spinner";

import MapComponent from "./MapComponent";
import ContactInquiry from "./ContactInquiry";

const ContactMap = () => {
  const [contacts, setContacts] = useState([]);

  const { data: contactData, loading: loadContact } = useQuery(
    FETCH_CONTACT_INFO
  );

  useEffect(() => {
    if (contactData) setContacts(contactData.contact);
  }, [contactData]);

  return (
    <DSection height="100%" width="100%" id="contact">
      {loadContact ? (
        <Content
          width="100%"
          height="80vh"
          flex
          justify="center"
          align="center"
        >
          <Spinner content="Fetching data..." />
        </Content>
      ) : (
        <>
          <Content
            flex
            justify="center"
            align="center"
            width="100%"
            height="20vh"
          >
            <FancyText size="38px">Contact Us</FancyText>
          </Content>
          {contacts &&
            contacts.map((cont) => (
              <>
                <ContactInquiry
                  address={cont.address}
                  phone={cont.phone}
                  mobile={cont.mobile}
                />
                <MapComponent
                  lat={cont.lat}
                  lng={cont.lng}
                  mapKey={cont.mapKey}
                />
              </>
            ))}
        </>
      )}
    </DSection>
  );
};

export default ContactMap;
