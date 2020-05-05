import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { HeaderLayout } from "../../styled/layout";
import { Link } from "react-router-dom";
import { DImage, Overlay, DCard } from "../../styled/containers";

import { AuthContext } from "../../../context/auth";
import { Dropdown, Icon } from "semantic-ui-react";
import Spinner from "../../Spinner";

const Header = () => {
  const { employeeLogout, employeeAuth } = useContext(AuthContext);
  const [empLog, setEmpLog] = useState({});

  const { data: dataEmpLog, loading: loadEmpLog, error: errEmpLog } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: { employeeId: employeeAuth.id },
    }
  );

  useEffect(() => {
    if (dataEmpLog) setEmpLog(dataEmpLog.employee);
  }, [dataEmpLog]);

  const handleLogout = () => {
    employeeLogout();
  };

  return (
    <HeaderLayout>
      {loadEmpLog ? (
        <Spinner small />
      ) : (
        <Dropdown
          trigger={
            <DCard dw="50px" dh="50px" mcenter circle p="0px" grayzoom>
              <DImage circle height="100%" width="100%">
                <img
                  src={empLog.photo && `/images/employees/${empLog.photo}`}
                  alt={empLog.lastName}
                />
              </DImage>
            </DCard>
          }
          pointing="top right"
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item disabled>
              Signed is as{" "}
              <strong>
                {empLog.firstName} {empLog.lastName}
              </strong>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/zeadmin/paccount">
              <Icon name="user" />
              Account
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <Icon name="sign out" />
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </HeaderLayout>
  );
};

export default Header;
