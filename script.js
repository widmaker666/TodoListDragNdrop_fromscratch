//* Local Storage //

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

    tasksList.innerHTML += `<div  class="tasks-div">
    <h2 draggable="true" id="h2">${t}</h2>
    </div>`;
  });
}

displayTask();

//* Drag and drop //

const draggables = document.querySelectorAll("#h2")
const divTask = document.querySelector(".tasks")
const containerTodo = document.querySelector(".todo-task")
const containerFinish = document.querySelector(".f-tasks")

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart)

  function dragStart(){
    draggable.classList.add("dragging")
    console.log('fuck')
  }

  draggable.addEventListener("dragend", dragEnd)
  function dragEnd(){
    draggable.classList.remove('dragging')
    console.log('damnit')
  }
})

divTask.addEventListener('dragover', dragOver)
function dragOver(e){
  e.preventDefault()
  const draggable = document.querySelector('.dragging')
  
}

