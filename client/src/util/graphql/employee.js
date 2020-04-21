import gql from "graphql-tag";

// EMPLOYEES

const FETCH_ALL_EMPLOYEES_QUERY = gql`
  query employees {
    employees {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      role
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      services {
        _id
        name
        price
        duration
        description
        photo
      }
    }
  }
`;

const FETCH_EMPLOYEES_NOT_ADMIN_QUERY = gql`
  query aestheticiansReceps($limit: Int) {
    aestheticiansReceps(limit: $limit) {
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
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      services {
        _id
        name
        price
        duration
        description
        photo
      }
    }
  }
`;

const FETCH_EMPLOYEE_QUERY = gql`
  query employee($employeeId: ID!) {
    employee(_id: $employeeId) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      role
      dateOfBirth
      bio
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      services {
        _id
        name
        price
        duration
        description
        photo
      }
    }
  }
`;

// END-EMPLOYEES

export {
  FETCH_ALL_EMPLOYEES_QUERY,
  FETCH_EMPLOYEE_QUERY,
  FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
};
