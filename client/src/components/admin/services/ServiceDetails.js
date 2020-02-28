import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_SERVICES_QUERY } from "../../../util/graphql/service";
import { useForm } from "../../../util/hooks";
import { Form, Label } from "semantic-ui-react";
import JoditEditor from "jodit-react";
import {
  Toasted,
  DButtonConfirm,
  DButtonCancel,
  DLabel
} from "../../../components/styled/utils";
import toaster from "toasted-notes";
import {
  DGrid,
  DSection,
  Content
} from "../../../components/styled/containers";
import ServiceConfirmDelete from "./ServiceConfirmDelete";

const config = {
  readonly: false
};

const ServiceDetails = ({ service, serviceHistoryCallback }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState(service.description);

  const { values, handleChange, handleSubmit } = useForm(
    updateServiceCallback,
    {
      title: service.name,
      price: service.price
    }
  );

  const [updateService, { loading }] = useMutation(UPDATE_SERVICE_DETAILS, {
    variables: {
      serviceId: service._id,
      title: values.title,
      price: parseFloat(values.price),
      duration: parseInt(parseFloat(values.duration) * 60),
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
          <span className="description">Service Updated</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    }
  });

  function updateServiceCallback() {
    updateService();
  }

  return (
    <>
      <DSection pad="20px 0" height="100%">
        <DGrid two gap="10px">
          <Content width="100%">
            <Form noValidate>
              <Form.Field inline>
                <Label style={styles.label}>ID</Label>
                <input
                  value={service._id}
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
              <Form.Field inline>
                <Label style={styles.label}>Duration</Label>
                <DLabel>{service.duration} min</DLabel>
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
              <Form.Field inline>
                <Label style={styles.label}>Price</Label>
                <input
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
              </Form.Field>
            </Form>
          </Content>
          <Content width="100%">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {}}
            />
          </Content>
        </DGrid>
      </DSection>
      <Content width="100%" flex justify="flex-end">
        <DButtonConfirm onClick={handleSubmit}>Save</DButtonConfirm>
        <DButtonCancel onClick={() => setOpen(true)}>Delete</DButtonCancel>
      </Content>
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
    textAlign: "center"
  }
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
