const REGISTER = () => `mutation register($data:RegisterInput!) {
    register(data:$data){
      user{
        id
        email
        name
        phone
        createdAt
      }
      token
    }
  }`;

export default REGISTER;
