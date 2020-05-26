const ORDER_TASKS = () => `mutation orderTasksById($categoryId:Int!,$currentOrder:[Int!]!,$newOrder:[Int!]!){
    orderTasksById(categoryId:$categoryId,currentOrder: $currentOrder,newOrder:$newOrder){
      count
    }
  }`;

export default ORDER_TASKS;
