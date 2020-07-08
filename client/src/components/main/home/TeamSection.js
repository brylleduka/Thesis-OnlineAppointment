import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";

import { HashLink as Link } from "react-router-hash-link";
import { DGrid, DSection, Content } from "../../styled/containers";
import { JCard4, JCard3 } from "../../styled/card";
import { Modal } from "semantic-ui-react";
import Slider from "react-slick";
import Spinner from "../../Spinner";
import parser from "html-react-parser";
import ReadMore from "../utils/ReadMore";
import FancyText from "../../FancyText";
import TeamDetails from "../about/TeamDetails";

const TeamSection = () => {
  const [employeesAR, setEmployeesAR] = useState([]);
  const [openAesthetician, setOpenAesthetician] = useState(false);

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
    return <Spinner />;
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
      <Content height="100vh" width="100%" margin="0 auto">
        {loading_employeesAR ? (
          <Spinner />
        ) : (
          <Slider {...settings}>
            {employeesAR &&
              employeesAR.map((employee) => (
                <div className="slider_holder" key={employee._id}>
                  <TeamDetails key={employee._id} employee={employee} />
                </div>
              ))}

            {/* <DGrid three gap="25px">
            {employeesAR &&
              employeesAR.map((employee) => (
                <>
                  <TeamDetails key={employee._id} employee={employee} />
                </>
              ))}
          </DGrid> */}
          </Slider>
        )}
      </Content>
      <Link to="/about/#team" className="btn btn-blue">
        Learn More
      </Link>
    </DSection>
  );
};

// const styles = {
//   dloading: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     width: "250px",
//     lineHeight: 2,
//     margin: "0 auto",
//   },
// };

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 3,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ],
};

export default TeamSection;
