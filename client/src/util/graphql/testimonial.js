import gql from "graphql-tag";

const FETCH_TESTIMONIALS = gql`
  query testimonials($active: Boolean) {
    testimonials(active: $active) {
      _id
      rating
      message
      view
      createdAt
      updatedAt
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
      createdAt
      updatedAt
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

const FETCH_VIEWS = gql`
  query testimonialsView($limit: Int) {
    testimonialsView(limit: $limit) {
      _id
      rating
      message
      view
      createdAt
      updatedAt
      user {
        _id
        firstName
        lastName
        photo
      }
    }
  }
`;

export { FETCH_TESTIMONIALS, FETCH_USER_REVIEW, FETCH_VIEWS };
