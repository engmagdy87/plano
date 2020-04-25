const USER_VALIDATION = (identifier) => `query validate{
    valid: validateRegister(identifier:"${identifier}") 
  }`;

export default USER_VALIDATION;
