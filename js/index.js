// Inicializamos TaskManager (sin usar require)
const taskManager = new TaskManager();

// Selectores del DOM coincidiendo con el HTML
const taskForm = document.querySelector('#taskForm');
const tareaInput = document.querySelector('#nombreTarea');
const descripcionInput = document.querySelector('#tareaDescripcion');
const fechaInput = document.querySelector('#date');
const categoriaInput = document.querySelector('#tareaCatetegoria');

// Función de validación
function validFormFieldInput() {
  const titulo = tareaInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const fecha = fechaInput.value.trim();
  const categoria = categoriaInput.value.trim();

  // Comprobar que los campos requeridos no estén vacíos
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

    console.log('Tareas guardadas en memoria:', taskManager.tasks);

    // Limpiamos el formulario
    taskForm.reset();
  });
}