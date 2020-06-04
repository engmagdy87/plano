const LOGIN_ADMIN = ({ email, password }) => `query loginAdmin{
    loginAdmin(email:"${email}",password:"${password}"){
      token
      user{
        id
        email
        name
      }
    }
  }`;

export default LOGIN_ADMIN;