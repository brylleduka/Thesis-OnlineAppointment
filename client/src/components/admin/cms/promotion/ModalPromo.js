import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_PROMOTIONS } from "../../../../util/graphql/promotion";
import { Modal, Icon, Form, Popup } from "semantic-ui-react";
import { BlockPicker } from "react-color";
import { DButton } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import Spinner from "../../../Spinner";
import useUploadFile from "../../../../util/hooks/useUploadFile";
import ImageSection from "./ImageSection";
import toaster from "toasted-notes";

const ModalPromo = ({ newPromoOpen, setNewPromoOpen }) => {
  const [isColor, setIsColor] = useState("#FFFFFF");
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const {
    preview,
    selectedFile,
    setSelectedFile,
    onSelectedFile,
  } = useUploadFile();

  const [createPromo, { loading: loadNewPromo }] = useMutation(NEW_PROMOTION, {
    variables: {
      ...values,
      photo: selectedFile,
      bgColor: isColor,
    },
    refetchQueries: [{ query: FETCH_PROMOTIONS }],
    onCompleted() {
      setNewPromoOpen(false);

      setSelectedFile();
      setIsColor("#E9E4F0");

      toaster.notify("Add New Slide Successfully");
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = (color) => {
    setIsColor(color.hex);
  };

  const handleCreatePromo = (e) => {
    e.preventDefault();
    createPromo();
  };

  return (
    <Modal
      size={"large"}
      open={newPromoOpen}
      onClose={() => setNewPromoOpen(false)}
    >
      <Modal.Header>Add New Slide </Modal.Header>
      <DGrid custom="2fr 1fr" gap="10px">
        <Modal.Content style={{ padding: "10px" }}>
          <ImageSection
            isColor={isColor}
            preview={preview}
            selectedFile={selectedFile}
            onSelectedFile={onSelectedFile}
            values={values}
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
                <label>Content</label>
                <input
                  name="description"
                  value={values.description || ""}
                  onChange={handleChange}
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
            </Form>
          </Content>
        </Modal.Content>
      </DGrid>
      <Modal.Actions>
        <DButton type="submit" confirm onClick={handleCreatePromo}>
          {loadNewPromo ? (
            <Spinner small row inverted content="Saving..." />
          ) : (
            "Save"
          )}
        </DButton>
        <DButton alert onClick={() => setNewPromoOpen(false)}>
          Close
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const NEW_PROMOTION = gql`
  mutation createPromotion(
    $title: String
    $subtitle: String
    $description: String
    $photo: Upload
    $bgColor: String
  ) {
    createPromotion(
      title: $title
      subtitle: $subtitle
      description: $description
      photo: $photo
      bgColor: $bgColor
    ) {
      _id
      title
      subtitle
      description
      photo
      imageURL
      bgColor
    }
  }
`;

const colors = [
  "#6dd5ed",
  "#2193b0",
  "#fe8c00",
  "#E9E4F0",
  "#203A43",
  "#FFFFFF",
];

export default ModalPromo;
