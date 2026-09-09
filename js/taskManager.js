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
      status: 'Pendiente'
    });
  }

  getTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTaskStatus(taskId, status) {
    const task = this.getTaskById(taskId);
    if (task) {
      task.status = status;
    }
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', String(this.currentId));
  }

  load() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (localStorage.getItem('currentId')) {
      this.currentId = Number(localStorage.getItem('currentId'));
    }
  }

  updateCounter() {
    const counterElement = document.querySelector('#taskCounter');
    if (!counterElement) return;

    // Filtra las tareas que no están completadas
    const pendingTasks = this.tasks.filter(task => task.status !== 'Cumplida');
    const count = pendingTasks.length;

    if (count === 0) {
      counterElement.className = 'badge bg-success-subtle text-success border border-success-subtle';
      counterElement.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>¡Sin tareas pendientes!';
    } else {
      counterElement.className = 'badge bg-secondary';
      counterElement.textContent = `${count} ${count === 1 ? 'pendiente' : 'pendientes'}`;
    }
  }

  render() {
    const tasksList = document.querySelector('#tasksList');
    if (!tasksList) return;

    tasksList.innerHTML = '';

    this.tasks.forEach(task => {
      const isDone = task.status === 'Cumplida';

      const taskHtml = `
        <li class="list-group-item d-flex align-items-center justify-content-between py-3 ${isDone ? 'bg-dark-subtle' : ''}" data-task-id="${task.id}">
          <div class="form-check d-flex align-items-center gap-2">
            <input class="form-check-input mt-0 mark-done-checkbox" type="checkbox" id="task-${task.id}" ${isDone ? 'checked' : ''}>
            <label class="form-check-label mb-0 ${isDone ? 'text-decoration-line-through text-muted' : ''}" for="task-${task.id}">
              <strong>${task.name}</strong> <span class="badge ${isDone ? 'bg-success' : 'bg-warning text-dark'} ms-2">${task.status}</span>
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

    // Actualiza el contador dinámicamente cada vez que se renderiza
    this.updateCounter();
  }
}