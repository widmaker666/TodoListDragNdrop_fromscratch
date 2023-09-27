//* Local Storage //

//! Constants //
const formTasks = document.querySelector(".form-task");
const tasksList = document.querySelector(".task-array-container");

const divTask = document.querySelector(".task-array-container");

const todoTask = document.querySelector(".t-tasks");
const finishedTask = document.querySelector(".f-tasks");

const containerTodo = document.querySelector(".todo-task");
const containerFinish = document.querySelector(".finish-task");
//! Constants DOM //

//! Function
formTasks.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const inputTasks = {
    title: taskInput.value,
  };
  addTask(inputTasks);

  document.location.reload();
}

//-Your Tasks list //
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

  displayArray.forEach((task) => {
    tasksList.innerHTML += taskInnerHtml(task.title);
  });

  function taskInnerHtml(taskTitle) {
    const div = document.createElement("div");
    div.className = "tasks-div";

    const h2 = document.createElement("h2");
    h2.draggable = true;
    h2.id = "h2";
    h2.className = "h2";
    h2.textContent = taskTitle;

    div.appendChild(h2);
    return div.outerHTML; // Retourner la représentation HTML de la tâche
  }
}
displayTask();

//- Todo Tasks list //
function displayTaskTodo() {
  let displayArrayTodo = [];

  if (localStorage.getItem("TodoTasks")) {
    displayArrayTodo = JSON.parse(localStorage.getItem("TodoTasks"));
  }
  console.log(displayArrayTodo);

  displayArrayTodo.map((task) => {
    todoTask.innerHTML += taskTodoInnerHtml(task);
    console.log(task);
  });

  function taskTodoInnerHtml(task) {
    const h2 = document.createElement("h2");
    h2.draggable = true;
    h2.id = "todo-h2";
    h2.className = "h2";
    h2.textContent = task;

    todoTask.appendChild(h2);
    console.log(h2);
    return h2.outerHTML;
  }
}
displayTaskTodo();

//- Finished Tasks list //
function displayTaskFinish() {
  let displayArrayFinish = [];

  if (localStorage.getItem("FinishedTasks")) {
    displayArrayFinish = JSON.parse(localStorage.getItem("FinishedTasks"));
  }
  console.log(displayArrayFinish);

  displayArrayFinish.map((task) => {
    finishedTask.innerHTML += taskFinishInnerHtml(task);
    console.log(task);
  });

  function taskFinishInnerHtml(task) {
    const h2 = document.createElement("h2");
    h2.draggable = true;
    h2.id = "finish-h2";
    h2.className = "h2";
    h2.textContent = task;

    finishedTask.appendChild(h2);
    console.log(h2);
    return h2.outerHTML;
  }
}
displayTaskFinish();

//* Drag and drop //
//! At your tasks to Todo tasks //
const draggables = document.querySelectorAll(".tasks-div");
const draggablesTodo = document.querySelectorAll("#todo-h2");
const draggablesFinish = document.querySelectorAll("#finish-h2");

//! Functions

//- Todo Tasks Add New localstorage //
function todoH2Task() {
  const arrayH2 = todoTask.querySelectorAll(".h2");
  const h2List = Array.from(arrayH2);
  const h2Map = h2List.map((h) => h.textContent);

  localStorage.setItem("TodoTasks", JSON.stringify(h2Map));
}
function H2Task() {
  const arrayH2 = divTask.querySelectorAll(".h2");
  const h2List = Array.from(arrayH2);
  const h2Map = h2List.map((h) => h.textContent);

  localStorage.setItem("tasks", JSON.stringify(h2Map));
}
function H2FinishTask() {
  const arrayH2 = finishedTask.querySelectorAll(".h2");
  const h2List = Array.from(arrayH2);
  const h2Map = h2List.map((h) => h.textContent);

  localStorage.setItem("FinishedTasks", JSON.stringify(h2Map));
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart);

  // Dragstart = Begin to click and drag
  function dragStart(e) {
    draggable.classList.add("dragging");
    //Select the right target with this
    let selected = e.target;
    console.log("fuck");

    // Dragover = When you keep your dragstart and move
    containerTodo.addEventListener("dragover", dragOver);
    function dragOver(e) {
      e.preventDefault();
      console.log("first");
    }

    // Drop = when you put element in your new div to an appendChild
    containerTodo.addEventListener("drop", dropTask);
    function dropTask(e) {
      e.preventDefault();
      todoTask.appendChild(selected);
      H2Task();
      todoH2Task();
      H2FinishTask();
      document.location.reload();
    }
  }
});

//! At Todo tasks to Finished tasks //

draggablesTodo.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart);

  // Dragstart = Begin to click and drag
  function dragStart(e) {
    draggable.classList.add("dragging");
    //Select the right target with this
    let selected = e.target;
    console.log("fuck");

    // Dragover = When you keep your dragstart and move
    containerFinish.addEventListener("dragover", dragOver);
    function dragOver(e) {
      e.preventDefault();
      console.log("first");
    }

    // Drop = when you put element in your new div to an appendChild
    containerFinish.addEventListener("drop", dropTask);
    function dropTask(e) {
      e.preventDefault();
      finishedTask.appendChild(selected);
      H2Task();
      todoH2Task();
      H2FinishTask();
      document.location.reload();
    }
  }
});

//! At finished tasks to Trash //
draggablesFinish.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart);

  // Dragstart = Begin to click and drag
  function dragStart(e) {
    draggable.classList.add("dragging");
    //Select the right target with this
    let selected = e.target;
    console.log("fuck");

    // Dragover = When you keep your dragstart and move
    trashed.addEventListener("dragover", dragOver);
    function dragOver(e) {
      e.preventDefault();
      console.log("first");
    }

    // Drop = when you put element in your new div to an appendChild
    trashed.addEventListener("drop", dropTask);
    function dropTask(e) {
      e.preventDefault();
      trashed.appendChild(selected);
      H2Task();
      todoH2Task();
      H2FinishTask();
      document.location.reload();
    }
  }
});


//* Touchstart pour Telephone //

draggables.forEach((draggable) => {
  let selected; // Variable pour stocker l'élément sélectionné

  // Écoutez le touchstart pour commencer le glissement
  draggable.addEventListener("touchstart", touchStart);

  // Fonction pour gérer le touchstart
  function touchStart(e) {
    e.preventDefault();
    draggable.classList.add("dragging");
    selected = e.target;
  }

  // Écoutez le touchmove pour le déplacement
  draggable.addEventListener("touchmove", touchMove);

  // Fonction pour gérer le touchmove
  function touchMove(e) {
    e.preventDefault();
    
    // Obtenez les coordonnées du touchmove
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    // Mettez à jour la position de l'élément sélectionné
    selected.style.transform = `translate(${touchX}px, ${touchY}px)`;
  }

  // Écoutez le touchend pour la fin du glissement
  draggable.addEventListener("touchend", touchEnd);

  // Fonction pour gérer le touchend
  function touchEnd(e) {
    e.preventDefault();
    draggable.classList.remove("dragging");
    todoTask.appendChild(selected);
    H2Task();
    todoH2Task();
    H2FinishTask();
    document.location.reload();
  }
});

