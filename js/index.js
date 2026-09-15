// Inicializamos TaskManager
const taskManager = new TaskManager();

// Cargar y renderizar tareas desde el backend al iniciar la app
document.addEventListener('DOMContentLoaded', async () => {
  await taskManager.load();
  taskManager.render();
});

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
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = validFormFieldInput();
    if (!formData) return;

    // Se envía la petición POST al backend
    await taskManager.addTask(
      formData.titulo,
      formData.descripcion,
      formData.fecha
    );

    taskManager.render();
    taskForm.reset();
  });
}

// Escuchador de eventos para Eliminar y Marcar como Hecha 
if (tasksList) {
  // Marcar / Desmarcar como hecho
  tasksList.addEventListener('change', async (event) => {
    if (event.target.classList.contains('mark-done-checkbox')) {
      const parentTask = event.target.closest('[data-task-id]');

      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        const newStatus = event.target.checked ? 'Completada' : 'Pendiente';

        // Actualización vía PUT al backend
        await taskManager.updateTaskStatus(taskId, newStatus);
        taskManager.render();
      }
    }
  });

  // Eliminar tarea
  tasksList.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.delete-button');

    if (deleteButton) {
      const parentTask = deleteButton.closest('[data-task-id]');

      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);

        // Eliminación vía DELETE al backend
        await taskManager.deleteTask(taskId);
        taskManager.render();
      }
    }
  });
}