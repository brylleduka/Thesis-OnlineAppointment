import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link, useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";
import { DSection, Content } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import useWindowSize from "../../util/hooks/useWindowSize";

const ThankYou = (props) => {
  const { width: wid } = useWindowSize();
  const { userId } = useContext(AuthContext);
  const emailToken = props.match.params.emailToken;
  const history = useHistory();
  history.go(1);

  const decodedToken = jwtDecode(emailToken);

  const { _id } = decodedToken;

  const [verifiedAppointment] = useMutation(VERRIFIED_APPOINTMENT, {
    variables: {
      appointmentId: _id,
    },
  });

  window.onload = () => {
    verifiedAppointment();
  };

  return (
    <DSection
      height="100vh"
      margin="15vh 0 0 0"
      background={
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      flex
      justify="center"
      align="center"
    >
      <Content
        width="80%"
        flex
        justify="center"
        align="center"
        direct="column"
        bgcolor="rgba(223, 230, 233,0.5)"
        height="80%"
        pad="20px"
        rounded
      >
        <h1>Thank you for Booking an appointment with us!</h1>
        <h4>
          You can view your appointment details by signing in and go to My
          Account Page
        </h4>
        <Content
          width="80%"
          flex
          justify="space-around"
          align="center"
          margin="0 auto"
          direction={wid < 768 ? "column" : "row"}
        >
          <DButton as={Link} to="/">
            Explore
          </DButton>
          <DButton as={Link} to={userId ? `/account/${userId}` : `/login`}>
            Go to my account
          </DButton>
        </Content>
      </Content>
    </DSection>
  );
};

const VERRIFIED_APPOINTMENT = gql`
  mutation verifiedAppointment($appointmentId: ID!) {
    verifiedAppointment(_id: $appointmentId) {
      _id
    }
  }
`;

export default ThankYou;
