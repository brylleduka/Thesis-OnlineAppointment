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
      dateOfBirth
    }
  }
`;

const FETCH_USERS_ACCOUNT = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      contact
      photo
      dateOfBirth
    }
  }
`;

export { FETCH_USER_ACCOUNT, FETCH_USERS_ACCOUNT };
