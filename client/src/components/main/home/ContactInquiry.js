import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { DSection, DGrid, Content } from "../../styled/containers";
import { DButton, DInput, DLabel } from "../../styled/utils";
import { Form } from "semantic-ui-react";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";

const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const ContactInquiry = ({ address, phone, mobile }) => {
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
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function sendInquiryCallback() {
    sendInquiry();
  }

  return (
    <Content width="90%" height="100%" margin="0 auto" pad="20px">
      <DGrid two>
        <Content width="70%" height="100%" margin="0 auto">
          <Form>
            <Form.Field>
              <label>Location</label>
              <input
                value={address}
                readOnly
                style={{ border: "0", borderBottom: "1px solid  #ccc" }}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input
                value={phone}
                readOnly
                style={{ border: "0", borderBottom: "1px solid  #ccc" }}
              />
            </Form.Field>
            <Form.Field>
              <label>Mobile</label>
              <input
                value={mobile}
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
              <input name="name" value={values.name} onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              {values.email.match(regex) ? (
                ""
              ) : errors.emailX || errors.email ? (
                <DLabel rounded color="red" bglight>
                  {errors.emailX || errors.email}
                </DLabel>
              ) : (
                ""
              )}

              <DInput
                error={
                  values.email.match(regex)
                    ? null
                    : errors.emailX || errors.email
                    ? true
                    : null
                }
                fluid
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Subject</label>
              {values.subject.trim() !== "" ? (
                ""
              ) : errors.subject ? (
                <DLabel rounded color="red" bglight>
                  {errors.subject}
                </DLabel>
              ) : (
                ""
              )}

              <DInput
                error={
                  values.subject.trim() !== ""
                    ? null
                    : errors.subject
                    ? true
                    : null
                }
                fluid
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Message</label>
              {values.message.trim() !== "" ? (
                ""
              ) : errors.message ? (
                <DLabel rounded color="red" bglight>
                  {errors.message}
                </DLabel>
              ) : (
                ""
              )}
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
              />
            </Form.Field>
            <DButton fluid type="submit">
              {loading ? (
                <Spinner small row inverted content="Sending" />
              ) : (
                "Send"
              )}
            </DButton>
          </Form>
        </Content>
      </DGrid>
    </Content>
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

export default ContactInquiry;
