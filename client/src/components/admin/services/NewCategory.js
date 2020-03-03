import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";

import { Modal, Form } from "semantic-ui-react";
import { DButtonCancel, DButtonConfirm } from "../../styled/utils";
import JoditEditor from "jodit-react";
import toaster from "toasted-notes";

const NewCategory = ({ open, setOpen }) => {
  const editor = useRef(null);
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState("");

  const { values, handleChange, handleSubmit } = useForm(
    createCategoryCallback,
    {
      title: ""
    }
  );

  const [createCategory, { loading }] = useMutation(
    CREATE_NEW_CATEGORY_MUTATION,
    {
      variables: {
        title: values.title,
        description: content
      },

      update(cache, result) {
        setOpen(false);
        const data = cache.readQuery({
          query: FETCH_ALL_CATEGORIES_QUERY
        });

        const newCategory = result.data.createCategory;
        cache.writeQuery({
          query: FETCH_ALL_CATEGORIES_QUERY,
          data: { categories: [newCategory, ...data.categories] }
        });

        values.name = "";
        content = "";
      },
      onCompleted(result) {
        toaster.notify("New Category Add Successfully");
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
        toaster.notify("Something went Wrong");
      }
    }
  );

  function createCategoryCallback() {
    createCategory();
  }

  const config = {
    readonly: false
  };

  return (
    <Modal size={"tiny"} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Create new Category</Modal.Header>
      <Modal.Content>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <label>Description</label>

            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {}}
            />
          </Form.Field>
          <Modal.Actions>
            <DButtonCancel onClick={() => setOpen(false)}>No</DButtonCancel>
            <DButtonConfirm type="submit">Yes</DButtonConfirm>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
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
