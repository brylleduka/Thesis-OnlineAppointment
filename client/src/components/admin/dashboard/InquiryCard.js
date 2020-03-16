import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  FETCH_INQUIRIES,
  FETCH_INQUIRIES_READ
} from "../../../util/graphql/inquiry";
import { Content, DCard, DGrid } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";

const InquiryCard = ({ history }) => {
  const [isInqs, setIsInqs] = useState([]);
  const [isInqsRead, setIsInqsRead] = useState([]);
  const [isInqsUnread, setIsInqsUnread] = useState([]);

  const { data: dataInqs, loading: loadingInqs } = useQuery(FETCH_INQUIRIES);

  useEffect(() => {
    if (dataInqs) {
      setIsInqs(dataInqs.inquiries);
    }
  }, [dataInqs]);

  const { data: dataInqsRead, loading: loadingInqsRead } = useQuery(
    FETCH_INQUIRIES_READ,
    {
      variables: {
        read: true
      }
    }
  );

  useEffect(() => {
    if (dataInqsRead) {
      setIsInqsRead(dataInqsRead.inquiriesRead);
    }
  }, [dataInqsRead]);

  const { data: dataInqsUnread, loading: loadingInqsUnread } = useQuery(
    FETCH_INQUIRIES_READ,
    {
      variables: {
        read: false
      }
    }
  );

  useEffect(() => {
    if (dataInqsUnread) {
      setIsInqsUnread(dataInqsUnread.inquiriesRead);
    }
  }, [dataInqsUnread]);

  return (
    <DCard
      dh="200px"
      dw="300px"
      onClick={() => history.push("/zeadmin/inquiry")}
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
            Inquiries:
          </DLabel>
          <Content width="100%" flex justify="center" align="center">
            {loadingInqs ? (
              <Spinner small />
            ) : (
              isInqs && <h1>{isInqs.length}</h1>
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
                bgcolor={({ theme }) => theme.bluer}
                color="white"
                size="12px"
                rounded
              >
                Read:
              </DLabel>
              <Content width="100%" flex justify="center" align="center">
                {loadingInqsRead ? (
                  <Spinner small />
                ) : (
                  isInqsRead && <h4>{isInqsRead.length}</h4>
                )}
              </Content>
            </Content>
            <Content width="100%" flex justify="space-between" margin="0 auto">
              <DLabel
                flex
                justifyCenter
                alignCenter
                weight={500}
                w={"100%"}
                bgcolor={({ theme }) => theme.secondary}
                color="white"
                size="12px"
                rounded
              >
                Unread:
              </DLabel>
              <Content width="100%" flex justify="center" align="center">
                {loadingInqsUnread ? (
                  <Spinner small />
                ) : (
                  isInqsUnread && <h4>{isInqsUnread.length}</h4>
                )}
              </Content>
            </Content>
          </DGrid>
        </Content>
      </Content>
    </DCard>
  );
};

export default InquiryCard;
