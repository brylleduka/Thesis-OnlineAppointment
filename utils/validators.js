const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const regexNum = /^\d+$/;

const validateUserCreateInput = (
  firstName,
  lastName,
  email,
  contact,
  password,
  confirmPassword
) => {
  let errors = {};

  // if (
  //   firstName &&
  //   firstName.trim() === "" &&
  //   lastName &&
  //   lastName.trim() === "" &&
  //   email &&
  //   email.trim() === "" &&
  //   password &&
  //   password === "" &&
  //   confirmPassword &&
  //   confirmPassword === ""
  // ) {
  //   errors.fullEmpty = "Fields must not be empty";
  // } else {
  if (firstName && firstName.trim() === "") {
    errors.firstName = "First name must not be empty";
  }

  if (lastName && lastName.trim() === "") {
    errors.lastName = "Last name must not be empty";
  }

  if (email && email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (email && !email.match(regex)) {
    errors.emailX = "Email must be a valid  email address";
  }

  if (contact && contact.length > 10) {
    errors.contactLength = "Please input your 10 digits of your contact number";
  }

  if (contact && !contact.match(regexNum)) {
    errors.contact = "Contact must contain numbers only";
  }

  if (password && password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  if (confirmPassword && confirmPassword.trim() === "") {
    errors.confirmPasswordEmpty = "Password must not be empty";
  }

  if (password && password.length <= 6 && password.length > 1) {
    errors.pwdShort = "Password must be greater than six characters";
  }

  if ((password && password) !== (confirmPassword && confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateUserLoginInput = (email, password) => {
  const errors = {};

  if (email && email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (email && !email.match(regex)) {
    errors.emailX = "Email must be a valid Address";
  }

  if (password && password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// ADMIN
const validateEmployeeLoginInput = (empId, password) => {
  const errors = {};

  if (empId.trim() === "") {
    errors.empId = "Employee ID must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//New Employee Validate
const validateEmployeeInput = (empId, firstName, lastName, email, role) => {
  let errors = {};

  if (empId.trim() === "") {
    errors.empId = "Employee ID must not be empty";
  }
  if (firstName.trim() === "") {
    errors.firstName = "First Name must not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Last Name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (!email.match(regex)) {
    errors.emailX = "Email must be a valid Address";
  }

  if (role.trim() === "") {
    errors.role = "Role must not be selected";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//New Employee Validate
const validateEmployeePersonal = (firstName, lastName, email) => {
  let errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "First Name must not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Last Name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateServiceInput = (name, duration, price) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Service name must not be empty";
  }

  if (duration.trim() === "") {
    errors.duration = "Service Duration not be empty";
  }

  if (!price.match(regexNum)) {
    errors.numOnly = "Must contain digits only";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateInquiry = (email, message, subject) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (!email.match(regex)) {
    errors.emailX = "Email must be a valid Address";
  }

  if (message.trim() === "") {
    errors.message = "Message must not be empty";
  }
  if (subject.trim() === "") {
    errors.subject = "Subject must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateUserCreateInput,
  validateUserLoginInput,
  validateEmployeeLoginInput,
  validateEmployeeInput,
  validateEmployeePersonal,
  validateServiceInput,
  validateInquiry,
};
