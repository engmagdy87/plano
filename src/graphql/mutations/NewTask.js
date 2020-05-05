const NEW_TASK = () => `mutation newTask($data:CreateTaskInput!){
    createTask(data: $data){
        id
        title
        cost
        done
        dueDate
        status
        category{
          id
          title
        }
    }
  }`;

export default NEW_TASK;
