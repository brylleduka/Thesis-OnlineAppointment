import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";

import { Link } from "react-router-dom";
import {
  DGrid,
  DImage,
  DCard,
  DSection,
  Overlay
} from "../../styled/containers";
// import Skeleton from "../../Skeleton";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";

const Team = ({ cards }) => {
  const [employeesAR, setEmployeesAR] = useState([]);

  const {
    data: data_employeesAR,
    loading: loading_employeesAR,
    error
  } = useQuery(FETCH_EMPLOYEES_NOT_ADMIN_QUERY, {
    variables: {
      limit: 4
    }
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
      <h1 style={{ marginBottom: "24px" }}>Our Team</h1>
      <DGrid four margin="0 auto" gap="25px" style={{ marginBottom: "24px" }}>
        {!data_employeesAR ? (
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
          data_employeesAR &&
          data_employeesAR.aestheticiansReceps.map(emp => (
            <DCard bs={"0"}>
              <DImage width="150px" height="150px" m="0 auto" circle>
                <img
                  src={
                    emp.photo !== null
                      ? `/images/employees/${emp.photo}`
                      : cards
                  }
                  alt="card 1"
                />
              </DImage>
              <div className="card-details">
                <h3>
                  {emp.title}. {emp.firstName} {emp.lastName}
                </h3>
                <p>{parse(emp.bio)}</p>
              </div>
              <Overlay
                hovOpac="1"
                opac="0"
                bg={"rgba(0,0,0,0.7)"}
                flex
                jusitfy="center"
                align="center"
              >
                <div className="overlay-box">
                  <div className="overlay-box__content dark">
                    <h1>Follow</h1>
                  </div>
                </div>
              </Overlay>
            </DCard>
          ))
        )}
      </DGrid>
      <Link to="/" className="btn btn-blue">
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
    lineHeight: 2
  }
};

export default Team;
