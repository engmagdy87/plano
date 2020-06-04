const DELETE_USER = () => `mutation deleteUser($userId:Int!){
    deleteUser(userId:$userId)
  }`;

export default DELETE_USER;
