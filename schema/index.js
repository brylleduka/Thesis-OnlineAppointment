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
    dateOfBirth: String
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
    note: String
    reschedule: Reschedule
    createdAt: String
    updatedAt: String
  }

  type Reschedule {
    appointmentId: ID
    new: Boolean
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
    dateOfBirth: String
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

  type Inquiry {
    _id: ID!
    name: String
    email: String
    to: String
    subject: String
    message: String
    reply: String
    createdAt: String
    updatedAt: String
  }
  # MODIFY
  type CMS {
    _id: ID
    photo: String
    section: String
    headline: String
    paragraph: String
  }

  type CMSAbout {
    _id: ID
    title: String
    subtitle: String
    bgimage: String
    mparagraph: String
    mphoto: [String]
    sparagraph: String
    sphoto: [String]
  }
  #

  type HomeCMS {
    _id: ID
    title: String
    subtitle: String
    paragraph: String
    content: [HomeContent]
    sectionName: String
  }

  type HomeContent {
    _id: ID
    title: String
    subtitle: String
    paragraph: String
    bgImg: String
    bgColor: String
    position: String
    dark: Boolean
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

  input HomeContentInput {
    ctitle: String
    csubtitle: String
    cparagraph: String
    bgImg: String
    bgColor: String
    position: String
    dark: Boolean
  }

  type Query {
    user(_id: ID!): User
    getUsers: [User]
    appointment(_id: ID!): Appointment
    appointments: [Appointment]
    appointmentsByStatus(status: String!): [Appointment]
    checkedAppointments(employeeId: ID!, date: String!): [Appointment]
    currentAppointments: [Appointment]
    appointmentHistory: [Appointment]
    myAppointments: [Appointment]
    myCurrentAppointment: [Appointment]
    myAppointmentHistory: [Appointment]

    employee(_id: ID!): Employee
    employeeService(serviceId: ID): Employee
    employees: [Employee]
    employeesByRole(role: String!): [Employee]
    aestheticiansReceps(limit: Int): [Employee]

    category(_id: ID!): Category
    categories: [Category]
    service(_id: ID!): Service
    services(categoryId: ID): [Service]
    allServices: [Service]

    contentManagements(section: String): [CMS]

    inquiries: [Inquiry]
    inquiriesRead(read: Boolean): [Inquiry]
    inquiry(_id: ID!): Inquiry

    homeCMS(sectionName: String): HomeCMS
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
    cancelAppointment(_id: ID!, note: String): Appointment
    cancelTheAppointment(_id: ID!, note: String): Appointment
    doneAppointment(_id: ID!): Appointment
    verifiedAppointment(_id: ID!): Appointment
    createGuestAppointment(
      firstName: String!
      lastName: String!
      email: String!
      contact: String
      appointmentInput: AppointmentInput
    ): Appointment

    createUserExistAppointment(
      userId: ID!
      appointmentInput: AppointmentInput
    ): Appointment

    reschedAppointment(
      _id: ID!
      status: String
      isAdmin: Boolean
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
      dateOfBirth: String
      password: String
      oldpassword: String
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
      dateOfBirth: String
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
    # INQ
    sendInquiry(
      name: String
      email: String
      to: String
      subject: String
      message: String
    ): Inquiry
    readInquiry(_id: ID): Boolean
    replyInquiry(_id: ID!, email: String, message: String): Inquiry
    # CMS
    addShowcase(file: Upload): Boolean
    deleteShowcase(_id: ID!): Boolean
    updateShowcase(
      _id: ID!
      fileName: String
      headline: String
      paragraph: String
    ): CMS

    #CMS ABOUT
    addCMSAboutPhoto(bgimage: Upload): Boolean
    addCMSAboutTitle(title: String, subtitle: String): CMSAbout
    updateCMSAbout(
      _id: ID!
      title: String
      subtitle: String
      bgimage: Upload
      mparagraph: String
      mphoto: Upload
      sparagraph: String
      sphoto: Upload
    ): CMSAbout

    # CMSHOME
    # SHOWCASE
    addNewShowCase(
      title: String
      subtitle: String
      paragraph: String
      inputHomeContent: HomeContentInput
    ): HomeCMS
  }
`;

module.exports = typeDefs;
