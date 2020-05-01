import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Form, Label } from "semantic-ui-react";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { useForm } from "../../../util/hooks/useForm";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import DTextArea from "../../DTextArea";
import toaster from "toasted-notes";

import { DButton } from "../../styled/utils";
import { Content } from "../../styled/containers";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";

const NewService = ({ categoryId, open, setOpen }) => {
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState("");

  const { handleChange, handleSubmit, values, setValues } = useForm(
    registerCallBack,
    {
      name: "",
      price: "",
      duration: "",
    }
  );

  const [createService, { loading }] = useMutation(CREATE_NEW_SERVICE, {
    refetchQueries: [
      {
        query: FETCH_SERVICES_QUERY,
        variables: { categoryId: categoryId, active: true },
      },
    ],

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);

      if (err.graphQLErrors[0].extensions.errors.serviceExist) {
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Service already Exist
          </Toasted>
        ));
      }
    },
    onCompleted() {
      setOpen(false);
      setValues({ name: "", price: "", duration: "" });
      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          New Service Added Successfully
        </Toasted>
      ));
    },
    variables: {
      ...values,
      description: content,
      price: parseFloat(values.price),
      duration: parseInt(parseFloat(values.duration) * 60),
      categoryId,
    },
  });

  function registerCallBack() {
    createService();
  }

  return (
    <Modal size={"tiny"} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Create new Service</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Field>
            <label>Title</label>
            {/* {errors.name ? (
              <Label basic color="red">
                {errors.name}
              </Label>
            ) : (
              ""
            )} */}
            <Form.Input
              name="name"
              value={values.name}
              placeholder="Title"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            {/* {errors.numOnly && (
              <Label basic color="red">
                {errors.numOnly}
              </Label>
            )} */}
            <Form.Input
              name="price"
              value={values.price}
              placeholder="Price"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Duration</label>

            <select
              name="duration"
              value={values.duration}
              onChange={handleChange}
              className="ui dropdown"
            >
              <option></option>
              <option value="0.5">30 mins</option>
              <option value="0.75">45 mins</option>
              <option value="1">60 mins</option>
              <option value="1.5">90 mins</option>
              <option value="2">120 mins</option>
              <option value="2.5">180 mins</option>
              <option value="3">210 mins</option>
            </select>
          </Form.Field>
          <Form.Field>
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
                width="100%"
                height="auto"
                flex
                justify="flex-start"
                align="center"
                pad="3px 5px"
                margin="0 auto"
              >
                <DTextArea border active>
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
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton alert onClick={() => setOpen(false)}>
          No
        </DButton>
        <DButton confirm type="submit" onClick={handleSubmit}>
          {loading ? (
            <Spinner small inverted row content="Loading..." />
          ) : (
            "Yes"
          )}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const styles = {
  label: {
    width: "auto",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "14px",
    marginBottom: "1rem",
  },
};

const CREATE_NEW_SERVICE = gql`
  mutation createService(
    $name: String
    $price: Float
    $duration: Int
    $description: String
    $categoryId: ID
  ) {
    createService(
      serviceInput: {
        name: $name
        price: $price
        duration: $duration
        description: $description
        categoryId: $categoryId
      }
    ) {
      _id
      name
      duration
      price
      description
      photo

      category {
        _id
        name
        description
      }
    }
  }
`;

export default NewService;
