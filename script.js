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

//- your task to todo //
let selected = null; // Variable pour stocker l'élément sélectionné
let touchStartX, touchStartY;

draggables.forEach((draggable) => {
  // Écoutez le touchstart pour commencer le glissement
  draggable.addEventListener("touchstart", touchStart);

  // Fonction pour gérer le touchstart
  function touchStart(e) {
    e.preventDefault();
    draggable.classList.add("dragging");
    selected = e.target;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
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
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;
    selected.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Ajoutez un style pour rendre l'élément sélectionné visible pendant le déplacement
    selected.style.backgroundColor = "lightblue"; // Changez la couleur de fond selon vos préférences
  }

  // Écoutez le touchend pour la fin du glissement
  draggable.addEventListener("touchend", touchEnd);

  // Fonction pour gérer le touchend
  function touchEnd(e) {
    e.preventDefault();

    // Réinitialisez le style de l'élément sélectionné
    selected.style.backgroundColor = ""; // Rétablissez la couleur de fond par défaut
    selected.style.transform = "translate(0px, 0px)";
    draggable.classList.remove("dragging");

    todoTask.appendChild(selected);
    H2Task();
    todoH2Task();
    H2FinishTask();
    document.location.reload();
  }
});


//- todo to finished task //
// Sélectionnez les éléments glissables dans la liste à faire

let selected2 = null;
let touchStart2X, touchStart2Y;

draggablesTodo.forEach((draggable) => {
  // Écoutez le touchstart pour commencer le glissement
  draggable.addEventListener("touchstart", touchStart);

  // Fonction pour gérer le touchstart
  function touchStart(e) {
    e.preventDefault();
    draggable.classList.add("dragging");
    selected2 = e.target;
    touchStart2X = e.touches[0].clientX;
    touchStart2Y = e.touches[0].clientY;
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
    const deltaX = touchX - touchStart2X;
    const deltaY = touchY - touchStart2Y;
    selected2.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Ajoutez un style pour rendre l'élément sélectionné visible pendant le déplacement
    selected2.style.backgroundColor = "lightblue"; // Changez la couleur de fond selon vos préférences
  }

  // Écoutez le touchend pour la fin du glissement
  draggable.addEventListener("touchend", touchEnd);

  // Fonction pour gérer le touchend
  function touchEnd(e) {
    e.preventDefault();

    // Réinitialisez le style de l'élément sélectionné
    selected2.style.backgroundColor = ""; // Rétablissez la couleur de fond par défaut
    selected2.style.transform = "translate(0px, 0px)";
    draggable.classList.remove("dragging");

    // Vérifiez si l'élément a été glissé dans le conteneur de destination
    const rect = containerFinish.getBoundingClientRect();
    const dropX = e.changedTouches[0].clientX;
    const dropY = e.changedTouches[0].clientY;

    if (
      dropX >= rect.left &&
      dropX <= rect.right &&
      dropY >= rect.top &&
      dropY <= rect.bottom
    ) {
      // Si l'élément a été déposé dans le conteneur de destination, ajoutez-le à la liste des tâches terminées
      finishedTask.appendChild(selected2);

      // Exécutez les fonctions de mise à jour de l'interface utilisateur
      H2Task();
      todoH2Task();
      H2FinishTask();
    }
  }
});

//- todo to finished task //
// Sélectionnez les éléments glissables dans la liste à faire

let selected3 = null;
let touchStart3X, touchStart3Y;

draggablesFinish.forEach((draggable) => {
  // Écoutez le touchstart pour commencer le glissement
  draggable.addEventListener("touchstart", touchStart);

  // Fonction pour gérer le touchstart
  function touchStart(e) {
    e.preventDefault();
    draggable.classList.add("dragging");
    selected3 = e.target;
    touchStart3X = e.touches[0].clientX;
    touchStart3Y = e.touches[0].clientY;
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
    const deltaX = touchX - touchStart3X;
    const deltaY = touchY - touchStart3Y;
    selected3.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Ajoutez un style pour rendre l'élément sélectionné visible pendant le déplacement
    selected3.style.backgroundColor = "lightblue"; // Changez la couleur de fond selon vos préférences
  }

  // Écoutez le touchend pour la fin du glissement
  draggable.addEventListener("touchend", touchEnd);

  // Fonction pour gérer le touchend
  function touchEnd(e) {
    e.preventDefault();

    // Réinitialisez le style de l'élément sélectionné
    selected3.style.backgroundColor = ""; // Rétablissez la couleur de fond par défaut
    selected3.style.transform = "translate(0px, 0px)";
    draggable.classList.remove("dragging");

    // Vérifiez si l'élément a été glissé dans le conteneur de destination
    const rect = trashed.getBoundingClientRect();
    const dropX = e.changedTouches[0].clientX;
    const dropY = e.changedTouches[0].clientY;

    if (
      dropX >= rect.left &&
      dropX <= rect.right &&
      dropY >= rect.top &&
      dropY <= rect.bottom
    ) {
      trashed.appendChild(selected3);
      H2Task();
      todoH2Task();
      H2FinishTask();
      document.location.reload();
    }
  }
});

