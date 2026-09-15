class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // 1. Cargar tareas desde el Backend (GET)
  async load() {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      if (response.ok) {
        this.tasks = await response.json();
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  }

  // 2. Guardar una nueva tarea en la BD (POST)
  async addTask(name, description, dueDate, status = 'Pendiente') {
    const newTask = {
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    };

    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (response.ok) {
        await this.load(); // Recarga las tareas desde la BD
      }
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  }

  // Obtener tarea localmente por ID
  getTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  // 3. Actualizar estado de una tarea (PUT)
  async updateTaskStatus(taskId, status) {
    const task = this.getTaskById(taskId);
    if (!task) return;

    const updatedTask = {
      ...task,
      status: status
    };

    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      if (response.ok) {
        await this.load();
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  }

  // 4. Eliminar tarea de la BD (DELETE)
  async deleteTask(taskId) {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await this.load();
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  // Actualizar el contador dinámico de la interfaz
  updateCounter() {
    const counterElement = document.querySelector('#taskCounter');
    if (!counterElement) return;

    // Filtra las tareas que no están completadas 
    const pendingTasks = this.tasks.filter(
      task => task.status !== 'Completada' && task.status !== 'Cumplida'
    );
    const count = pendingTasks.length;

    if (count === 0) {
      counterElement.className =
        'badge bg-success-subtle text-success border border-success-subtle';
      counterElement.innerHTML =
        '<i class="bi bi-check-circle-fill me-1"></i>¡Sin tareas pendientes!';
    } else {
      counterElement.className = 'badge bg-secondary';
      counterElement.textContent = `${count} ${count === 1 ? 'pendiente' : 'pendientes'}`;
    }
  }

  // Renderizar la lista en el HTML
  render() {
    const tasksList = document.querySelector('#tasksList');
    if (!tasksList) return;

    tasksList.innerHTML = '';

    this.tasks.forEach(task => {
      const isDone = task.status === 'Completada' || task.status === 'Cumplida';

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

    this.updateCounter();
  }
}