const UPDATE_PROFILE = () => `mutation updateProfile($data:UpdateProfileInput!){
    updateProfile(data:$data){
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

export default UPDATE_PROFILE;