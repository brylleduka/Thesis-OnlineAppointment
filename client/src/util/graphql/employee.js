import gql from "graphql-tag";

// EMPLOYEES

const FETCH_ALL_EMPLOYEES_QUERY = gql`
  query employees($active: Boolean) {
    employees(active: $active) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      imageURL
      role
      level
      password
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      categoryServices {
        _id
        name
        description
        photo
      }
    }
  }
`;

const FETCH_EMPLOYEES_NOT_ADMIN_QUERY = gql`
  query aestheticiansReceps($limit: Int, $active: Boolean) {
    aestheticiansReceps(limit: $limit, active: $active) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      imageURL
      bio
      role
      level
      password
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      categoryServices {
        _id
        name
        description
        photo
        imageURL
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
      imageURL
      role
      level
      dateOfBirth
      bio
      password
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
      categoryServices {
        _id
        name
        description
        photo
        imageURL
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
