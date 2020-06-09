import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../util/hooks/useForm";
import {
  DContainer,
  DSection,
  DGrid,
  Content,
} from "../../components/styled/containers";
import { DButton, DLabel } from "../../components/styled/utils";
import { Form } from "semantic-ui-react";
import toaster from "toasted-notes";
import GoogleMapReact from "google-map-react";

import { Marker } from "@styled-icons/foundation";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const { values, handleChange, handleSubmit } = useForm(sendInquiryCallback, {
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sendInquiry, { loading }] = useMutation(SEND_INQUIRY, {
    variables: {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      to: values.email,
    },

    update() {
      values.name = "";
      values.email = "";
      values.subject = "";
      values.message = "";
    },
    onCompleted(result) {
      toaster.notify("Message sent");
    },
  });

  function sendInquiryCallback() {
    sendInquiry();
  }

  return (
    <DContainer>
      <DSection
        height="300px"
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        flex
        align="center"
        justify="center"
      >
        <h1>Contact</h1>
      </DSection>
      <DSection height="100%" width="90%" margin="24px auto">
        <DGrid two>
          <Content width="70%" height="100%" margin="0 auto">
            <Form>
              <Form.Field>
                <label>Location</label>
                <input
                  value="Brgy. Zone 1 Malihan street
Dasmariñas, Cavite 4114"
                  readOnly
                  style={{ border: "0", borderBottom: "1px solid  #ccc" }}
                />
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <input
                  value="
                  0926 652 4505"
                  readOnly
                  style={{ border: "0", borderBottom: "1px solid  #ccc" }}
                />
              </Form.Field>
            </Form>
          </Content>
          <Content width="90%" height="100%" margin="0 auto">
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Subject</label>
                <input
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Message</label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
              </Form.Field>
              <DButton fluid type="submit">
                {loading ? <p>Loading...</p> : "Send"}
              </DButton>
            </Form>
          </Content>
        </DGrid>
        <Content
          height="50vh"
          width="100%"
          bgcolor="#ccc"
          flex
          justify="center"
          align="center"
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAF8qgxG2aEudQxqxsKjZF1n7MkGXURvoo",
            }}
            defaultCenter={{ lat: 14.326171, lng: 120.9369621 }}
            defaultZoom={15}
          >
            <div
              style={{
                position: "absolute",
                transform: "translate(-50%,-50%)",
              }}
              lat={14.326171}
              lng={120.9369621}
              text="MARKER"
            >
              <Marker color="#fe8c00" size="48px" />
            </div>
          </GoogleMapReact>
        </Content>
      </DSection>
    </DContainer>
  );
};

const SEND_INQUIRY = gql`
  mutation sendInquiry(
    $name: String
    $email: String
    $to: String
    $subject: String
    $message: String
  ) {
    sendInquiry(
      name: $name
      email: $email
      to: $to
      subject: $subject
      message: $message
    ) {
      name
      email
      subject
      message
      to
    }
  }
`;

export default Contact;
