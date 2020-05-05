const REMOVE_TASK = () => `mutation removeTask($taskId: Int!) {
    removeTask(taskId: $taskId)
  }`;

export default REMOVE_TASK;
