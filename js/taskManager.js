class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate) {
    this.currentId++;

    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: 'PORHACER'
    });
  }


  deleteTask(taskId) {
      const newTasks = [];

      for (let task of this.tasks) {
          if (task.id !== taskId) {
              newTasks.push(task);
         }
      }
    this.tasks = newTasks;
  } 

  
}

