const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    contact: String
    email: String
    password: String
    photo: String
    token: String!
    createdAt: String
    updatedAt: String
  }
  type Appointment {
    _id: ID
    user: User
    employee: Employee
    service: Service
    slot_start: String
    slot_end: String
    duration: Int
    date: String
    status: String
    message: String
    createdAt: String
  }

  type Employee {
    _id: ID!
    empId: String!
    title: String
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    photo: String
    bio: String
    role: String
    level: Int
    password: String
    employeeToken: String
    schedule: Schedule
    services: [Service]
    createdAt: String
  }

  type Schedule {
    _id: ID!
    day: [String]!
    workStart: String!
    workLength: Int!
    breakStart: String!
    breakLength: Int!
  }

  type Category {
    _id: ID!
    name: String!
    description: String
    photo: String
    services: [Service] #list of services
    createdAt: String
  }

  type Service {
    _id: ID!
    name: String!
    price: Float
    duration: Int!
    description: String
    photo: String
    category: Category #parent: Category type
    employees: [Employee]
    createdAt: String
  }

  # INPUTS
  input AppointmentInput {
    serviceId: ID!
    employeeId: ID!
    date: String!
    slot_start: String!
    message: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input EmployeeInput {
    title: String!
    firstName: String!
    lastName: String!
    contact: String
    email: String!
    role: String!
    # photo: Upload
  }

  input ScheduleInput {
    day: [String]
    workStart: String
    workLength: Int
    breakStart: String
    breakLength: Int
  }

  input CategoryInput {
    name: String!
    description: String
    # photo: Upload
  }

  input ServiceInput {
    name: String
    price: Float
    duration: Int
    description: String
    # photo: Upload
    categoryId: ID
  }

  type Query {
    user(_id: ID!): User
    getUsers: [User]
    appointment(_id: ID!): Appointment
    appointments: [Appointment]
    appointmentsByStatus(status: String!): [Appointment]
    checkedAppointments(employeeId: ID!, date: String!): [Appointment]
    myAppointments: [Appointment]
    myCurrentAppointment: [Appointment]
    myAppointmentHistory: [Appointment]

    employee(_id: ID!): Employee
    employeeService(serviceId: ID): Employee
    employees: [Employee]
    employeesByRole(role: String!): [Employee]
    aestheticiansReceps: [Employee]

    category(_id: ID!): Category
    categories: [Category]
    service(_id: ID!): Service
    services(categoryId: ID): [Service]
    allServices: [Service]
  }

  type Mutation {
    # AUTH
    userLogin(email: String, password: String): User
    employeeLogin(empId: String!, password: String!): Employee

    # APPOINTMENTS
    createAppointment(appointmentInput: AppointmentInput): Appointment
    updateAppointment(
      serviceId: ID
      employeeId: ID
      date: String
      slot_time: String
    ): Appointment
    cancelAppointment(_id: ID!): Appointment
    cancelTheAppointment(_id: ID!): Appointment
    doneAppointment(_id: ID!): Appointment
    verifiedAppointment(_id: ID!): Appointment
    createGuestAppointment(
      firstName: String!
      lastName: String!
      email: String!
      appointmentInput: AppointmentInput
    ): Appointment

    #USERS
    register(userInput: UserInput): Boolean
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      contact: String
      email: String
    ): User
    addUserPhoto(_id: ID!, file: Upload): Boolean

    # createAdmin(adminInput: AdminInput): Admin

    # EMPLOYEES
    createEmployee(
      employeeInput: EmployeeInput
      scheduleInput: ScheduleInput
    ): Employee

    updateEmployee(
      _id: ID!
      title: String
      firstName: String
      lastName: String
      contact: String
      email: String
      bio: String
      role: String
      password: String
      oldpassword: String
      day: [String]
      workStart: String
      workLength: Int
      breakStart: String
      breakLength: Int
    ): Employee

    addEmployeePhoto(_id: ID!, file: Upload): Boolean
    deleteEmployee(_id: ID!): Boolean #admin only
    addService(employeeId: ID!, serviceId: [ID]): Employee
    removeService(employeeId: ID!, serviceId: ID!): Boolean

    #Category
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(
      _id: ID!
      name: String
      description: String
      photo: String
    ): Category
    addCategoryPhoto(_id: ID!, file: Upload): Boolean
    deleteCategory(_id: ID!): String

    #Service
    createService(serviceInput: ServiceInput): Service
    updateService(
      _id: ID!
      name: String
      price: Float
      duration: Int
      description: String
    ): Service
    deleteService(_id: ID!): Boolean
    addServicePhoto(_id: ID!, file: Upload): Boolean
  }
`;

module.exports = typeDefs;
