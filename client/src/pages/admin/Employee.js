import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Breadcrumb } from "semantic-ui-react";
import { FETCH_EMPLOYEE_QUERY } from "../../util/graphql/employee";
import Layout from "../../components/admin/layout/Layout";
import { DGrid, DSection, Content } from "../../components/styled/containers";
import Spinner from "../../components/Spinner";
import useWindowSize from "../../util/hooks/useWindowSize";
import PhotoBooth from "../../components/admin/employees/PhotoBooth";
import Info from "../../components/admin/employees/Info";

const Employee = (props) => {
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
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
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
                <Info
                  isEmpInfo={isEmpInfo}
                  employee={employeeData && employeeData.employee}
                />
              </DGrid>
            </Content>
          </>
        )}
      </DSection>
      {/* {employeeLoading ? (
        <Spinner content="Please wait while we fetch our data..." />
      ) : (
        <DGrid gap="15px" margin="40px 0">
          <DSection
            width="100%"
            height="100%"
            style={{ borderBottom: "1px solid #ccc" }}
            pad="0 0 20px 0"
          >
            <DGrid two gap="10px">
              <Content
                width="100%"
                imgHeight="300px"
                style={{ borderRight: "1px solid #ccc" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Overlay
                    flex
                    justify="center"
                    align="center"
                    bg="rgba(0, 0, 0, 0.6)"
                  >
                    <h3>Drop Image</h3>
                  </Overlay>
                ) : (
                  <>
                    {loading ? (
                      <Spinner medium inverted />
                    ) : (
                      <img
                        src={
                          employeeData.employee.photo !== null
                            ? `/images/employees/${employeeData.employee.photo}`
                            : // `/images/${photo}`
                              "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        }
                        alt="Employee"
                        style={{ objectFit: "contain" }}
                      />
                    )}

                    <Overlay
                      opac="0"
                      hovOpac="1"
                      pointer
                      className="dark"
                      flex
                      justify="center"
                      align="center"
                      bg="rgba(0, 0, 0, 0.6)"
                    >
                      <h2>Click or Drop an Image</h2>
                    </Overlay>
                  </>
                )}
              </Content>
              <EmployeeServices employee={employeeData.employee} />
            </DGrid>
          </DSection>
          <EmployeeDetails employee={employeeData.employee} />
        </DGrid>
      )} */}
    </Layout>
  );
};

export default Employee;
