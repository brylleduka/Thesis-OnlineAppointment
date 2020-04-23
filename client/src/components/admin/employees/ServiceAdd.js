import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { Form, Modal } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
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
      serviceId: services,
    },
    refetchQueries: [{ query: FETCH_ALL_CATEGORIES_QUERY }],

    // update(cache, result) {
    //   setOpen(false);
    //   const data = cache.readQuery({
    //     query:
    //       (FETCH_THE_ADD_SERVICE, { variables: { employeeId: employeeId } }),
    //   });

    //   const newEmployee = result.data.addService;
    //   cache.writeQuery({
    //     query:
    //       (FETCH_THE_ADD_SERVICE, { variables: { employeeId: employeeId } }),
    //     data: { employee: [newEmployee, ...data.employee] },
    //   });
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted() {
      toaster.notify("Success");
    },
  });

  const handleAddService = () => {
    addService();
  };

  return (
    <Modal size="small" open={open}>
      <Modal.Header>Choose Services</Modal.Header>
      <Modal.Content>
        {loadingCategory ? (
          <h3>Loading...</h3>
        ) : (
          <DGrid two gap="10px">
            <CheckboxGroup
              name="services"
              value={services}
              onChange={setServices}
            >
              {(Checkbox) => (
                <DGrid two gap="5px">
                  {categories.map((category) => (
                    <div
                      className="pretty p-default p-curve p-thick p-smooth"
                      key={category._id}
                    >
                      <Checkbox value={category._id} key={category._id} />
                      <div className="state p-info-o">
                        <label>{category.name}</label>
                      </div>
                    </div>
                  ))}
                </DGrid>
              )}
            </CheckboxGroup>
          </DGrid>
        )}
      </Modal.Content>
      <Modal.Actions>
        <DButton confirm type="submit" onClick={handleAddService}>
          {loading ? <Spinner small inverted /> : "Add"}
        </DButton>
        <DButton alert onClick={() => setOpen(false)}>
          Exit
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const ADD_SERVICES_MUTATION = gql`
  mutation addService($employeeId: ID!, $categoryId: [ID]) {
    addService(employeeId: $employeeId, categoryId: $categoryId) {
      _id
      categoryServices {
        _id
        name
      }
    }
  }
`;

// const FETCH_THE_ADD_SERVICE = gql`
//   query employee($employeeId: ID!) {
//     employee(_id: $employeeId) {
//       _id
//       services {
//         _id
//         name
//       }
//     }
//   }
// `;

export default ServiceAdd;
