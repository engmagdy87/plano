const LIST_USERS = () => `query{
    listUsers{
      id
      email
      name
      spouseName
      gender
      marriageDate
      prepCost    
      last_login_at
      joined_at
      status
    }
  }`;

export default LIST_USERS;