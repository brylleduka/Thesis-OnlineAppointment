import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";

import { HashLink as Link } from "react-router-hash-link";
import { DGrid, DSection, Content } from "../../styled/containers";
import { JCard4 } from "../../styled/card";

import Spinner from "../../Spinner";
import parser from "html-react-parser";
import ReadMore from "../utils/ReadMore";
import FancyText from "../../FancyText";

const TeamSection = ({ cards }) => {
  const [employeesAR, setEmployeesAR] = useState([]);

  const {
    data: data_employeesAR,
    loading: loading_employeesAR,
    error,
  } = useQuery(FETCH_EMPLOYEES_NOT_ADMIN_QUERY, {
    variables: {
      limit: 4,
      active: true,
    },
  });

  useEffect(() => {
    if (data_employeesAR) {
      setEmployeesAR(data_employeesAR.aestheticiansReceps);
    }
  }, [data_employeesAR]);

  if (error) {
    return <p>Oops!</p>;
  }

  return (
    <DSection
      width="90%"
      flex
      justify="center"
      align="center"
      direct="column"
      height="100%"
      margin="48px auto"
    >
      <FancyText size="28px">Our Team</FancyText>
      {loading_employeesAR ? (
        <Spinner />
      ) : (
        <DGrid three gap="25px">
          {employeesAR &&
            employeesAR.map((employee) => (
              <Content margin="0 auto" width="90%" height="100%">
                <JCard4 data-emp={employee._id} key={employee._id}>
                  <div className="profile-image">
                    <img
                      src={
                        employee.imageURL !== null
                          ? employee.imageURL
                          : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png"
                      }
                      alt={employee.photo}
                    />
                  </div>
                  <figcaption>
                    <h4>
                      {employee.title} {employee.firstName} {employee.lastName}
                    </h4>
                    <h4>{employee.role}</h4>
                    <p>
                      {employee.bio.length > 100
                        ? parser(employee.bio.substr(0, 100) + "...")
                        : parser(employee.bio.substr(0, 100))}
                    </p>
                    <ReadMore
                      hover={0}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      Read More
                    </ReadMore>
                  </figcaption>
                  <Link to="/about" className="linkToPage" />
                </JCard4>
              </Content>
            ))}
        </DGrid>
      )}

      <Link to="/about/#team" className="btn btn-blue">
        Learn More
      </Link>
    </DSection>
  );
};

const styles = {
  dloading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "250px",
    lineHeight: 2,
    margin: "0 auto",
  },
};

export default TeamSection;
