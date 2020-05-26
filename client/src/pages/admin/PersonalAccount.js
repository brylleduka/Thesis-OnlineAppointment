import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../util/graphql/employee";
import { DSection, DGrid } from "../../components/styled/containers";
import Skeleton from "react-loading-skeleton";
import Spinner from "../../components/Spinner";
import PhotoBooth from "../../components/admin/accounts/PhotoBooth";
import AccountInfo from "../../components/admin/accounts/AccountInfo";

const PersonalAccount = (props) => {
  const { employeeAuth } = useContext(AuthContext);
  const empId = props.match.params._id;
  const [empPersonal, setEmpPersonal] = useState({});
  const stored = localStorage.getItem("account");
  const [isAccount, setIsAccount] = useState(
    stored === "details"
      ? "details"
      : stored === "schedule"
      ? "schedule"
      : "details"
  );

  const { data: empData, loading: empLoading } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: empId || employeeAuth.id || employeeAuth._id,
      },
    }
  );

  useEffect(() => {
    if (empData) setEmpPersonal(empData.employee);
  }, [empData]);

  const handleDetails = () => {
    setIsAccount("details");
    localStorage.setItem("account", "details");
  };
  const handleSchedule = () => {
    setIsAccount("schedule");
    localStorage.setItem("account", "schedule");
  };

  return (
    <Layout>
      <DSection width="90%" mcenter pad="40px 0" height="100%">
        {empLoading ? (
          <Spinner content="Please wait while we fetch the data..." />
        ) : (
          <DGrid custom="300px 1fr" gap="10px">
            <PhotoBooth
              handleDetails={handleDetails}
              handleSchedule={handleSchedule}
              photo={empData.employee.photo}
              id={empData.employee._id}
              fetchEmployee={FETCH_EMPLOYEE_QUERY}
            />
            <AccountInfo
              employee={empData.employee || empPersonal}
              fetchEmployee={FETCH_EMPLOYEE_QUERY}
              isAccount={isAccount}
            />
          </DGrid>
        )}
      </DSection>
    </Layout>
  );
};

export default PersonalAccount;
