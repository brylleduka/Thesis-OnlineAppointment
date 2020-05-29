import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_EMPLOYEE_QUERY,
  FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
} from "../../../../util/graphql/employee";
import { DButton, IconWrap } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { JCard4, JCard3 } from "../../../styled/card";
import { Modal, Popup, Grid } from "semantic-ui-react";
import { DeleteForever, Restore, Warning } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import parser from "html-react-parser";
import useWindowSize from "../../../../util/hooks/useWindowSize";

import toaster from "toasted-notes";
import Toasted from "../../../Toasted";
import Spinner from "../../../Spinner";

const ArchEmpView = ({ empId, empView, setEmpView }) => {
  const { width: wid } = useWindowSize();
  const [emp, setEmp] = useState({});
  const [popWarning, setPopWarning] = useState(false);

  const { data: empData, loading: empLoad } = useQuery(FETCH_EMPLOYEE_QUERY, {
    variables: { employeeId: empId },
  });

  useEffect(() => {
    if (empData) setEmp(empData.employee);
  }, [empData]);

  // DELETE
  const [deleteEmployee, { loading: loadResult }] = useMutation(
    DELETE_EMP_PERM,
    {
      variables: {
        empId,
      },
      refetchQueries: [
        {
          query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
          variables: { limit: 0, active: false },
        },
      ],
      onCompleted(res) {
        setEmpView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Deleted
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END DELETE

  // RESTORE
  const [archiveEmployee, { loading: loadArchived }] = useMutation(
    RESTORE_EMPLOYEE,
    {
      variables: {
        employeeId: empId,
        active: true,
      },

      refetchQueries: [
        {
          query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
          variables: { active: false, limit: 0 },
        },
      ],
      onCompleted() {
        setEmpView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Restored
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END RESTORE

  const handleWarning = () => {
    setPopWarning(!popWarning);
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    deleteEmployee();
  };

  const confirmRestore = (e) => {
    e.preventDefault();
    archiveEmployee();
  };

  return (
    <>
      <Modal
        size={wid < 1024 ? "tiny" : "small"}
        open={empView}
        onClose={() => setEmpView(false)}
        closeIcon
      >
        <DGrid two>
          <Modal.Content>
            <JCard4
              top={"-30px"}
              imgh="250px"
              imgw={wid <= 768 ? "50%" : "75%"}
            >
              <div className="profile-image">
                <img
                  src={
                    emp.photo
                      ? `/images/employees/${emp.photo}`
                      : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg"
                  }
                  alt={emp.photo}
                />
              </div>
            </JCard4>
          </Modal.Content>
          <Modal.Content scrolling className="modal-content2">
            <JCard3>
              <div className="description">
                <h1>{emp.firstName}</h1>
                <h4>{emp.role}</h4>
                <p style={{ letterSpacing: "2px", lineHeight: 1.5 }}>
                  {emp.bio ? parser(emp.bio) : emp.bio}
                </p>
              </div>
            </JCard3>
          </Modal.Content>
        </DGrid>
        <Modal.Actions>
          <Content
            flex
            justify="space-between"
            align="center"
            width="100%"
            height="100%"
          >
            <Content
              flex
              width="100%"
              height="100%"
              justify="flex-start"
              align="center"
            >
              <Popup
                open={popWarning}
                trigger={
                  <DButton alert flex onClick={handleWarning}>
                    <DeleteForever size="22px" />
                    Delete Permanently
                  </DButton>
                }
                position="top center"
                flowing
              >
                <DGrid two gap="5px">
                  <IconWrap
                    size="22px"
                    color="green"
                    margin="0 auto"
                    onClick={handleDeleteConfirm}
                  >
                    {loadResult ? (
                      <Spinner small row content="Deleting..." />
                    ) : (
                      <>
                        <Check title="Confirm deleting permanently" />
                        Confirm
                      </>
                    )}
                  </IconWrap>

                  <IconWrap
                    size="22px"
                    color="red"
                    margin="0 auto"
                    onClick={() => setPopWarning(false)}
                  >
                    <Cancel title="Cancel action" />
                    Cancel
                  </IconWrap>
                </DGrid>
              </Popup>

              <Popup
                trigger={
                  <IconWrap
                    circle
                    color="secondary"
                    small
                    mcenter
                    title="Warning"
                  >
                    <Warning />
                  </IconWrap>
                }
                content={
                  <p style={{ fontWeight: 700 }}>
                    Deleting Permantly cannot be restored
                  </p>
                }
                position="top right"
                size="tiny"
                inverted
              />
            </Content>

            <Content
              width="100%"
              height="100%"
              flex
              justify="flex-end"
              align="center"
            >
              <DButton confirm onClick={confirmRestore}>
                {loadArchived ? (
                  <Spinner row small content="Restoring..." />
                ) : (
                  <>
                    <Restore size="22px" />
                    Restore
                  </>
                )}
              </DButton>
            </Content>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const DELETE_EMP_PERM = gql`
  mutation deleteEmployee($empId: ID!) {
    deleteEmployee(_id: $empId)
  }
`;

const RESTORE_EMPLOYEE = gql`
  mutation archiveEmployee($employeeId: ID!, $active: Boolean) {
    archiveEmployee(_id: $employeeId, active: $active) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      bio
      role
      level
      active
    }
  }
`;

export default ArchEmpView;
