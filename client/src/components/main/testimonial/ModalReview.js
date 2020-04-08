import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_TESTIMONIALS } from "../../../util/graphql/testimonial";
import { Rating, Icon, Modal, Form, TextArea } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const ModalReview = ({ openReview, setOpenReview, user, userReview }) => {
  const [rate, setRate] = useState(userReview ? userReview.rating : 1);
  const [message, setMessage] = useState(userReview ? userReview.message : "");
  const [edit, setEdit] = useState(false);

  const mutation = userReview ? UPDATE_REVIEW : ADD_REVIEW;

  const [addOrUpdate, { loading }] = useMutation(mutation, {
    variables: {
      id: userReview && userReview._id,
      rating: rate,
      message: message,
    },
    refetchQueries: [{ query: FETCH_TESTIMONIALS }],

    onCompleted() {
      toaster.notify(
        userReview
          ? "Successfully Update a review"
          : "Successfully Added a review"
      );
    },
  });

  const handleRate = (e, { rating }) => {
    setRate(rating);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    addOrUpdate();
  };

  return (
    <Modal
      size="mini"
      open={openReview}
      onClose={() => {
        setOpenReview(false);
        setEdit(false);
      }}
      closeIcon
    >
      <Modal.Header>
        <Icon name="pencil" />
        Write A Review
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Rating
              rating={rate}
              maxRating={5}
              onRate={handleRate}
              icon="star"
              size="huge"
              style={{ margin: "0 auto" }}
              disabled={edit || !userReview ? false : true}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              style={{ minHeight: 100 }}
              name="message"
              value={message}
              onChange={handleMessage}
              disabled={edit || !userReview ? false : true}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {!userReview || edit ? (
          <DButton confirm onClick={handleSave}>
            {loading ? (
              <Spinner inverted small />
            ) : (
              <>
                <Icon name="send" />
                Send
              </>
            )}
          </DButton>
        ) : (
          <DButton onClick={handleEdit}>
            <Icon name="edit" />
            Edit
          </DButton>
        )}
      </Modal.Actions>
    </Modal>
  );
};

const ADD_REVIEW = gql`
  mutation addTestimonial($rating: Int, $message: String) {
    addTestimonial(inputTestimonial: { rating: $rating, message: $message }) {
      _id
      rating
      message
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation updateTestimonial($id: ID!, $rating: Int, $message: String) {
    updateTestimonial(_id: $id, rating: $rating, message: $message) {
      rating
      message
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

export default ModalReview;
