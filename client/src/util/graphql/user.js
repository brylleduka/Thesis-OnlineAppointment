import gql from "graphql-tag";

const FETCH_USER_ACCOUNT = gql`
  query user($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      contact
      photo
    }
  }
`;

export { FETCH_USER_ACCOUNT };