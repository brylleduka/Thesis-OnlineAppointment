import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_TESTIMONIALS } from "../../../util/graphql/testimonial";

import { Modal, Icon, Popup } from "semantic-ui-react";
import { Archive } from "@styled-icons/boxicons-solid/Archive";
import { DeleteForever } from "@styled-icons/material/DeleteForever";
import { DButton } from "../../../components/styled/utils";
import { Content } from "../../../components/styled/containers";
import useWindowSize from "../../../util/hooks/useWindowSize";
import Spinner from "../../../components/Spinner";
import toaster from "toasted-notes";
import Toasted from "../../../components/Toasted";

const DeleteView = ({ ridd, rvw, isDltModal, setIsDltModal }) => {
  const { width: wdth } = useWindowSize();
  const [errors, setErrors] = useState({});

  const [archiveTestimonial, { loading: loadArchive }] = useMutation(
    ARCHIVED_REVIEW,
    {
      variables: { id: ridd },
      refetchQueries: [
        { query: FETCH_TESTIMONIALS, variables: { active: true } },
      ],
      onCompleted() {
        toaster.notify("Testimonial was sent to archive files");
      },
      onError(err) {
        if (err.graphQLErrors[0].extensions.exception.errors.unauth) {
          toaster.notify(
            ({ onClose }) => (
              <Toasted alert onClick={onClose}>
                {err.graphQLErrors[0].extensions.exception.errors.unauth}
              </Toasted>
            ),
            { position: "bottom-right" }
          );
        }
      },
    }
  );

  const handleArchive = () => {
    archiveTestimonial();
  };

  return (
    <>
      <Modal
        size="small"
        basic
        closeIcon
        onClose={() => setIsDltModal(false)}
        open={isDltModal}
        style={{ zIndex: 9 }}
      >
        <Modal.Header>
          <Archive size="22px" /> Archived this User's Review?
        </Modal.Header>
        <Modal.Content>
          <h3>
            Name: {rvw.user.firstName} {rvw.user.firstName}
          </h3>
          <h4>Message:</h4>
          <p style={{ textIndent: "1em" }}>
            <strong>{rvw.message}</strong>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Content
            width={wdth <= 768 ? "100%" : "90%"}
            margin="0 auto"
            flex
            justify="space-between"
            align="center"
          >
            <Content width="auto">
              <Popup
                content="Deleting will permanently erase this review"
                trigger={
                  <DButton alert style={{ fontSize: "12px" }}>
                    <DeleteForever size="22px" /> Delete Permanently
                  </DButton>
                }
                inverted
              />
            </Content>
            <Content width="auto" flex justify="space-around" align="center">
              <DButton confirm onClick={handleArchive} basic>
                {loadArchive ? (
                  <Spinner inverted small />
                ) : (
                  <>
                    <Icon name="check" /> Yes
                  </>
                )}
              </DButton>

              <DButton alert onClick={() => setIsDltModal(false)} basic>
                <Icon name="ban" /> No
              </DButton>
            </Content>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const ARCHIVED_REVIEW = gql`
  mutation archiveTestimonial($id: ID!) {
    archiveTestimonial(_id: $id)
  }
`;

export default DeleteView;