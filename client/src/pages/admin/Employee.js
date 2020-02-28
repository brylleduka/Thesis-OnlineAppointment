import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  FETCH_EMPLOYEE_QUERY,
  FETCH_ALL_EMPLOYEES_QUERY
} from "../../util/graphql/employee";
import Layout from "../../components/admin/layout/Layout";
import {
  DGrid,
  DSection,
  Content,
  Overlay
} from "../../components/styled/containers";
import EmployeeDetails from "../../components/admin/employees/EmployeeDetails";
import EmployeeServices from "../../components/admin/employees/EmployeeServices";
import Skeleton from "../../components/Skeleton";
import Spinner from "../../components/Spinner";

const Employee = props => {
  const employeeId = props.match.params._id;
  const [employee, setEmployee] = useState({});

  const { data: employeeData, loading: employeeLoading } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId
      }
    }
  );

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData.employee);
    }
  }, [employeeData]);

  // DROPZONE
  const [addEmployeePhoto, { loading }] = useMutation(UPLOAD_EMPLOYEE_PHOTO, {
    refetchQueries: [{ query: FETCH_ALL_EMPLOYEES_QUERY }]
  });

  const onDrop = useCallback(
    ([file]) => {
      addEmployeePhoto({ variables: { employeeId, file } });
    },
    [addEmployeePhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      {employeeLoading ? (
        <Skeleton />
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
      )}
    </Layout>
  );
};

const UPLOAD_EMPLOYEE_PHOTO = gql`
  mutation addEmployeePhoto($employeeId: ID!, $file: Upload) {
    addEmployeePhoto(_id: $employeeId, file: $file)
  }
`;

export default Employee;
