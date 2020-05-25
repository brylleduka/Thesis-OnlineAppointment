import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";
import { DGrid, DSection, Content } from "../../styled/containers";
import Spinner from "../../Spinner";
import FancyText from "../../FancyText";
import TeamDetails from "./TeamDetails";

const Team = () => {
  const [employees, setEmployees] = useState([]);

  const { data: dataEmployees, loading: loadingEmployees } = useQuery(
    FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
    {
      variables: { limit: 0, active: true },
    }
  );

  useEffect(() => {
    if (dataEmployees) {
      setEmployees(dataEmployees.aestheticiansReceps);
    }
  }, [dataEmployees]);

  return (
    <>
      <DSection
        height="100%"
        width="100%"
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        fixed
        id="team"
      >
        <Content
          flex
          justify="center"
          align="center"
          width="100%"
          height="50vh"
        >
          <FancyText size="48px">Our TEAM</FancyText>
        </Content>
      </DSection>
      <DSection
        flex
        justify="center"
        align="center"
        height="100%"
        width="90%"
        pad="10px 0"
        mcenter
        style={{ minHeight: "100vh" }}
      >
        <Content
          height="100%"
          width="100%"
          flex
          justify="space-around"
          align="center"
          margin="0 auto"
        >
          {loadingEmployees ? (
            <Content
              flex
              justify="center"
              align="center"
              width="90%"
              height="100%"
            >
              <Spinner content="Fetching data..." />
            </Content>
          ) : (
            <DGrid three gap="20px">
              {employees &&
                employees.map((emp) => (
                  <TeamDetails key={emp._id} employee={emp} />
                ))}
            </DGrid>
          )}
        </Content>
      </DSection>
    </>
  );
};

export default Team;
