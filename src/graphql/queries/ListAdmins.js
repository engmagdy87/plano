const LIST_ADMINS = () => `query{
    listAdmins{
      id
      email
      name    
    }
  }`;

export default LIST_ADMINS;