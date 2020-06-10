import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_CONTACT_INFO } from "../../../util/graphql/contact";
import { Modal, Form, Input } from "semantic-ui-react";
import { DButton, DLabel } from "../../styled/utils";
import { Plus } from "@styled-icons/boxicons-regular";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";
import toaster from "toasted-notes";

const ContactModal = () => {
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [contactVals, setContactVals] = useState({
    address: "",
    lat: "",
    lng: "",
    mapKey: "",
    phone: "",
    mobile: "",
  });

  const [addContact, { loading: loadContact }] = useMutation(ADD_CONTACT_INFO, {
    variables: {
      address: contactVals.address,
      lat: parseFloat(contactVals.lat),
      lng: parseFloat(contactVals.lng),
      mapKey: contactVals.mapKey,
      phone: contactVals.phone,
      mobile: contactVals.mobile,
    },
    refetchQueries: [{ query: FETCH_CONTACT_INFO }],
    onCompleted() {
      setIsOpenContact(false);

      toaster.notify(
        ({ onClose }) => (
          <Toasted success onClick={onClose}>
            New Contact Info Added
          </Toasted>
        ),
        { position: "bottom-right" }
      );

      setContactVals({
        address: "",
        lat: "",
        lng: "",
        mapKey: "",
        phone: "",
        mobile: "",
      });
    },
  });

  const handleContactVals = (e) => {
    setContactVals({ ...contactVals, [e.target.name]: e.target.value });
  };

  const handleNewContact = (e) => {
    e.preventDefault();
    addContact();
  };

  return (
    <>
      <DButton flex onClick={() => setIsOpenContact(true)}>
        <Plus size="22px" /> Contacts
      </DButton>
      <Modal
        size="small"
        open={isOpenContact}
        closeIcon
        onClose={() => setIsOpenContact(false)}
      >
        <Modal.Header>New Contact Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Address</label>
              <Input
                fluid
                type="text"
                name="address"
                value={contactVals.address}
                onChange={handleContactVals}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Latitude</label>
                <Input
                  type="text"
                  name="lat"
                  value={contactVals.lat}
                  onChange={handleContactVals}
                />
              </Form.Field>
              <Form.Field>
                <label>Longitude</label>
                <Input
                  type="text"
                  name="lng"
                  value={contactVals.lng}
                  onChange={handleContactVals}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Map Api Key</label>
              <Input
                type="text"
                name="mapKey"
                value={contactVals.mapKey}
                onChange={handleContactVals}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <Input
                type="text"
                name="phone"
                value={contactVals.phone}
                onChange={handleContactVals}
              />
            </Form.Field>
            <Form.Field>
              <label>Mobile Number</label>
              <Input
                label="+63"
                name="mobile"
                value={contactVals.mobile}
                onChange={handleContactVals}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <DButton flex onClick={handleNewContact}>
            {loadContact ? (
              <Spinner small row inverted content="Adding..." />
            ) : (
              "Add"
            )}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const ADD_CONTACT_INFO = gql`
  mutation addContact(
    $address: String
    $lat: Float
    $lng: Float
    $mapKey: String
    $phone: String
    $mobile: String
  ) {
    addContact(
      address: $address
      lat: $lat
      lng: $lng
      mapKey: $mapKey
      phone: $phone
      mobile: $mobile
    ) {
      _id
      address
      lat
      lng
      mapKey
      phone
      mobile
    }
  }
`;

export default ContactModal;
