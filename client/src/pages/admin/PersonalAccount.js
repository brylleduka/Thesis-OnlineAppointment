import React, { useContext, useState } from "react";
import Layout from "../../components/admin/layout/Layout";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../util/graphql/employee";
import { DSection, DGrid } from "../../components/styled/containers";
import Skeleton from "react-loading-skeleton";
import PhotoBooth from "../../components/admin/accounts/PhotoBooth";
import AccountInfo from "../../components/admin/accounts/AccountInfo";

const PersonalAccount = () => {
  const { employeeAuth } = useContext(AuthContext);
  const stored = localStorage.getItem("account");
  const [isAccount, setIsAccount] = useState(
    stored === "details"
      ? "details"
      : stored === "appointments"
      ? "schedule"
      : "details"
  );

  const { data: empData, loading: empLoading } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeAuth.id
      }
    }
  );

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
        <DGrid custom="300px 1fr" gap="10px">
          {empData && empData.employee ? (
            !empLoading ? (
              <>
                <PhotoBooth
                  handleDetails={handleDetails}
                  handleSchedule={handleSchedule}
                  photo={empData.employee.photo}
                  id={empData.employee._id}
                  fetchEmployee={FETCH_EMPLOYEE_QUERY}
                />
                <AccountInfo
                  employee={empData.employee}
                  fetchEmployee={FETCH_EMPLOYEE_QUERY}
                  isAccount={isAccount}
                />
              </>
            ) : (
              <>
                <Skeleton height={200} width={200} circle />
                <Skeleton height={200} count={2} />
              </>
            )
          ) : (
            <>
              <Skeleton height={200} width={200} circle />
              <Skeleton height={200} count={2} />
            </>
          )}
        </DGrid>
      </DSection>
    </Layout>
  );
};

export default PersonalAccount;
