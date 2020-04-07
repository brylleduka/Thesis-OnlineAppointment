import gql from "graphql-tag";

const FETCH_TESTIMONIALS = gql`
  query testimonials {
    testimonials {
      _id
      rating
      message
      view
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

const FETCH_USER_REVIEW = gql`
  query userTestimonial($userId: ID) {
    userTestimonial(userId: $userId) {
      _id
      rating
      message
      view
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

export { FETCH_TESTIMONIALS, FETCH_USER_REVIEW };
