import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import { Icon, Modal, Form, Popup } from "semantic-ui-react";
import {
  DImage,
  Content,
  DSection,
  Overlay,
  DGrid,
} from "../../../styled/containers";
import { DButtonFree, DButton } from "../../../styled/utils";
import Spinner from "../../../Spinner";
import useUploadFile from "../../../../util/hooks/useUploadFile";
import { BlockPicker } from "react-color";
import toaster from "toasted-notes";

const colors = [
  "#6dd5ed",
  "#2193b0",
  "#fe8c00",
  "#E9E4F0",
  "#203A43",
  "#FFFFFF",
];

const ModalHeading = ({ isAbout }) => {
  const fileInput = useRef();
  const [openHead, setOpenHead] = useState(false);
  const [isDark, setIsDark] = useState(isAbout ? isAbout.dark : false);
  const [isOverlay, setIsOverlay] = useState(isAbout ? isAbout.overlay : false);
  const [headers, setHeaders] = useState({
    title: isAbout ? isAbout.title : "",
    subtitle: isAbout ? isAbout.subtitle : "",
    paragraph: isAbout ? isAbout.paragraph : "",
  });
  const [isColor, setIsColor] = useState(isAbout ? isAbout.bgColor : "#FFFFFF");

  const {
    preview,
    selectedFile,
    onSelectedFile,
  } = useUploadFile();

  const [updateAboutUs, { loading }] = useMutation(UPDATE_ABOUT_HEADER, {
    variables: {
      ...headers,
      bgImg: selectedFile,
      bgColor: isColor,
      dark: isDark,
      overlay: isOverlay,
    },

    onCompleted() {
      setOpenHead(false);
      toaster.notify("Update Successful", {
        position: "bottom-right",
      });
    },
  });

  const handleInputClick = () => {
    fileInput.current.click();
  };

  const handleChangeHeaders = (e) => {
    setHeaders({ ...headers, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = (color) => {
    setIsColor(color.hex);
  };

  const handleDark = () => {
    setIsDark(!isDark);
  };

  const handleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const handleSaveHeader = () => {
    updateAboutUs();
  };

  return (
    <>
      <DButtonFree
        top={0}
        right={0}
        style={{ zIndex: 2 }}
        onClick={() => setOpenHead(true)}
      >
        <Icon name="edit" fitted />
      </DButtonFree>
      <Modal open={openHead} onClose={() => setOpenHead(false)} closeIcon>
        <Modal.Header>Update Header Content</Modal.Header>
        <DGrid custom="2fr 1fr" gap="20px">
          <Modal.Content style={{ padding: "10px" }}>
            <DSection width="100%" height="50vh" bgcolor={isColor}>
              <DImage dashed height="100%" width="100%">
                {selectedFile ? (
                  <img src={preview} alt="showcase" />
                ) : (
                  isAbout.bgImgURL && (
                    <img src={isAbout.bgImgURL} alt="About US" />
                  )
                )}
              </DImage>

              <Overlay bgc={isOverlay ? true : false}>
                <Content
                  flex
                  justify="center"
                  direct="column"
                  align="center"
                  width="50%"
                  margin="0 auto"
                  height="100%"
                  style={{ minWidth: "90%", textAlign: "center" }}
                  className={isDark ? "dark" : ""}
                >
                  <h1 style={{ fontSize: "22px" }}>
                    {headers.title ? headers.title : "TITLE"}
                  </h1>
                  <h4> {headers.subtitle ? headers.subtitle : "SUBTITLE"}</h4>
                </Content>
              </Overlay>
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
                  value={headers.title || ""}
                  onChange={handleChangeHeaders}
                />
              </Form.Field>
              <Form.Field>
                <label>Subtitle</label>
                <input
                  name="subtitle"
                  value={headers.subtitle || ""}
                  onChange={handleChangeHeaders}
                />
              </Form.Field>

              <Form.Field>
                <label>
                  Background-color{" "}
                  <Popup
                    content="This Background color is for fallback if background image is not set or unavailable"
                    trigger={
                      <Icon name="question circle outline" size="large" />
                    }
                  />
                </label>

                <BlockPicker
                  width="200px"
                  triangle="hide"
                  color={isColor}
                  colors={colors}
                  onChange={handleChangeComplete}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Text Contrast
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
                      value={isDark}
                      checked={isDark === true ? true : false}
                      onChange={handleDark}
                    />
                    <div className="state p-info">
                      <label>Light</label>
                    </div>
                  </div>
                </Content>
              </Form.Field>
              <Form.Field>
                <label>
                  Overlay
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
                      name="overlay"
                      value={isOverlay}
                      checked={isOverlay === true ? true : false}
                      onChange={handleOverlay}
                    />
                    <div className="state p-info">
                      <label>Off</label>
                    </div>
                  </div>
                </Content>
              </Form.Field>
            </Form>
          </Modal.Content>
        </DGrid>
        <Modal.Actions>
          <DButton confirm onClick={handleSaveHeader}>
            {loading ? <Spinner small inverted /> : "Update"}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const UPDATE_ABOUT_HEADER = gql`
  mutation updateAboutUs(
    $title: String
    $subtitle: String
    $paragraph: String
    $bgImg: Upload
    $bgColor: String
    $dark: Boolean
    $overlay: Boolean
  ) {
    updateAboutUs(
      inputAbout: {
        title: $title
        subtitle: $subtitle
        paragraph: $paragraph
        bgImg: $bgImg
        bgColor: $bgColor
        dark: $dark
        overlay: $overlay
      }
    ) {
      _id
      title
      subtitle
      bgImg
      bgImgURL
      bgColor
      dark
      overlay
    }
  }
`;

export default ModalHeading;
