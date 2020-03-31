import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Form } from "semantic-ui-react";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { useForm } from "../../../util/hooks/useForm";
import JoditEditor from "jodit-react";
import toaster from "toasted-notes";
import { DButton, Toasted } from "../../styled/utils";
import Spinner from "../../Spinner";

const config = {
  readonly: false
};

const NewService = ({ categoryId, open, setOpen }) => {
  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { handleChange, handleSubmit, values } = useForm(registerCallBack, {
    name: "",
    price: "",
    duration: ""
  });

  const [createService, { loading }] = useMutation(CREATE_NEW_SERVICE, {
    // refetchQueries: [
    //   { query: FETCH_SERVICES_QUERY, variables: { categoryId: categoryId } }
    // ],
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_SERVICES_QUERY,
        variables: { categoryId: categoryId }
      });
      const newService = result.data.createService;
      cache.writeQuery({
        query: FETCH_SERVICES_QUERY,
        variables: { categoryId: categoryId },
        data: { services: [newService, ...data.services] }
      });

      values.name = "";
      values.price = "";
      values.duration = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);

      if (err.graphQLErrors[0].extensions.errors.serviceExist) {
        toaster.notify(({ onClose }) => (
          <Toasted status={"error"}>
            <span className="description">Service already Exist</span>
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </Toasted>
        ));
      }
    },
    onCompleted() {
      setOpen(false);

      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">New Service Added Successfully</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    },
    variables: {
      ...values,
      description: content,
      price: parseFloat(values.price),
      duration: parseInt(parseFloat(values.duration) * 60),
      categoryId
    }
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton alert onClick={() => setOpen(false)}>No</DButton>
        <DButton confirm type="submit" onClick={handleSubmit}>
          {loading ? <Spinner small inverted /> : "Yes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
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
      employees {
        _id
        empId
        firstName
        lastName
      }
      category {
        _id
        name
        description
      }
    }
  }
`;

export default NewService;
