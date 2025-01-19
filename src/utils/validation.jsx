export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }

  return errors;
};

export const validateAuth = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }

  if (!values.username) {
    errors.username = "Username Required";
  }
  if (!values.fullName) {
    errors.fullName = "Full names Required";
  }

  return errors;
};


export const validateAccount = (values) => {
  let errors = {};

  // Validate name
  if (!values.name) {
    errors.name = "Account name is required";
  } else if (typeof values.name !== 'string') {
    errors.name = "Account name must be a string";
  }

  // Validate type (assuming AccountType is an enum)
  if (!values.type) {
    errors.type = "Account type is required";
  }

  // Validate current balance
  if (values.currentBalance !== undefined) {
    const balance = parseFloat(values.currentBalance);
    if (isNaN(balance)) {
      errors.currentBalance = "Current balance must be a valid number";
    } 
  }

  // Validate currency
  if (!values.currency) {
    errors.currency = "Currency is required";
  } else if (typeof values.currency !== 'string') {
    errors.currency = "Currency must be a string";
  }


  return errors;
};