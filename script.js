//! Local Storage //

//! Constants //

//! Constants DOM //
const formTasks = document.querySelector(".form-task");
const tasksList = document.querySelector(".task-array-container");

//! Function
formTasks.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const inputTasks = {
    title: taskInput.value,
    id: Date.now(),
  };
  addTask(inputTasks);

  document.location.reload();
}

function addTask(task) {
  let arrayTask = [];

  if (localStorage.getItem("tasks")) {
    arrayTask = JSON.parse(localStorage.getItem("tasks"));
  }
  arrayTask.push(task);
  localStorage.setItem("tasks", JSON.stringify(arrayTask));
}

function displayTask() {
  let displayArray = [];

  if (localStorage.getItem("tasks")) {
    displayArray = JSON.parse(localStorage.getItem("tasks"));
  }

  displayArray.map((tasks) => {
    const t = tasks.title;    

    tasksList.innerHTML += `<div draggable="true" class="tasks-div">
    <h2 id="h2">${t}</h2>
    </div>`;
  });
}

displayTask();



