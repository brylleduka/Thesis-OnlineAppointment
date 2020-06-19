import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { Form, Label, Grid } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { DButton, DLabel, IconWrap } from "../../../components/styled/utils";
import MenuDots from "../../../components/MenuDots";
import { Edit, Trash } from "@styled-icons/boxicons-solid";
import toaster from "toasted-notes";
import Toasted from "../../../components/Toasted";
import {
  DGrid,
  DSection,
  Content,
} from "../../../components/styled/containers";
import ServiceConfirmDelete from "./ServiceConfirmDelete";
import Spinner from "../../../components/Spinner";
import DTextArea from "../../../components/DTextArea";
import parser from "html-react-parser";

const ServiceDetails = ({
  service,
  serviceHistoryCallback,
  employeeAuthRole,
  employeeAuthLvl,
}) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [errors, setErrors] = useState({});
  const [content, setContent] = useState(service.description);

  const { values, handleChange, handleSubmit } = useForm(
    updateServiceCallback,
    {
      title: service && service.name,
      price: service && service.price,
      duration: service && service.duration,
    }
  );

  const [updateService, { loading }] = useMutation(UPDATE_SERVICE_DETAILS, {
    variables: {
      serviceId: service._id,
      title: values.title,
      price: parseFloat(values.price),
      duration: parseInt(values.duration),
      description: content,
    },

    onCompleted() {
      setIsEdit(false);
      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          Service Updated
        </Toasted>
      ));
    },
  });

  function updateServiceCallback() {
    updateService();
  }

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      <DSection pad="20px 0" height="100%">
        {(employeeAuthRole === "ADMIN" || employeeAuthLvl >= 3) && (
          <MenuDots topright medium>
            <Grid divided columns={2}>
              <Grid.Column>
                <DButton confirm onClick={handleEdit} flex>
                  <IconWrap mcenter>
                    <Edit size="22px" title="Update Content" />
                  </IconWrap>
                </DButton>
              </Grid.Column>
              <Grid.Column>
                <DButton alert flex onClick={() => setOpen(true)}>
                  <IconWrap mcenter>
                    <Trash size="22px" title="Archive or Permanently Delete" />
                  </IconWrap>
                </DButton>
              </Grid.Column>
            </Grid>
          </MenuDots>
        )}

        <DGrid gap="10px">
          <Content width="100%">
            <Form noValidate>
              <Form.Field inline>
                <Label style={styles.label}>Title</Label>
                {isEdit ? (
                  <input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                ) : (
                  <DLabel
                    flex
                    justifyEnd
                    alignCenter
                    weight={700}
                    w={"50%"}
                    size="22px"
                  >
                    {values.title}
                  </DLabel>
                )}
              </Form.Field>
              <Form.Field inline>
                <Label style={styles.label}>Duration</Label>
                {isEdit ? (
                  <select
                    name="duration"
                    value={values.duration}
                    onChange={handleChange}
                  >
                    {/* <option></option> */}
                    <option value="30">30 mins</option>
                    <option value="45">45 mins</option>
                    <option value="60">60 mins</option>
                    <option value="90">90 mins</option>
                    <option value="120">120 mins</option>
                    <option value="180">180 mins</option>
                    <option value="210">210 mins</option>
                  </select>
                ) : (
                  <DLabel
                    flex
                    justifyEnd
                    alignCenter
                    weight={700}
                    w={"50%"}
                    size="22px"
                  >
                    {values.duration} min
                  </DLabel>
                )}
              </Form.Field>
              <Form.Field inline>
                <Label style={styles.label}>Price</Label>
                {isEdit ? (
                  <input
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                ) : (
                  <DLabel
                    flex
                    justifyEnd
                    alignCenter
                    weight={700}
                    w={"50%"}
                    size="22px"
                  >
                    Php {values.price}
                  </DLabel>
                )}
              </Form.Field>
            </Form>
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
            <Label style={styles.label}>Description</Label>

            <Content
              width="90%"
              height="auto"
              flex
              justify="flex-start"
              align="center"
              pad="3px 15px"
              margin="0 auto"
            >
              <DTextArea border active={isEdit ? true : null}>
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
              <DTextArea border active={!isEdit ? true : null}>
                {parser(content)}
              </DTextArea>
            </Content>
          </Content>
          {isEdit && (
            <Content width="100%" flex justify="flex-end">
              <DButton confirm onClick={handleSubmit}>
                {loading ? (
                  <Spinner row small inverted content="Loading..." />
                ) : (
                  "Save"
                )}
              </DButton>
              <DButton alert onClick={() => setIsEdit(false)}>
                Cancel
              </DButton>
            </Content>
          )}
        </DGrid>
      </DSection>

      <ServiceConfirmDelete
        open={open}
        setOpen={setOpen}
        service={service}
        serviceHistoryCallback={serviceHistoryCallback}
      />
    </>
  );
};
const styles = {
  label: {
    width: "20%",
    textAlign: "center",
  },
};

export const UPDATE_SERVICE_DETAILS = gql`
  mutation updateService(
    $serviceId: ID!
    $title: String
    $price: Float
    $duration: Int
    $description: String
  ) {
    updateService(
      _id: $serviceId
      name: $title
      price: $price
      duration: $duration
      description: $description
    ) {
      _id
      name
      price
      duration
      description
    }
  }
`;

export default ServiceDetails;
