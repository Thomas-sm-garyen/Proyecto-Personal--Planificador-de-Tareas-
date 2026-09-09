// Inicializamos TaskManager
const taskManager = new TaskManager();

// Cargar y renderizar tareas guardadas en localStorage
taskManager.load();
taskManager.render();

// Selectores del DOM
const taskForm = document.querySelector('#taskForm');
const tareaInput = document.querySelector('#nombreTarea');
const descripcionInput = document.querySelector('#tareaDescripcion');
const fechaInput = document.querySelector('#date');
const tasksList = document.querySelector('#tasksList');

// Función de validación
function validFormFieldInput() {
  const titulo = tareaInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const fecha = fechaInput.value.trim();

  if (!titulo || !fecha) {
    alert('Por favor completa los campos obligatorios.');
    return null;
  }

  return { titulo, descripcion, fecha };
}

// Escuchador de eventos del formulario
if (taskForm) {
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = validFormFieldInput();
    if (!formData) return;

    taskManager.addTask(
      formData.titulo,
      formData.descripcion,
      formData.fecha
    );

    taskManager.save();
    taskManager.render();
    taskForm.reset();
  });
}

// Escuchador de eventos para Eliminar y Marcar como Hecha (DONE)
if (tasksList) {
  tasksList.addEventListener('change', (event) => {
    //  Marcar / Desmarcar como hecho
    if (event.target.classList.contains('mark-done-checkbox')) {
      const parentTask = event.target.closest('[data-task-id]');
      
      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        const newStatus = event.target.checked ? 'Cumplida' : 'Pendiente';
        
        // Actualiza solo la tarea seleccionada sin alterar las demás
        taskManager.updateTaskStatus(taskId, newStatus);
        taskManager.save();
        taskManager.render();
      }
    }
  });

  tasksList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-button');

    if (deleteButton) {
      const parentTask = deleteButton.closest('[data-task-id]');

      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);

        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
      }
    }
  });
}