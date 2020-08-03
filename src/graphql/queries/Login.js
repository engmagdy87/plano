const LOGIN = ({ identifier, password }) => `query login{
    login(identifier:"${identifier}",password:"${password}"){
      token
      user{
        id
        email
        name
        spouseName
        gender
        marriageDate
        prepCost 
      }
    }
  }`;

export default LOGIN;