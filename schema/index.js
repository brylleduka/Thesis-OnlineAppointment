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
    active: Boolean
    password: String
    employeeToken: String
    schedule: Schedule
    categoryServices: [Category]
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
    active: Boolean
    services: [Service] #list of services
    employees: [Employee]
    createdAt: String
    updatedAt: String
  }

  type Service {
    _id: ID!
    name: String!
    price: Float
    duration: Int!
    description: String
    photo: String
    active: Boolean
    category: Category #parent: Category type
    createdAt: String
    updatedAt: String
  }

  type Inquiry {
    _id: ID!
    name: String
    email: String
    to: String
    subject: String
    message: String
    reply: String
    read: Boolean
    createdAt: String
    updatedAt: String
  }
  # Testimonial
  type Testimonial {
    _id: ID!
    rating: Int
    message: String!
    view: Boolean
    user: User
    createdAt: String
    updatedAt: String
  }
  type Gallery {
    _id: ID!
    title: String
    active: Boolean
    photos: [GalleryPhoto]
    createdAt: String
    updatedAt: String
  }

  type GalleryPhoto {
    _id: ID
    name: String
    caption: String
    src: String
    height: Int
    width: Int
  }

  #CMS

  type HomeCMS {
    _id: ID
    title: String
    subtitle: String
    paragraph: String
    bgImg: String
    bgColor: String
    dark: Boolean
    grid: Int
    alt: Boolean
    sectionName: String
  }

  type ShowcaseCMS {
    _id: ID
    sectionName: String
    content: [ShowcaseContent]
  }

  type ShowcaseContent {
    _id: ID
    title: String
    subtitle: String
    paragraph: String
    bgImg: String
    bgColor: String
    position: String
    dark: Boolean
  }

  type AboutCMS {
    _id: ID
    title: String
    subtitle: String
    paragraph: String
    dark: Boolean
    overlay: Boolean
    bgImg: String
    bgColor: String
    story: Story
    missionvision: MissionVision
  }

  type Story {
    title: String
    subtitle: String
    paragraph: String
    photo: String
    alt: Boolean
  }

  type MissionVision {
    photo: String
    alt: Boolean
    mission: Mission
    vision: Vision
  }

  type Mission {
    title: String
    subtitle: String
    paragraph: String
  }

  type Vision {
    title: String
    subtitle: String
    paragraph: String
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

  input TestimonialInput {
    rating: Int
    message: String
  }

  input ShowcaseContentInput {
    title: String
    subtitle: String
    paragraph: String
    bgImg: Upload
    bgColor: String
    position: String
    dark: Boolean
  }

  input HomeContentInput {
    title: String
    subtitle: String
    paragraph: String
    bgImg: Upload
    bgColor: String
    position: String
    grid: Int
    dark: Boolean
    alt: Boolean
  }

  input AboutInput {
    title: String
    subtitle: String
    paragraph: String
    bgImg: Upload
    bgColor: String
    dark: Boolean
    overlay: Boolean
  }

  input StoryInput {
    title: String
    subtitle: String
    paragraph: String
    photo: Upload
    alt: Boolean
  }

  input MissionVisionInput {
    mtitle: String
    msubtitle: String
    mparagraph: String
    vtitle: String
    vsubtitle: String
    vparagraph: String
    photo: Upload
    alt: Boolean
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
    # EMPLOYEE
    employee(_id: ID!): Employee
    employeeService(serviceId: ID): Employee
    employees(active: Boolean): [Employee]
    employeesByRole(role: String!, active: Boolean): [Employee]
    aestheticiansReceps(limit: Int, active: Boolean): [Employee]
    # SERVICE
    category(_id: ID!): Category
    categories(active: Boolean): [Category]
    service(_id: ID!): Service
    services(categoryId: ID, active: Boolean): [Service]
    allServices(active: Boolean): [Service]
    # INQ
    inquiries: [Inquiry]
    inquiriesRead(read: Boolean): [Inquiry]
    inquiry(_id: ID!): Inquiry
    # Testimonial
    testimonials(active: Boolean): [Testimonial]
    testimonial(_id: ID!): Testimonial
    testimonialsView(limit: Int): [Testimonial]
    userTestimonial(userId: ID): Testimonial
    # Gallery
    galleries(active: Boolean): [Gallery]
    gallery(_id: ID!, active: Boolean): Gallery

    # CMS
    showcaseCMS(sectionName: String): ShowcaseCMS
    homeCMS(sectionName: String): HomeCMS
    # CMS ABOUT
    aboutUsCMS(contentName: String): AboutCMS
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
      empId: String
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

    updatePersonalEmployee(
      _id: ID!
      title: String
      firstName: String
      lastName: String
      contact: String
      email: String
      bio: String
      dateOfBirth: String
    ): Employee

    updateAccountEmployee(_id: ID!, emprole: String, emplevel: Int): Employee
    updateSecurityEmployee(
      _id: ID!
      password: String
      oldpassword: String
    ): Employee
    updateSchedule(
      _id: ID!
      day: [String]
      dateOfBirth: String
      workStart: String
      workLength: Int
      breakStart: String
      breakLength: Int
    ): Employee

    addEmployeePhoto(_id: ID!, file: Upload): Boolean
    archiveEmployee(_id: ID!): Employee
    deleteEmployee(_id: ID!): Boolean #admin only
    addService(employeeId: ID!, categoryId: [ID]): Employee
    removeService(employeeId: ID!, categoryId: ID!): Employee

    #Category
    createCategory(categoryInput: CategoryInput): Category
    updateCategory(
      _id: ID!
      name: String
      description: String
      photo: String
    ): Category
    addCategoryPhoto(_id: ID!, file: Upload): Boolean
    archivedCategory(_id: ID!): Boolean
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
    archivedService(_id: ID!): Boolean
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

    # Testimonial
    addTestimonial(inputTestimonial: TestimonialInput): Testimonial
    toggleTestimonial(_id: ID!): Testimonial
    updateTestimonial(_id: ID!, rating: Int, message: String): Testimonial
    archiveTestimonial(_id: ID!): Boolean
    deleteTestimonial(_id: ID!): Boolean

    # Gallery
    addGallery(title: String): Gallery
    addGalleryPhoto(_id: ID!, caption: String, image: Upload): Gallery
    archiveGalleryPhoto(active: Boolean): Gallery
    deleteGalleryPhoto(_id: ID!): Gallery

    # CMSHOME
    # SHOWCASE
    addNewShowCase(inputShowcaseContent: ShowcaseContentInput): ShowcaseCMS
    updateShowcase(
      showcaseId: ID!
      inputShowcaseContent: ShowcaseContentInput
    ): ShowcaseCMS
    removeShowcase(showcaseId: ID!): Boolean

    #AboutSection
    updateAboutSection(sectionName: String!): HomeCMS
    # CATEGORY SECTION
    updateHomeSection(
      sectionName: String
      inputHomeContent: HomeContentInput
    ): HomeCMS

    #CMSABOUT
    updateAboutUs(inputAbout: AboutInput): AboutCMS
    updateStory(inputStory: StoryInput): AboutCMS
    updateMission(inputMissionVision: MissionVisionInput): AboutCMS
  }
`;

module.exports = typeDefs;
