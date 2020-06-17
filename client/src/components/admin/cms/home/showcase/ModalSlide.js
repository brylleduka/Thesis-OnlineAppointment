import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../../../util/graphql/cms";
import { Modal, Icon, Form, TextArea, Popup } from "semantic-ui-react";
import { BlockPicker } from "react-color";
import { DButton } from "../../../../styled/utils";
import { DGrid, Content } from "../../../../styled/containers";
import Spinner from "../../../../Spinner";
import useUploadFile from "../../../../../util/hooks/useUploadFile";
import ImageSection from "./ImageSection";
import toaster from "toasted-notes";
import "./modal.custom.css";

const colors = [
  "#6dd5ed",
  "#2193b0",
  "#fe8c00",
  "#E9E4F0",
  "#203A43",
  "#FFFFFF",
];

const ModalSlide = ({ open, setOpen, showcase }) => {
  const [isDark, setIsDark] = useState(showcase ? showcase.dark : false);
  const [isPosition, setIsPosition] = useState(
    showcase ? showcase.position : "left"
  );

  const [isColor, setIsColor] = useState(
    showcase ? showcase.bgColor : "#FFFFFF"
  );
  const [values, setValues] = useState({
    title: showcase ? showcase.title : "",
    subtitle: showcase ? showcase.subtitle : "",
    paragraph: showcase ? showcase.paragraph : "",
  });

  const {
    preview,
    selectedFile,
    setSelectedFile,
    onSelectedFile,
  } = useUploadFile();

  // ADD OR UPDATE
  const mutation = showcase ? UPDATE_SLIDE : ADD_NEW_SLIDE;

  const [addOrUpdateSlide, { loading }] = useMutation(mutation, {
    variables: {
      showcaseId: showcase && showcase._id,
      ...values,
      bgImg: selectedFile,
      bgColor: isColor,
      position: isPosition,
      dark: isDark,
    },
    refetchQueries: [
      { query: FETCH_THE_SHOWCASE, variables: { sectionName: "SHOWCASE" } },
    ],
    update() {
      if (!showcase) {
        values.title = "";
        values.subtitle = "";
        values.paragraph = "";
      }
    },
    onCompleted() {
      setOpen(false);
      setIsDark(false);
      setIsPosition("left");
      setSelectedFile();
      setIsColor("#E9E4F0");
      if (showcase) {
        toaster.notify("Update Slide Successfully");
      } else {
        toaster.notify("Add New Slide Successfully");
      }
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = (color) => {
    setIsColor(color.hex);
  };

  const handleDark = () => {
    setIsDark(!isDark);
  };

  const handlePosition = (event) => {
    setIsPosition(event.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addOrUpdateSlide();
  };

  return (
    <Modal size={"large"} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Add New Slide </Modal.Header>
      <DGrid custom="2fr 1fr" gap="10px">
        <Modal.Content style={{ padding: "10px" }}>
          <ImageSection
            isPosition={isPosition}
            isDark={isDark}
            isColor={isColor}
            preview={preview}
            selectedFile={selectedFile}
            onSelectedFile={onSelectedFile}
            values={values}
            bgImg={showcase && showcase.bgImg}
            bgImgURL={showcase && showcase.bgImgURL}
          />
        </Modal.Content>
        <Modal.Content scrolling>
          <Content pad="10px" width="100%" height="100%">
            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  name="title"
                  value={values.title || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Subtitle</label>
                <input
                  name="subtitle"
                  value={values.subtitle || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Paragraph</label>
                <TextArea
                  maxLength="150"
                  style={{ minHeight: 100 }}
                  name="paragraph"
                  value={values.paragraph || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Text Positioning</label>
                <Content
                  flex
                  justify="space-around"
                  align="center"
                  margin="0 auto"
                  width="80%"
                  height="10vh"
                >
                  <div className="pretty p-default  p-curve p-pulse">
                    <input
                      type="radio"
                      name="switch1"
                      value="left"
                      checked={isPosition === "left" ? true : false}
                      onChange={handlePosition}
                    />
                    <div className="state  p-info-o">
                      <label>Left</label>
                    </div>
                  </div>
                  <div className="pretty p-default  p-curve p-pulse">
                    <input
                      type="radio"
                      name="switch1"
                      value="center"
                      checked={isPosition === "center" ? true : false}
                      onChange={handlePosition}
                    />
                    <div className="state  p-info-o">
                      <label>Center</label>
                    </div>
                  </div>
                  <div className="pretty p-default p-curve p-pulse">
                    <input
                      type="radio"
                      name="switch1"
                      value="right"
                      checked={isPosition === "right" ? true : false}
                      onChange={handlePosition}
                    />
                    <div className="state  p-info-o">
                      <label>Right</label>
                    </div>
                  </div>
                </Content>
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
                  Overlay{" "}
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
                      <label>Dark</label>
                    </div>
                  </div>
                </Content>
              </Form.Field>
            </Form>
          </Content>
        </Modal.Content>
      </DGrid>
      <Modal.Actions>
        <DButton type="submit" confirm onClick={handleSave}>
          {loading ? <Spinner small inverted /> : "Save"}
        </DButton>
        <DButton alert>Cancel</DButton>
      </Modal.Actions>
    </Modal>
  );
};

const ADD_NEW_SLIDE = gql`
  mutation addNewShowCase(
    $title: String
    $subtitle: String
    $paragraph: String
    $bgImg: Upload
    $bgColor: String
    $position: String
    $dark: Boolean
  ) {
    addNewShowCase(
      inputShowcaseContent: {
        title: $title
        subtitle: $subtitle
        paragraph: $paragraph
        bgImg: $bgImg
        bgColor: $bgColor
        position: $position
        dark: $dark
      }
    ) {
      _id
      content {
        _id
        title
        subtitle
        paragraph
        bgImg
        bgImgURL
        bgColor
        position
        dark
      }
    }
  }
`;

const UPDATE_SLIDE = gql`
  mutation updateShowcase(
    $showcaseId: ID!
    $title: String
    $subtitle: String
    $paragraph: String
    $bgImg: Upload
    $bgColor: String
    $position: String
    $dark: Boolean
  ) {
    updateShowcase(
      showcaseId: $showcaseId
      inputShowcaseContent: {
        title: $title
        subtitle: $subtitle
        paragraph: $paragraph
        bgImg: $bgImg
        bgColor: $bgColor
        position: $position
        dark: $dark
      }
    ) {
      _id
      content {
        _id
        title
        subtitle
        paragraph
        bgImg
        bgImgURL
        bgColor
        position
        dark
      }
    }
  }
`;

export default ModalSlide;
