const SETUP_USER = () => `mutation setupUser($data:SetupUserInput!) {
    setupUser(data:$data){
      id
      email
      name
      spouseName
      gender
      marriageDate
      prepCost 
    }
  }`;

export default SETUP_USER;
