const CHANGE_PASSWORD = () => `mutation changePassword($password:String!,$confirmPassword:String!){
    changePassword(password: $password,confirmPassword:$confirmPassword)
  }`;

export default CHANGE_PASSWORD;
