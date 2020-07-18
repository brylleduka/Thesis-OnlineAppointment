import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { DButton, DLabel } from "../../styled/utils";
import { Content } from "../../styled/containers";
import { Icon } from "semantic-ui-react";
import DTextArea from "../../DTextArea";
import Spinner from "../../Spinner";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Form } from "semantic-ui-react";


const ReplyForm = ({ inquiryId, email }) => {
  const [content, setContent] = useState("");

  const [replyMessage, { loading: loadReplyMsg }] = useMutation(REPLY_MESSAGE, {
    variables: {
      inquiryId,
      email,
      message: content,
    },
  });

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    replyMessage();
  };

  return (
    <Form noValidate onSubmit={handleSubmitMessage}>
      <Content
        width="100%"
        height="100%"
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
        margin="12px auto"
      >
        <DLabel flex justifyEnd alignCenter weight={700} w={"40%"} size="14px">
          Send Message:
        </DLabel>
        <Content
          width="90%"
          height="auto"
          flex
          justify="center"
          align="center"
          pad="3px 15px"
          margin="0 auto"
        >
          <DTextArea border active={true}>
            <CKEditor
              onInit={(editor) => {
                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              editor={DecoupledEditor}
              data={content}
            />
          </DTextArea>
        </Content>
      </Content>
      <Content
        width="90%"
        margin="0 auto"
        flex
        justify="flex-end"
        align="center"
      >
        <DButton type="submit">
          {loadReplyMsg ? (
            <Spinner row small inverted content="Sending..." />
          ) : (
            <>
              <Icon name="send" />
              Send
            </>
          )}
        </DButton>
      </Content>
    </Form>
  );
};

const REPLY_MESSAGE = gql`
  mutation replyInquiry($inquiryId: ID!, $email: String, $message: String) {
    replyInquiry(_id: $inquiryId, email: $email, message: $message) {
      _id
      message
      email
      createdAt
    }
  }
`;
export default ReplyForm;
