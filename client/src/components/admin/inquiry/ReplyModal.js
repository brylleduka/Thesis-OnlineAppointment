import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_INQUIRY } from "../../../util/graphql/inquiry";
import { Modal, Icon, Dropdown, Form } from "semantic-ui-react";
import { Content, DGrid, DCard } from "../../styled/containers";
import { DButton, Toasted } from "../../styled/utils";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const ReplyModal = ({ open, setOpen, inqId }) => {
  const [displayMsg, setDisplayMsg] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  const [inq, setInq] = useState({});

  const { data: dataInq, loading: loadingInq } = useQuery(FETCH_INQUIRY, {
    variables: {
      inquiryId: inqId
    }
  });

  useEffect(() => {
    if (dataInq) {
      setInq(dataInq.inquiry);
    }
  }, [dataInq]);

  const [readInquiry, { loading: readLoading }] = useMutation(READ_INQ, {
    variables: {
      inqId: inqId
    }
  });

  const [replyInquiry, { loading }] = useMutation(REPLY_MESSAGE, {
    variables: {
      inquiryId: inq._id,
      email: inq.email,
      message: isMessage
    },
    update() {
      isMessage = "";
    },
    onCompleted(result) {
      toaster.notify("Message sent");
    }
  });

  const handleReply = () => {
    setDisplayMsg(true);
    readInquiry();
  };
  const handleReplyMsg = e => {
    setIsMessage(e.target.value);
  };

  function replyCallBack() {
    replyInquiry();
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setDisplayMsg(false);
      }}
    >
      <Modal.Header>Inquiry</Modal.Header>
      <Modal.Content>
        {dataInq && (
          <Content width="100%" height="100%">
            <DGrid gap="20px">
              <Content width="90%">
                <Dropdown trigger={<strong>{dataInq.inquiry.email}</strong>}>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <strong>email:</strong> {dataInq.inquiry.email}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <strong>name:</strong> {dataInq.inquiry.name}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Content>
              <Content width="100%" style={{ zIndex: 1 }}>
                <Form>
                  <Form.Field>
                    <label>Subject</label>
                    <input
                      value={dataInq.inquiry.subject}
                      readOnly
                      style={{ width: "auto" }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Message</label>
                    <textarea value={dataInq.inquiry.message} readOnly />
                  </Form.Field>
                </Form>
              </Content>
            </DGrid>
          </Content>
        )}

        <Content
          width="100%"
          flex
          column
          margin="20px 0"
          style={displayMsg ? { display: "block" } : { display: "none" }}
        >
          <Content width="100%" flex justify="space-between" align="center">
            <h3>Reply a message</h3>
            <Icon name="close" onClick={() => setDisplayMsg(false)} />
          </Content>
          <DCard dw="100%" dh="100%">
            <Form>
              <Form.Field>
                <textarea
                  value={isMessage}
                  onChange={handleReplyMsg}
                  name="reply"
                />
              </Form.Field>
            </Form>
          </DCard>
        </Content>
      </Modal.Content>
      <Modal.Actions>
        {displayMsg ? (
          <DButton onClick={replyCallBack}>
            {loading ? (
              <Spinner small inverted />
            ) : (
              <>
                <Icon name="send" />
                Send
              </>
            )}
          </DButton>
        ) : (
          <DButton onClick={handleReply}>
            <Icon name="reply" />
            Reply
          </DButton>
        )}
      </Modal.Actions>
    </Modal>
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

const READ_INQ = gql`
  mutation readInquiry($inqId: ID) {
    readInquiry(_id: $inqId)
  }
`;

export default ReplyModal;
