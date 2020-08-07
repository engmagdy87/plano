const FORGET_PASSWORD = () => `mutation forgetPassword($email:String!,$redirectLink:String!){
    forgetPassword(email: $email,redirectLink:$redirectLink)
  }`;

export default FORGET_PASSWORD;
