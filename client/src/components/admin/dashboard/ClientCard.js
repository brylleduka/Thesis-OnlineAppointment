import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS_ACCOUNT } from "../../../util/graphql/user";
import { Content, DGrid, DCard } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";
import moment from "moment";

const ClientCard = ({ history }) => {
  let newClients = [];
  const [isUsers, setIsUsers] = useState([]);

  const { data: dataUsers, loading: loadingUsers } = useQuery(
    FETCH_USERS_ACCOUNT
  );

  if (dataUsers) {
    dataUsers.getUsers.map(user => {
      const newUser = new Date(parseInt(user.createdAt)).setDate(
        new Date(parseInt(user.createdAt)).getDate() + 15
      );

      const newUser2 =
        moment(parseInt(newUser)).format("MM/DD/YYYY") >=
        moment().format("MM/DD/YYYY");

      if (newUser2) {
        newClients.push(moment(parseInt(newUser)).format("MM/DD/YYYY"));
      }
    });
  }

  useEffect(() => {
    if (dataUsers) {
      setIsUsers(dataUsers.getUsers);
    }
  }, [dataUsers]);

  return (
    <DCard
      dh="200px"
      dw="300px"
      onClick={() => history.push("/zeadmin/user")}
      pointer
    >
      <Content
        width="100%"
        height="100%"
        flex
        justify="space-between"
        align="center"
        direct="column"
        margin="0 auto"
      >
        <Content
          width="90%"
          flex
          justify="space-between"
          align="center"
          direct="column"
          margin="0 auto"
        >
          <DLabel
            flex
            justifyCenter
            alignCenter
            weight={500}
            w={"100%"}
            size="18px"
            bgcolor="#eee"
            rounded
          >
            Clients
          </DLabel>
          <Content width="50%" flex justify="center" align="center">
            {dataUsers && isUsers.length > 0 ? (
              <h1>{isUsers.length}</h1>
            ) : (
              <Spinner small />
            )}
          </Content>
        </Content>
        <Content width="100%">
          <DGrid>
            <Content width="100%" flex justify="space-between" margin="0 auto">
              <DLabel
                flex
                justifyCenter
                alignCenter
                weight={500}
                w={"100%"}
                bgcolor="#6dd5ed"
                color="#fff"
                size="12px"
                rounded
              >
                New Clients:
              </DLabel>
              <Content width="100%" flex justify="center" align="center">
                {newClients.length > 0 ? (
                  <h4>{newClients.length}</h4>
                ) : (
                  <Spinner small />
                )}
              </Content>
            </Content>
          </DGrid>
        </Content>
      </Content>
    </DCard>
  );
};

export default ClientCard;
