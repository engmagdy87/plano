const LOGIN_WITH_FACEBOOK = () => `mutation facebookAuth($email:String!,$facebookId:String!){
    facebookAuth(email: $email,facebookId:$facebookId){
      token
      user{
        id
        email
        name
        spouseName
        gender
        marriageDate
        prepCost 
        facebookId
        googleId
      }
    }
  }`;

export default LOGIN_WITH_FACEBOOK;
