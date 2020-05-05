const UPDATE_TASK = () => `mutation updateTask($taskId:Int!,$data:UpdateTaskInput!){
    updateTask(taskId:$taskId,data: $data){      
      cost
      done
      dueDate
      id
      status
      title
      note
      category{
        id
        title
      }
    }
  }`;

export default UPDATE_TASK;