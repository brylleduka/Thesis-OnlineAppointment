import gql from "graphql-tag";
// APPOINTMENT

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
      date
      status
      # online
      # appointType
      message
      note
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
      date
      status
      message
      note
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
      date
      status
      message
      note
      reschedule {
        appointmentId
        new
      }
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
      date
      status
      message
      note
      reschedule {
        appointmentId
        new
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
      message
      note
      reschedule {
        appointmentId
        new
      }
      user {
        _id
        firstName
        lastName
        email
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

const FETCH_CURRENT_APPOINTMENTS = gql`
  query currentAppointments {
    currentAppointments {
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
      date
      status
      message
      note
    }
  }
`;

const FETCH_HISTORY_APPOINTMENTS = gql`
  query appointmentHistory {
    appointmentHistory {
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
      date
      status
      message
      note
    }
  }
`;

const FETCH_APPOINTMENT_STATUS = gql`
  query appointmentsByStatus($status: String!) {
    appointmentsByStatus(status: $status) {
      _id
      user {
        _id
        firstName
        lastName
      }
      employee {
        _id
        title
        firstName
        lastName
      }
      service {
        _id
        name
        price
        duration
      }
      slot_start
      date
      status
      message
      note
    }
  }
`;

// END-APPOINTMENTS

export {
  FETCH_APPOINTMENTS_QUERY,
  FETCH_CHECKED_APPOINTMENTS,
  FETCH_MY_APPOINTMENTS,
  FETCH_MY_CURRENT_APPOINTMENTS,
  FETCH_MY_APPOINTMENT_HISTORY,
  FETCH_SINGLE_APPOINTMENT_QUERY,
  FETCH_CURRENT_APPOINTMENTS,
  FETCH_HISTORY_APPOINTMENTS,
  FETCH_APPOINTMENT_STATUS,
};
