import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";

import { Modal, Form, Label } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import { DButton } from "../../styled/utils";
import { Content } from "../../styled/containers";
import DTextArea from "../../DTextArea";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import Spinner from "../../Spinner";
import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";

const NewCategory = ({ open, setOpen }) => {
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState("");

  const [values, setValues] = useState({ title: "" });

  const [createCategory, { loading }] = useMutation(
    CREATE_NEW_CATEGORY_MUTATION,
    {
      variables: {
        title: values.title,
        description: content,
      },

      update(cache, result) {
        setOpen(false);
        const data = cache.readQuery({
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: true },
        });

        const newCategory = result.data.createCategory;
        cache.writeQuery({
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: true },
          data: { categories: [newCategory, ...data.categories] },
        });
      },
      // refetchQueries: [
      //   { query: FETCH_ALL_CATEGORIES_QUERY, variables: { active: true } },
      // ],
      onCompleted() {
        setOpen(false);
        setContent("");
        setValues({ title: "" });
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            New Category Add Successfully
          </Toasted>
        ));
      },
      // onError(err) {
      //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
      //   toaster.notify("Something went Wrong");
      // },
    }
  );

  const handleTitleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSaveCategory = () => {
    createCategory();
  };

  const config = {
    readonly: false,
  };

  return (
    <Modal size={"tiny"} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Create new Category</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="title"
              name="title"
              value={values.title}
              onChange={handleTitleChange}
            />
          </Form.Field>

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
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Content
          width="100%"
          height="100%"
          flex
          justify="flex-end"
          align="center"
        >
          <DButton alert flex onClick={() => setOpen(false)}>
            <Cancel size="22px" />
            No
          </DButton>
          <DButton confirm flex onClick={handleSaveCategory}>
            {loading ? (
              <Spinner inverted small content="Loading..." />
            ) : (
              <>
                <Check size="22px" />
                Yes
              </>
            )}
          </DButton>
        </Content>
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

const CREATE_NEW_CATEGORY_MUTATION = gql`
  mutation createCategory($title: String!, $description: String) {
    createCategory(categoryInput: { name: $title, description: $description }) {
      _id
      name
      description
      photo
      services {
        _id
        name
        price
        duration
        description
        photo
      }
    }
  }
`;

export default NewCategory;
