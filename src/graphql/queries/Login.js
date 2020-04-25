const LOGIN = ({ identifier, password }) => `query login{
    login(identifier:"${identifier}",password:"${password}"){
      token
      user{
        id
        email
        phone
        name
      }
    }
  }`;

export default LOGIN;