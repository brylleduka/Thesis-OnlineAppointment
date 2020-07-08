import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  FETCH_ALL_CATEGORIES_QUERY,
  FETCH_SERVICES_QUERY,
  FETCH_CATEGORY_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
} from "../../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../../util/graphql/employee";
import { Form } from "semantic-ui-react";
import { Content } from "../../../styled/containers";
import Spinner from "../../../Spinner";
import Page404 from "../../../../pages/Page404";
import useWindowSize from "../../../../util/hooks/useWindowSize";

const AppointmentSelection = ({
  categoryValue,
  setCategoryValue,
  serviceValue,
  setServiceValue,
  employeeVal,
  setEmployeeVal,
}) => {
  const { width: wid } = useWindowSize();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isService, setIsService] = useState({});
  const [aesthetician, setAesthetician] = useState({});

  //CATEGORY
  const {
    loading: loading_categories,
    data: data_categories,
    error,
  } = useQuery(FETCH_ALL_CATEGORIES_QUERY, { variables: { active: true } });

  //SERVICE QUERIES
  const [
    loadService,
    { called, loading: loading_services, data: data_services },
  ] = useLazyQuery(FETCH_SERVICES_QUERY, {
    variables: {
      categoryId: categoryValue,
      active: true,
    },
  });

  const { data: data_getServices } = useQuery(FETCH_SERVICES_QUERY, {
    variables: {
      categoryId: categoryValue,
      active: true,
    },
  });

  // SINGLE SERVICE QUERY
  const { data: data_service } = useQuery(FETCH_SINGLE_SERVICE_QUERY, {
    variables: {
      serviceId: serviceValue && serviceValue,
      active: true,
    },
  });
  // END SERVICE QUERIES

  //EMPLOYEE QUERIES
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
      active: true,
    },
  });
  // GET AESTHETICIAN
  const { data: data_getAesthetician } = useQuery(FETCH_EMPLOYEE_QUERY, {
    variables: {
      employeeId: employeeVal,
    },
  });

  const { data: data_aestheticians } = useQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId: categoryValue,
      active: true,
    },
  });

  // END EMPLOYEE QUERIES

  useEffect(() => {
    if (data_categories) {
      setCategories(data_categories.categories);
    }
    if (data_services) {
      setServices(data_services.services);
    }
    if (data_serviceEmp) {
      setEmployees(data_serviceEmp.category.employees);
    }

    if (data_service) {
      setIsService(data_service.service);
    }

    if (data_getAesthetician) {
      setAesthetician(data_getAesthetician.employee);
    }
  }, [
    data_categories,
    data_services,
    data_serviceEmp,
    data_service,
    data_getAesthetician,
  ]);

  //Handle Changes

  const handleChange = (e) => {
    e.preventDefault();
    setCategoryValue(e.target.value);
    if (categoryValue !== "CHECK_UP") loadService();
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
      justify={wid <= 1024 ? "center" : "flex-start"}
      align={wid <= 1024 ? "center" : "flex-start"}
      pad="0"
      flow="nowrap column"
    >
      <Form style={{ width: "80%", padding: "1rem 0" }} size="large">
        <Form.Field>
          <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
            Service Category
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
                Service Category...
              </option>
              {/* <option value="CHECK_UP">Check up</option> */}
              {categories &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          )}
        </Form.Field>

        {called && categoryValue !== "CHECK_UP" ? (
          loading_services ? (
            <Spinner row content="Loading..." small />
          ) : (
            <Form.Field>
              <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
                Services
              </label>
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
                  Services...
                </option>
                {services &&
                  services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
              </select>
            </Form.Field>
          )
        ) : (
          categoryValue !== "" && (
            <Form.Field>
              <label style={{ textTransform: "uppercase", fontWeight: 700 }}>
                Services
              </label>
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
                <option value={serviceValue} disabled>
                  {isService.name}
                </option>
                {data_getServices &&
                  data_getServices.services.map((getService) => (
                    <option key={getService._id} value={getService._id}>
                      {getService.name}
                    </option>
                  ))}
              </select>
            </Form.Field>
          )
        )}

        {calledServiceEmp && categoryValue !== "CHECK_UP" ? (
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
                  employees.map(
                    (servEmp) =>
                      servEmp.role === "AESTHETICIAN" &&
                      servEmp.active && (
                        <option key={servEmp._id} value={servEmp._id}>
                          {servEmp.title} {servEmp.firstName} {servEmp.lastName}
                        </option>
                      )
                  )}
              </select>
            )}
          </Form.Field>
        ) : (
          serviceValue !== "" && (
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
                  {data_aestheticians &&
                    data_aestheticians.category.employees.map(
                      (aesthetic) =>
                        aesthetic.role === "AESTHETICIAN" &&
                        aesthetic.active && (
                          <option key={aesthetic._id} value={aesthetic._id}>
                            {aesthetic.title} {aesthetic.firstName}{" "}
                            {aesthetic.lastName}
                          </option>
                        )
                    )}
                </select>
              )}
            </Form.Field>
          )
        )}
      </Form>
    </Content>
  );
};

export default AppointmentSelection;