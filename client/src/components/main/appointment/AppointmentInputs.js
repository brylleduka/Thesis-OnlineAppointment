import React from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  FETCH_ALL_CATEGORIES_QUERY,
  FETCH_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY
} from "../../../util/graphql/service";
import { Form } from "semantic-ui-react";
import { Content } from "../../styled/containers";

import Page404 from "../../../pages/Page404";

const AppointmentInputs = ({
  values,
  setValues,
  serviceValue,
  setServiceValue,
  employeeVal,
  setEmployeeVal
}) => {
  //CATEGORY
  const {
    loading: loading_categories,
    data: data_categories,
    error
  } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

  //SERVICE
  const [
    loadService,
    { called, loading: loading_services, data: data_services }
  ] = useLazyQuery(FETCH_SERVICES_QUERY, {
    variables: {
      categoryId: values.category
    }
  });

  //EMPLOYEE
  const [
    loadServiceEmp,
    {
      called: calledServiceEmp,
      loading: loading_serviceEmp,
      data: data_serviceEmp
    }
  ] = useLazyQuery(FETCH_SINGLE_SERVICE_QUERY, {
    variables: {
      serviceId: serviceValue
    }
  });

  //Handle Changes

  const handleChange = e => {
    e.preventDefault();
    setValues({ [e.target.name]: e.target.value });
    loadService();
  };

  const handleServiceChange = e => {
    e.preventDefault();
    setServiceValue(e.target.value);
    loadServiceEmp();
  };

  const handleEmployeeChange = e => {
    e.preventDefault();
    setEmployeeVal(e.target.value);
  };

  if (error) {
    return <Page404 />;
  }

  return (
    <Content
      height="80vh"
      width="100%"
      margin="20px 0"
      flex
      justify="center"
      align="center"
      pad="0"
      flow="nowrap column"
    >
      <h2>Appointment Details</h2>
      <Form style={{ width: "80%", padding: "1rem 0" }} size="large">
        <Form.Field>
          <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
            Categories
          </label>
          {loading_categories ? (
            <h4>Loading...</h4>
          ) : (
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="input-custom"
            >
              <option></option>
              {data_categories.categories &&
                data_categories.categories.map(category => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          )}
        </Form.Field>

        <Form.Field>
          <label style={{ textTransform: "uppercase" }}>Select a service</label>
          {called && loading_services ? (
            <h4>Loading...</h4>
          ) : (
            <select
              name="service"
              onChange={handleServiceChange}
              value={serviceValue}
              style={{
                width: "100%",
                height: "38px",
                padding: "0.5em",
                border: "1px solid rgba(34,36,38,.15)",
                cursor: "pointer",
                position: "relative",
                outline: "0",
                visibility: "visible",
                textAlign: "left"
              }}
            >
              <option></option>
              {data_services &&
                data_services.services.map(service => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
            </select>
          )}
        </Form.Field>

        <Form.Field>
          <label style={{ textTransform: "uppercase" }}>
            Select Aesthetician
          </label>
          {calledServiceEmp && loading_serviceEmp ? (
            <h4>Loading...</h4>
          ) : (
            <select
              name="employee"
              value={employeeVal}
              onChange={handleEmployeeChange}
              className="ui fluid dropdown"
            >
              <option></option>
              {data_serviceEmp &&
                data_serviceEmp.service.employees.map(servEmp => (
                  <option key={servEmp._id} value={servEmp._id}>
                    {servEmp.firstName}
                  </option>
                ))}
            </select>
          )}
        </Form.Field>
      </Form>
    </Content>
  );
};

export default AppointmentInputs;
