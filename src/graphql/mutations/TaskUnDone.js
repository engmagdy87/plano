const TASK_UNDONE = () => `mutation TaskUnDone($taskId:Int!){
    taskUnDone(taskId:$taskId)
  }`;

export default TASK_UNDONE;
