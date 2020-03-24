import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_ACCOUNT } from "../../util/graphql/user";
import Layout from "../../components/admin/layout/Layout";
import { DSection, DGrid, Content } from "../../components/styled/containers";
import Skeleton from "react-loading-skeleton";
import PhotoBooth from "../../components/admin/client/PhotoBooth";
import ClientDetails from "../../components/admin/client/ClientDetails";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AppointmentModal from "../../components/admin/client/AppointmentModal";

const UserInfo = props => {
  const clientId = props.match.params._id;
  const [isClient, setIsClient] = useState({});

  const { data: dataClient, loading: loadingClient } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId: clientId
      }
    }
  );

  useEffect(() => {
    if (dataClient) {
      setIsClient(dataClient.user);
    }
  }, [dataClient]);

  return (
    <Layout>
      <DSection width="90%" mcenter pad="40px 0" height="100%">
        <Content
          width="100%"
          margin="24px 0"
          flex
          justify="space-between"
          align="center"
        >
          <Breadcrumb size={"large"}>
            <Breadcrumb.Section as={Link} to="/zeadmin/user">
              Clients
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section>
              {isClient && (
                <span>
                  {isClient.firstName} {isClient.lastName}'s
                </span>
              )}
            </Breadcrumb.Section>
          </Breadcrumb>
          <AppointmentModal clientId={clientId} />
        </Content>

        <DGrid custom="300px 1fr" gap="10px">
          {dataClient && dataClient.user ? (
            !loadingClient ? (
              <>
                <PhotoBooth photo={dataClient.user.photo} />
                <ClientDetails userInfo={dataClient.user} />
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

export default UserInfo;
