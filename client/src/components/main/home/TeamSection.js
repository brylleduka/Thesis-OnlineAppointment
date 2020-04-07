import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";

import { HashLink as Link } from "react-router-hash-link";
import { DGrid, DSection } from "../../styled/containers";
import { JCard4 } from "../../styled/card";
import Skeleton from "react-loading-skeleton";
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
      <DGrid four gap="25px">
        {loading_employeesAR ? (
          <>
            <div style={styles.dloading}>
              <Skeleton width="150px" height="150px" circle={true} />
              <Skeleton width="250px" count={4} />
            </div>

            <div style={styles.dloading}>
              <Skeleton width="150px" height="150px" circle={true} />
              <Skeleton width="250px" count={4} />
            </div>
            <div style={styles.dloading}>
              <Skeleton width="150px" height="150px" circle={true} />
              <Skeleton width="250px" count={4} />
            </div>
            <div style={styles.dloading}>
              <Skeleton width="150px" height="150px" circle={true} />
              <Skeleton width="250px" count={4} />
            </div>
          </>
        ) : (
          employeesAR &&
          employeesAR.map((employee) => (
            <JCard4 data-emp={employee._id} key={employee._id}>
              <div className="profile-image">
                <img
                  src={
                    employee.photo
                      ? `/images/employees/${employee.photo}`
                      : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg"
                  }
                  alt={employee.photo}
                />
              </div>
              <figcaption>
                <h3>
                  {employee.title} {employee.firstName} {employee.lastName}
                </h3>
                <h4>{employee.role}</h4>
                <p>
                  {employee.bio.length > 50
                    ? parser(employee.bio.substr(0, 50) + "...")
                    : parser(employee.bio.substr(0, 50))}
                </p>
                <ReadMore hover={0}>Read More</ReadMore>
              </figcaption>
              <Link to="/zessence/about" className="linkToPage" />
            </JCard4>
          ))
        )}
      </DGrid>
      <Link to="/zessence/about/#team" className="btn btn-blue">
        Learn More
      </Link>
    </DSection>
  );
};

const styles = {
  dloading: {
    display: "flex",
    justifyContent: "centet",
    alignItems: "center",
    flexDirection: "column",
    width: "250px",
    lineHeight: 2,
  },
};

export default TeamSection;
