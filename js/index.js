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
const categoriaInput = document.querySelector('#tareaCatetegoria');
const tasksList = document.querySelector('#tasksList');

// Función de validación
function validFormFieldInput() {
  const titulo = tareaInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const fecha = fechaInput.value.trim();
  const categoria = categoriaInput.value.trim();

  if (!titulo || !fecha) {
    alert('Por favor completa los campos obligatorios.');
    return null;
  }

  return { titulo, descripcion, fecha, categoria };
}

// Escuchador de eventos del formulario
if (taskForm) {
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = validFormFieldInput();

    if (!formData) return;

    // Registramos la tarea
    taskManager.addTask(
      formData.titulo,
      formData.descripcion,
      formData.fecha
    );

    // Guardar en localStorage y actualizar la vista
    taskManager.save();
    taskManager.render();

    // Limpiamos el formulario
    taskForm.reset();
  });
}

// PASO 3: EventListener del botón Eliminar
if (tasksList) {
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