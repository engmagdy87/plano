const REGISTER = () => `mutation register($data:RegisterInput!) {
    register(data:$data){
      user{
        id
        email
        name
        createdAt
      }
      token
    }
  }`;

export default REGISTER;
