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
          Map
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
