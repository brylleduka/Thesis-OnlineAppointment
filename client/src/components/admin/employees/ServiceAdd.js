import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { Form, Modal } from "semantic-ui-react";
import { DButtonConfirm, DButtonCancel } from "../../styled/utils";
import CheckboxGroup from "react-checkbox-group";
import toaster from "toasted-notes";
import { DGrid } from "../../styled/containers";
import Spinner from "../../Spinner";

const ServiceAdd = ({ open, setOpen, employeeId }) => {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const { data: dataCategory, loading: loadingCategory } = useQuery(
    FETCH_ALL_CATEGORIES_QUERY
  );

  useEffect(() => {
    if (dataCategory) {
      setCategories(dataCategory.categories);
    }
  }, [dataCategory]);

  const [addService, { loading }] = useMutation(ADD_SERVICES_MUTATION, {
    variables: {
      employeeId: employeeId,
      serviceId: services
    },

    update(cache, result) {
      setOpen(false);
      const data = cache.readQuery({
        query:
          (FETCH_THE_ADD_SERVICE, { variables: { employeeId: employeeId } })
      });

      const newEmployee = result.data.addService;
      cache.writeQuery({
        query:
          (FETCH_THE_ADD_SERVICE, { variables: { employeeId: employeeId } }),
        data: { employee: [newEmployee, ...data.employee] }
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(result) {
      toaster.notify("Success");
    }
  });

  const handleAddService = () => {
    addService();
  };

  console.log(errors);

  return (
    <Modal size="small" open={open}>
      <Modal.Header>Choose Services</Modal.Header>
      <Modal.Content>
        {loadingCategory ? (
          <h3>Loading...</h3>
        ) : (
          <Form>
            <DGrid two gap="10px">
              {categories.map(category => (
                <Form.Group
                  style={{ display: "flex", flexDirection: "column" }}
                  key={category._id}
                >
                  <h4>{category.name}</h4>
                  <CheckboxGroup
                    name="services"
                    value={services}
                    onChange={setServices}
                  >
                    {Checkbox => (
                      <DGrid two gap="5px">
                        {category.services.map(service => (
                          <div className="pretty p-default p-curve p-thick p-smooth">
                            <Checkbox value={service._id} key={service._id} />
                            <div className="state p-info-o">
                              <label>{service.name}</label>
                            </div>
                          </div>
                        ))}
                      </DGrid>
                    )}
                  </CheckboxGroup>
                </Form.Group>
              ))}
            </DGrid>
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        <DButtonConfirm type="submit" onClick={handleAddService}>
          {loading ? <Spinner small inverted /> : "Add"}
        </DButtonConfirm>
        <DButtonCancel onClick={() => setOpen(false)}>Exit</DButtonCancel>
      </Modal.Actions>
    </Modal>
  );
};

const ADD_SERVICES_MUTATION = gql`
  mutation addService($employeeId: ID!, $serviceId: [ID]) {
    addService(employeeId: $employeeId, serviceId: $serviceId) {
      _id
      services {
        _id
        name
      }
    }
  }
`;

const FETCH_THE_ADD_SERVICE = gql`
  query employee($employeeId: ID!) {
    employee(_id: $employeeId) {
      _id
      services {
        _id
        name
      }
    }
  }
`;

export default ServiceAdd;
