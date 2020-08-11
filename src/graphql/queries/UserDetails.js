const USER_DETAILS = (userId) => `query userDetails{
    userDetails(userId:${userId}){
        id
        email
        name
        spouseName
        gender
        marriageDate
        prepCost    
        status      
    }
  }`;

export default USER_DETAILS;