//! Local Storage //
const formTasks = document.querySelector(".form-task");
const localTasks = JSON.parse(localStorage.getItem("tasks"))

formTasks.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();  

  const todo = {
    id: Date.now(),
    task: taskInput.value,
    completed: false,
  };
 
  localStorage.setItem("tasks", JSON.stringify(todo));
  document.location.reload()  
}

h2.textContent = `${localTasks.task}`

//- Il faut que je puisse maintenant rentrer mes infos du local storage ds un tableau puis ensuite les faire sortir comme une div + h2 comme ds le html ! 




