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
      createdAt
      updatedAt
    }
  }
`;

const FETCH_INQUIRIES_READ = gql`
  query inquiriesRead($read: Boolean) {
    inquiriesRead(read: $read) {
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

const FETCH_INQUIRY = gql`
  query inquiry($inquiryId: ID!) {
    inquiry(_id: $inquiryId) {
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

export { FETCH_INQUIRIES, FETCH_INQUIRIES_READ, FETCH_INQUIRY };
