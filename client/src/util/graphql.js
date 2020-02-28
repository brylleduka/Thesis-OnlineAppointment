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

const FETCH_APPOINTMENTS_QUERY = gql`
  query appointments {
    appointments {
      _id
      user {
        _id
        firstName
        lastName
        contact
        email
        photo
      }
      employee {
        _id
        title
        firstName
        lastName
        contact
        email
        role
        photo
      }
      service {
        _id
        name
        price
        duration
        description
        photo
      }
      slot_start
      slot_end
      date
      status
      message
    }
  }
`;

const FETCH_MY_APPOINTMENTS = gql`
  query myAppointments {
    myAppointments {
      _id
      user {
        _id
        firstName
        lastName
        contact
        email
        photo
      }
      employee {
        _id
        title
        firstName
        lastName
        contact
        email
        role
        photo
      }
      service {
        _id
        name
        price
        duration
        description
        photo
      }
      slot_start
      slot_end
      date
      status
      message
    }
  }
`;

const FETCH_MY_CURRENT_APPOINTMENTS = gql`
  query myCurrentAppointment {
    myCurrentAppointment {
      _id
      user {
        _id
        firstName
        lastName
        contact
        email
        photo
      }
      employee {
        _id
        title
        firstName
        lastName
        contact
        email
        role
        photo
      }
      service {
        _id
        name
        price
        duration
        description
        photo
      }
      slot_start
      slot_end
      date
      status
      message
    }
  }
`;

const FETCH_MY_APPOINTMENT_HISTORY = gql`
  query myAppointmentHistory {
    myAppointmentHistory {
      _id
      user {
        _id
        firstName
        lastName
        contact
        email
        photo
      }
      employee {
        _id
        title
        firstName
        lastName
        contact
        email
        role
        photo
      }
      service {
        _id
        name
        price
        duration
        description
        photo
      }
      slot_start
      slot_end
      date
      status
      message
    }
  }
`;

const FETCH_ALL_CATEGORIES_QUERY = gql`
  query categories {
    categories {
      _id
      name
      description
      photo
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

const FETCH_ALL_SERVICES_QUERY = gql`
  query allServices {
    allServices {
      _id
      name
      duration
      price
      photo
      description
      category {
        _id
        name
      }
      employees {
        _id
        empId
        title
        firstName
        lastName
      }
    }
  }
`;

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
  query aestheticiansReceps {
    aestheticiansReceps {
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

const FETCH_CATEGORY_QUERY = gql`
  query category($categoryId: ID!) {
    category(_id: $categoryId) {
      _id
      name
      description
      photo
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

const FETCH_SERVICES_QUERY = gql`
  query services($categoryId: ID) {
    services(categoryId: $categoryId) {
      _id
      name
      duration
      price
      description
      photo
      employees {
        _id
        empId
        title
        firstName
        lastName
      }
      category {
        _id
        name
        description
      }
    }
  }
`;

const FETCH_SINGLE_SERVICE_QUERY = gql`
  query service($serviceId: ID!) {
    service(_id: $serviceId) {
      _id
      name
      duration
      price
      description
      photo
      employees {
        _id
        title
        empId
        firstName
        lastName
        email
        contact
      }
      category {
        _id
        name
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

const FETCH_CHECKED_APPOINTMENTS = gql`
  query checkedAppointments($employeeId: ID!, $date: String!) {
    checkedAppointments(employeeId: $employeeId, date: $date) {
      _id
      date
      slot_start
      user {
        _id
        firstName
        lastName
      }
      employee {
        _id
        title
        empId
        firstName
        lastName
      }
      service {
        _id
        name
        duration
      }
    }
  }
`;

const FETCH_SINGLE_APPOINTMENT_QUERY = gql`
  query appointment($appointmentId: ID!) {
    appointment(_id: $appointmentId) {
      _id
      date
      slot_start
      status
      user {
        _id
        firstName
        lastName
      }
      employee {
        _id
        empId
        title
        firstName
        lastName
      }
      service {
        _id
        name
        duration
      }
    }
  }
`;

export {
  FETCH_USER_ACCOUNT,
  FETCH_ALL_SERVICES_QUERY,
  FETCH_ALL_EMPLOYEES_QUERY,
  FETCH_APPOINTMENTS_QUERY,
  FETCH_CHECKED_APPOINTMENTS,
  FETCH_MY_APPOINTMENTS,
  FETCH_MY_CURRENT_APPOINTMENTS,
  FETCH_MY_APPOINTMENT_HISTORY,
  FETCH_SINGLE_APPOINTMENT_QUERY,
  FETCH_ALL_CATEGORIES_QUERY,
  FETCH_CATEGORY_QUERY,
  FETCH_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
  FETCH_EMPLOYEE_QUERY,
  FETCH_EMPLOYEES_NOT_ADMIN_QUERY
};
