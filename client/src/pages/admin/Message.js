import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_INQUIRY } from "../../util/graphql/inquiry.js";
import Layout from "../../components/admin/layout/Layout";
import { DButton, DLabel } from "../../components/styled/utils";
import { DSection, Content } from "../../components/styled/containers";
import { Breadcrumb, Icon } from "semantic-ui-react";
import DTextArea from "../../components/DTextArea";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const Message = (props) => {
  const inquiryId = props.match.params._id;
  const [inquiryInfo, setInquiryInfo] = useState({});
  const [content, setContent] = useState("");
  const { data: dataInqInfo, loading: loadInqInfo } = useQuery(FETCH_INQUIRY, {
    variables: {
      inquiryId,
    },
  });

  useEffect(() => {
    if (dataInqInfo) setInquiryInfo(dataInqInfo.inquiry);
  }, [dataInqInfo]);

  return (
    <Layout>
      <DSection
        width="90%"
        height="100%"
        mcenter
        flex
        align="center"
        direct="column"
        pad="24px 0"
      >
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
        >
          <Breadcrumb size={"huge"}>
            <Breadcrumb.Section>Inquiry List</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Message</Breadcrumb.Section>
          </Breadcrumb>
        </Content>

        <DSection
          flex
          width="100%"
          height="100%"
          margin="0 auto"
          direct="column"
        >
          <div>
            <DLabel size="16px" weight={700}>
              Sender:
            </DLabel>
            <span>{inquiryInfo.name}</span>
          </div>
          <div>
            <DLabel size="16px" weight={700}>
              Email:
            </DLabel>
            <span>{inquiryInfo.email}</span>
          </div>
          <div>
            <DLabel size="16px" weight={700}>
              Subject:
            </DLabel>
            <span>{inquiryInfo.subject}</span>
          </div>

          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"40%"}
              size="14px"
            >
              Message:
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
                {inquiryInfo.message}
              </DTextArea>
            </Content>
          </Content>

          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"40%"}
              size="14px"
            >
              Reply:
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
            <DButton>
              <Icon name="send" />
              Send
            </DButton>
          </Content>
        </DSection>
      </DSection>
    </Layout>
  );
};

export default Message;
