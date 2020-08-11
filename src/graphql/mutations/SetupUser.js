const SETUP_USER = () => `mutation setupUser($data:SetupUserInput!) {
    setupUser(data:$data){
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
  }`;

export default SETUP_USER;
