import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { FETCH_USER_ACCOUNT } from "../../util/graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";

import {
  DGrid,
  DSection,
  Content,
  Overlay
} from "../../components/styled/containers";
import AccountDetails from "../../components/main/user/AccountDetails";
import CurrentAppointment from "../../components/main/user/CurrentAppointment";
import MyAppointmentHistory from "../../components/main/user/MyAppointmentHistory";
import Skeleton from "../../components/Skeleton";
import Spinner from "../../components/Spinner";

const MyAccount = props => {
  const { user } = useContext(AuthContext);
  const userId = props.match.params._id;
  // const [account, setAccount] = useState({});

  const { data: userInfo, loading: userLoading } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId
      }
    }
  );

  // useEffect(() => {
  //   if (userInfo) {
  //     setAccount(userInfo.user);
  //   }
  // }, [userInfo]);

  // DROPZONE
  const [addUserPhoto, { loading }] = useMutation(UPLOAD_USER_PHOTO, {
    refetchQueries: [
      {
        query: FETCH_USER_ACCOUNT,
        variables: {
          userId
        }
      }
    ]
  });

  const onDrop = useCallback(
    ([file]) => {
      addUserPhoto({ variables: { userId, file } });
    },
    [addUserPhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DSection
      height="100%"
      margin="20vh auto 10vh auto"
      width="90%"
      pad="40px 50px"
      background={
        "https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      fixed
    >
      <h2 style={{ color: "#fff" }}>My Account</h2>
      {userLoading ? (
        <DSection height="70vh">
          <Skeleton />
        </DSection>
      ) : (
        <DGrid gap="10px">
          <Content
            height="50vh"
            flex
            align="center"
            pad="10px 15px"
            bgcolor="#eee"
            width="100%"
            rounded
          >
            <DGrid custom="30% 1fr" gap="20px">
              <Content
                height="100%"
                width="100%"
                flex
                justify="center"
                align="center"
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
                    <h4>Drop Image</h4>
                  </Overlay>
                ) : (
                  <>
                    {loading ? (
                      <Spinner medium inverted />
                    ) : (
                      <img
                        src={
                          userInfo.user.photo !== null
                            ? `/images/users/${userInfo.user.photo}`
                            : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        }
                        alt="Category"
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
                      <h4>Click or Drop an Image</h4>
                    </Overlay>
                  </>
                )}
              </Content>

              <AccountDetails myDetails={userInfo.user} userId={userId} />
            </DGrid>
          </Content>
          <CurrentAppointment />
          <MyAppointmentHistory />
        </DGrid>
      )}
      <Overlay bg="rgba(rgba(52, 152, 219,0.3))" />
    </DSection>
  );
};

const UPLOAD_USER_PHOTO = gql`
  mutation addUserPhoto($userId: ID!, $file: Upload) {
    addUserPhoto(_id: $userId, file: $file)
  }
`;

export default MyAccount;
