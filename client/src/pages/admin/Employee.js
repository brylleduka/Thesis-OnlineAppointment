import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { FETCH_EMPLOYEE_QUERY } from "../../util/graphql/employee";
import { Breadcrumb } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import { DGrid, DSection, Content } from "../../components/styled/containers";

import Spinner from "../../components/Spinner";
import useWindowSize from "../../util/hooks/useWindowSize";
import PhotoBooth from "../../components/admin/employees/PhotoBooth";
import Info from "../../components/admin/employees/Info";
import EmployeeDelete from "../../components/admin/employees/EmployeeDelete";

const Employee = (props) => {
  const { employeeAuth } = useContext(AuthContext);
  const employeeId = props.match.params._id;
  const { width: wid } = useWindowSize();
  const [employee, setEmployee] = useState({});

  //Storing switch key to localstorage
  const stored = localStorage.getItem("empInfo");
  const [isEmpInfo, setIsEmpInfo] = useState(
    stored === "emp_details"
      ? "emp_details"
      : stored === "emp_sched"
      ? "emp_sched"
      : "emp_details"
  );

  const { data: employeeData, loading: employeeLoading } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId,
      },
    }
  );

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData.employee);
    }
  }, [employeeData]);

  const handleDetails = () => {
    setIsEmpInfo("emp_details");
    localStorage.setItem("empInfo", "emp_details");
  };
  const handleSchedule = () => {
    setIsEmpInfo("emp_sched");
    localStorage.setItem("empInfo", "emp_sched");
  };

  return (
    <Layout>
      <DSection
        width="90%"
        height="100%"
        mcenter
        flex
        justify="space-around"
        align="center"
        direct="column"
        minh="90vh"
      >
        {employeeLoading ? (
          <Spinner content="Please wait while we fetch our data..." />
        ) : (
          <>
            <Content
              flex
              justify="space-between"
              align="center"
              width="100%"
              margin="24px auto"
            >
              <Breadcrumb size={"huge"}>
                <Breadcrumb.Section as={Link} to="/zeadmin/employees">
                  Employee
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section
                  active
                >{`${employee.firstName} ${employee.lastName}'s Info`}</Breadcrumb.Section>
              </Breadcrumb>
            </Content>
            <Content width="100%" height="100%" margin="24px auto">
              <DGrid
                custom="1fr 3fr"
                med10="2fr 4fr"
                med7="2fr 4fr"
                gap={wid < 768 ? "10px" : "20px"}
              >
                <PhotoBooth
                  employee={employee}
                  employeeId={employeeId}
                  handleDetails={handleDetails}
                  handleSchedule={handleSchedule}
                />

                <Content
                  flex
                  direct="column"
                  width="100%"
                  height="100%"
                  justify="space-around"
                  align="center"
                >
                  <Info
                    isEmpInfo={isEmpInfo}
                    employee={employeeData && employeeData.employee}
                  />
                  {(employeeAuth.role === "ADMIN" ||
                    employeeAuth.level >= 3) && (
                    <EmployeeDelete employee={employee} />
                  )}
                </Content>
              </DGrid>
            </Content>
          </>
        )}
      </DSection>
    </Layout>
  );
};

export default Employee;
