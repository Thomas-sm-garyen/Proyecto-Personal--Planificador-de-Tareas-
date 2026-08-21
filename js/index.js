function validFormFieldInput() {

  const tareaInput = document.querySelector('#nombreTarea');
  const descripcionInput = document.querySelector('#tareaDescripcion');
  const fechaInput = document.querySelector('#date');
  const categoriaInput = document.querySelector('#tareaCategoria');
  const alertError = document.querySelector('#alertError');

  //limpiar espacios en blanco con .trim()
  const titulo = tareaInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const fecha = fechaInput.value.trim();
  const categoria = categoriaInput.value.trim();


  const task = {
    titulo,
    descripcion,
    fecha,
    categoria
  };

  return task;
}

const taskManager =  new TaskManager();
console.log(taskManager.tasks);