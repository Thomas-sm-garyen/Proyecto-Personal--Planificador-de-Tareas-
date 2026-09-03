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

  // Guardar tareas en localStorage
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);

    const currentIdStr = String(this.currentId);
    localStorage.setItem('currentId', currentIdStr);
  }

  // Cargar tareas desde localStorage al iniciar la app
  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem('currentId')) {
      const currentIdStr = localStorage.getItem('currentId');
      this.currentId = Number(currentIdStr);
    }
  }

  render() {
    const tasksList = document.querySelector('#tasksList');
    if (!tasksList) return;

    tasksList.innerHTML = '';

    this.tasks.forEach(task => {
      const taskHtml = `
        <li class="list-group-item d-flex align-items-center justify-content-between py-3" data-task-id="${task.id}">
          <div class="form-check d-flex align-items-center gap-2">
            <input class="form-check-input mt-0" type="checkbox" id="task-${task.id}">
            <label class="form-check-label mb-0" for="task-${task.id}">
              <strong>${task.name}</strong>
              <div class="text-muted small">${task.description} - ${task.dueDate}</div>
            </label>
          </div>
          <button class="btn btn-outline-danger btn-sm border-0 delete-button" title="Eliminar">
            <i class="bi bi-trash"></i>
          </button>
        </li>
      `;
      tasksList.innerHTML += taskHtml;
    });
  }
}