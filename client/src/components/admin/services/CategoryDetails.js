import React, { useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import toaster from "toasted-notes";
import JoditEditor from "jodit-react";
import { Form, Label } from "semantic-ui-react";
import { Content, DGrid } from "../../../components/styled/containers";
import {
  DButton,
  DButtonCancel,
  Toasted
} from "../../../components/styled/utils";
import Spinner from "../../../components/Spinner";
import CategoryDelete from "./CategoryDelete";

const config = {
  readonly: false
};

const CategoryDetails = ({ category, historyCallback }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState(category.description);

  const { values, handleChange, handleSubmit } = useForm(
    updateCategoryCallback,
    {
      title: category.name
    }
  );

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY_DETAILS, {
    variables: {
      categoryId: category._id,
      title: values.title,
      description: content
    },
    update(data) {
      console.log(data);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(data) {
      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">Category Updated</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    }
  });

  function updateCategoryCallback() {
    updateCategory();
  }

  return (
    <>
      <Form noValidate>
        <DGrid>
          <Content width="100%" margin="20px 0">
            <Form.Field inline>
              <Label style={styles.label}>ID</Label>
              <input
                value={category._id}
                style={{ width: "60%", cursor: "default" }}
                readOnly
              />
            </Form.Field>
            <Form.Field inline>
              <Label style={styles.label}>Title</Label>
              <input
                name="title"
                value={values.title}
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </Form.Field>
          </Content>
          <Content width="100%" height="100%">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {}}
            />
          </Content>
          <Content flex width="100%">
            <DButton fluid type="submit" onClick={handleSubmit}>
              {loading ? <Spinner small inverted /> : "Save"}
            </DButton>
            <DButtonCancel width="30%" onClick={() => setOpen(true)}>
              Delete
            </DButtonCancel>
          </Content>
        </DGrid>
      </Form>
      <CategoryDelete
        open={open}
        setOpen={setOpen}
        category={category}
        historyCallback={historyCallback}
      />
    </>
  );
};

const styles = {
  label: {
    width: "20%",
    textAlign: "center"
  }
};

const UPDATE_CATEGORY_DETAILS = gql`
  mutation updateCategory(
    $categoryId: ID!
    $title: String
    $description: String
  ) {
    updateCategory(_id: $categoryId, name: $title, description: $description) {
      _id
      name
      description
    }
  }
`;

export default CategoryDetails;
