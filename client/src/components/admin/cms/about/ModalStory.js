import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import { Icon, Modal, Form, Popup, TextArea } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  DImage,
  Content,
  DSection,
  Overlay,
  DGrid,
} from "../../../styled/containers";
import { DButtonFree, DButton, DLabel } from "../../../styled/utils";
import Spinner from "../../../Spinner";
import DTextArea from "../../../DTextArea";
import useUploadFile from "../../../../util/hooks/useUploadFile";
import toaster from "toasted-notes";

const ModalStory = ({ isStory }) => {
  const fileInput = useRef();
  const [openStory, setOpenStory] = useState(false);
  const [reverse, setReverse] = useState(isStory ? isStory.alt : false);
  const [content, setContent] = useState(isStory ? isStory.paragraph : "");
  const [stories, setStories] = useState({
    title: isStory ? isStory.title : "",
    subtitle: isStory ? isStory.subtitle : "",
  });

  const { preview, selectedFile, onSelectedFile } = useUploadFile();

  const [updateStory, { loading }] = useMutation(UPDATE_ABOUT_STORY, {
    variables: {
      ...stories,
      paragraph: content,
      photo: selectedFile,
      alt: reverse,
    },
    onCompleted() {
      setOpenStory(false);
      toaster.notify("Update Successfully", {
        position: "bottom-right",
      });
    },
  });

  const handleInputClick = () => {
    fileInput.current.click();
  };

  const handleChangeStory = (e) => {
    setStories({ ...stories, [e.target.name]: e.target.value });
  };

  const handleReverse = () => {
    setReverse(!reverse);
  };

  const handleSaveStory = () => {
    updateStory();
  };

  return (
    <>
      <DButtonFree
        top={0}
        right={0}
        style={{ zIndex: 2 }}
        onClick={() => setOpenStory(true)}
        style={{ zIndex: 3 }}
      >
        <Icon name="edit" fitted />
      </DButtonFree>
      <Modal open={openStory} onClose={() => setOpenStory(false)} closeIcon>
        <Modal.Header>Update Header Content</Modal.Header>
        <DGrid two gap="20px">
          <Modal.Content style={{ padding: "10px" }}>
            <DSection width="100%" height="50vh">
              <DImage dashed height="100%" width="100%">
                {selectedFile ? (
                  <img src={preview} alt="showcase" />
                ) : (
                  isStory.imageURL && (
                    <img src={isStory.imageURL} alt="showcase" />
                  )
                )}
              </DImage>
            </DSection>

            <Content
              width="80%"
              margin="0 auto"
              flex
              justify="center"
              align="center"
            >
              <input
                type="file"
                value={undefined}
                onChange={onSelectedFile}
                style={{ display: "none" }}
                ref={fileInput}
              />
              <Popup
                content="Select image for background slide"
                trigger={
                  <Icon
                    name="camera"
                    size="large"
                    onClick={handleInputClick}
                    style={{
                      cursor: "pointer",
                      color: "#2193b0",
                      opacity: 0.75,
                    }}
                    className="icon_camera-custom"
                  />
                }
              />
            </Content>
          </Modal.Content>
          <Modal.Content scrolling style={{ padding: "10px" }}>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  name="title"
                  value={stories.title || ""}
                  onChange={handleChangeStory}
                />
              </Form.Field>
              <Form.Field>
                <label>Subtitle</label>
                <input
                  name="subtitle"
                  value={stories.subtitle || ""}
                  onChange={handleChangeStory}
                />
              </Form.Field>

              {/* <Form.Field>
                <label>Paragraph</label>
                <TextArea
                  style={{ minHeight: 100 }}
                  name="paragraph"
                  value={stories.paragraph || ""}
                  onChange={handleChangeStory}
                />
              </Form.Field> */}
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
                  Paragraph
                </DLabel>
                <Content
                  width="100%"
                  height="auto"
                  flex
                  justify="center"
                  align="center"
                  pad="3px 15px"
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

              <Form.Field>
                <label>
                  Image Position
                  <Popup
                    content="Adding overlay over the top of slide and make the text white for contrast"
                    trigger={
                      <Icon name="question circle outline" size="large" />
                    }
                  />
                </label>
                <Content
                  flex
                  align="center"
                  margin="0 auto"
                  width="80%"
                  height="10vh"
                >
                  <div className="pretty p-switch p-fill">
                    <input
                      type="checkbox"
                      name="dark"
                      value={reverse}
                      checked={reverse === true ? true : false}
                      onChange={handleReverse}
                    />
                    <div className="state p-info">
                      <label>Reverse</label>
                    </div>
                  </div>
                </Content>
              </Form.Field>
            </Form>
          </Modal.Content>
        </DGrid>
        <Modal.Actions>
          <DButton confirm onClick={handleSaveStory}>
            {loading ? <Spinner small inverted /> : "Update"}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const UPDATE_ABOUT_STORY = gql`
  mutation updateStory(
    $title: String
    $subtitle: String
    $paragraph: String
    $photo: Upload
    $alt: Boolean
  ) {
    updateStory(
      inputStory: {
        title: $title
        subtitle: $subtitle
        paragraph: $paragraph
        photo: $photo
        alt: $alt
      }
    ) {
      _id
      story {
        title
        subtitle
        paragraph
        photo
        imageURL
        alt
      }
    }
  }
`;

export default ModalStory;
