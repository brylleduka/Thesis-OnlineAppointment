import gql from "graphql-tag";

const FETCH_WALKIN_APPOINTMENT = gql`
  query walkinAppointment($appointmentId: ID!) {
    walkinAppointment(_id: $appointmentId) {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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

      slot_start
      date
      status
    }
  }
`;

const FETCH_WALKIN_APPOINTMENTS = gql`
  query walkinAppointments {
    walkinAppointments {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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
      slot_start
      date
      status
    }
  }
`;

const FETCH_CURRENT_WALKIN_APPOINTMENTS = gql`
  query currentWalkinAppointments {
    currentWalkinAppointments {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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
      slot_start
      date
      status
    }
  }
`;

const FETCH_HISTORY_WALKIN_APPOINTMENTS = gql`
  query walkinAppointmentHistory {
    walkinAppointmentHistory {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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
      slot_start
      date
      status
    }
  }
`;

const FETCH_WALKIN_APPOINTMENT_STATUS = gql`
  query walkinAppointmentsByStatus($status: String!) {
    walkinAppointmentsByStatus(status: $status) {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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
      slot_start
      date
      status
    }
  }
`;

const FETCH_WALKIN_CHECKED_APPOINTMENTS = gql`
  query checkedWalkinAppointments($employeeId: ID!, $date: String!) {
    checkedWalkinAppointments(employeeId: $employeeId, date: $date) {
      _id
      walkinClient {
        _id
        firstName
        lastName
        email
        contact
        dateOfBirth
        address
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
      slot_start
      date
      status
    }
  }
`;

export {
  FETCH_CURRENT_WALKIN_APPOINTMENTS,
  FETCH_HISTORY_WALKIN_APPOINTMENTS,
  FETCH_WALKIN_APPOINTMENT,
  FETCH_WALKIN_APPOINTMENTS,
  FETCH_WALKIN_APPOINTMENT_STATUS,
  FETCH_WALKIN_CHECKED_APPOINTMENTS,
};
