const RESET_PASSWORD = () => `mutation resetPassword($hash:String!,$password:String!,$confirmPassword:String!){
    resetPassword(hash: $hash,password:$password,confirmPassword:$confirmPassword)
  }`;

export default RESET_PASSWORD;
