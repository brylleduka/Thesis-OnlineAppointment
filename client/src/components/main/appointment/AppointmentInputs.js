import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  FETCH_ALL_CATEGORIES_QUERY,
  FETCH_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
  FETCH_CATEGORY_QUERY,
} from "../../../util/graphql/service";
import { Form } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import Spinner from "../../Spinner";
import Page404 from "../../../pages/Page404";

const AppointmentInputs = ({
  categoryValue,
  setCategoryValue,
  serviceValue,
  setServiceValue,
  employeeVal,
  setEmployeeVal,
}) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  //CATEGORY
  const {
    loading: loading_categories,
    data: data_categories,
    error,
  } = useQuery(FETCH_ALL_CATEGORIES_QUERY, { variables: { active: true } });

  useEffect(() => {
    if (data_categories) {
      setCategories(data_categories.categories);
    }
  }, [data_categories]);

  //SERVICE
  const [
    loadService,
    { called, loading: loading_services, data: data_services },
  ] = useLazyQuery(FETCH_SERVICES_QUERY, {
    variables: {
      categoryId: categoryValue,
    },
  });

  useEffect(() => {
    if (data_services) {
      setServices(data_services.services);
    }
  }, [data_services]);

  //EMPLOYEE
  const [
    loadServiceEmp,
    {
      called: calledServiceEmp,
      loading: loading_serviceEmp,
      data: data_serviceEmp,
    },
  ] = useLazyQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId: categoryValue,
    },
  });

  useEffect(() => {
    if (data_serviceEmp) {
      setEmployees(data_serviceEmp.category.employees);
    }
  }, [data_serviceEmp]);

  //Handle Changes

  const handleChange = (e) => {
    e.preventDefault();
    setCategoryValue(e.target.value);
    loadService();
  };

  const handleServiceChange = (e) => {
    e.preventDefault();
    setServiceValue(e.target.value);
    loadServiceEmp();
  };

  const handleEmployeeChange = (e) => {
    e.preventDefault();
    setEmployeeVal(e.target.value);
  };

  if (error) {
    return <Page404 />;
  }

  return (
    <Content
      height="100%"
      width="100%"
      margin="20px 0"
      flex
      justify="flex-start"
      align="center"
      pad="0"
      flow="nowrap column"
    >
      <h3>Appointment Details</h3>
      <Form style={{ width: "80%", padding: "1rem 0" }} size="large">
        <Form.Field>
          <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
            Categories
          </label>
          {loading_categories ? (
            <Spinner row content="Loading..." small />
          ) : (
            <select
              name="category"
              value={categoryValue}
              onChange={handleChange}
              className="input-custom"
            >
              <option value="" disabled>
                Select Categories...
              </option>
              {categories &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          )}
        </Form.Field>

        {called && (
          <Form.Field>
            <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
              Select a service
            </label>
            {loading_services ? (
              <Spinner row content="Loading..." small />
            ) : (
              <select
                placeholder="Services..."
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
                  textAlign: "left",
                }}
                className="input-custom"
              >
                <option value="" disabled>
                  Select Services...
                </option>
                {services &&
                  services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
              </select>
            )}
          </Form.Field>
        )}

        {calledServiceEmp && (
          <Form.Field>
            <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
              Select Aesthetician
            </label>
            {loading_serviceEmp ? (
              <Spinner row content="Loading..." small />
            ) : (
              <select
                name="employee"
                value={employeeVal}
                onChange={handleEmployeeChange}
                className="input-custom"
              >
                <option value="" disabled>
                  Select Aesthetician...
                </option>
                {employees &&
                  employees.map((servEmp) => (
                    <option key={servEmp._id} value={servEmp._id}>
                      {servEmp.firstName}
                    </option>
                  ))}
              </select>
            )}
          </Form.Field>
        )}
      </Form>
    </Content>
  );
};

export default AppointmentInputs;
