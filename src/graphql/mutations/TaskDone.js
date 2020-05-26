const TASK_DONE = () => `mutation TaskDone($taskId:Int!){
    taskDone(taskId:$taskId)
  }`;

export default TASK_DONE;
