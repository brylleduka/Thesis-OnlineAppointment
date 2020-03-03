import gql from "graphql-tag";

const FETCH_INQUIRIES = gql`
  query inquiries {
    inquiries {
      _id
      name
      email
      subject
      message
      to
      reply
    }
  }
`;

export { FETCH_INQUIRIES };
