const LIST_USERS = () => `query{
    listUsers{
      id
      email
      name
      phone
      spouseName
      gender
      marriageDate
      prepCost    
      last_login_at
      joined_at
    }
  }`;

export default LIST_USERS;