// Selecting elements
const inputTask = document.querySelector("#input-item");
const btnSubmit = document.querySelector(".btn-submit");
const taskList = document.querySelector(".task-list");

////////////////////////////////////////
///////////////// Functions ////////////

// 1. Add uncheck tasks in LS
function addUncheckTaskInLS(uncheckTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(uncheckTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

////////////////////////////////////
// 2. Add check tasks in LS
function addCheckTaskInLS(checkTask) {
  let completeTasks;
  if (localStorage.getItem("completeTasks") === null) {
    completeTasks = [];
  } else {
    completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
  }
  completeTasks.push(checkTask);
  localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
}

////////////////////////////////
// 3. Delete uncheck task from LS
function delUncheckTaskInLS(uncheckTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (task === uncheckTask) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

///////////////////////////////////////
// 4. Delete check task from LS
function delCheckTaskInLS(checkTask) {
  let completeTasks;
  if (localStorage.getItem("completeTasks") === null) {
    completeTasks = [];
  } else {
    completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
  }
  completeTasks.forEach((task, index) => {
    if (task === checkTask) {
      completeTasks.splice(index, 1);
    }
  });
  localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
}

/////////////////////////////////////////////////
// 5. Display uncheck tasks in task list
function displayUncheckTaskInTaskList(uncheckTask) {
  // Create li
  const li = document.createElement("li");
  // Add classes to li
  li.classList.add("task-list__item");

  // Create uncheckLink
  const uncheckLink = document.createElement("a");
  // Link uncheck box icon to uncheck link
  uncheckLink.innerHTML = '<i class="far fa-square square"></i>';

  // Create uncheck delete link
  const uncheckDelLink = document.createElement("a");
  // Add class
  uncheckDelLink.classList.add("delete-link");
  // Link delete icon to uncheck delete link
  uncheckDelLink.innerHTML = '<i class="far fa-trash-alt uncheck-delete"></i>';

  // Link uncheck link to li
  li.appendChild(uncheckLink);
  // link task to li
  li.appendChild(document.createTextNode(uncheckTask));
  // Link uncheck delete link to li
  li.appendChild(uncheckDelLink);

  // Link li to task list
  taskList.appendChild(li);
}

//////////////////////////////////////////////
// 6. Display check tasks in task list
function displayCheckTaskInTaskList(checkTask) {
  // Create li
  const li = document.createElement("li");
  // Add classes to li
  li.classList.add("task-list__item");
  // Strike through
  li.style.textDecoration = "line-through";

  // Create checkLink
  const checkLink = document.createElement("a");
  // Link check box icon to uncheck link
  checkLink.innerHTML = '<i class="far fa-check-square square"></i>';

  // Create check delete link
  const checkDelLink = document.createElement("a");
  // Add class
  checkDelLink.classList.add("delete-link");
  // Link delete icon to check delete link
  checkDelLink.innerHTML = '<i class="far fa-trash-alt check-delete"></i>';

  // Link check link to li
  li.appendChild(checkLink);
  // link task to li
  li.appendChild(document.createTextNode(checkTask));
  // Link check delete link to li
  li.appendChild(checkDelLink);

  // Link li to task list
  taskList.appendChild(li);
}

/////////////////////////////////////////
// 9. Get Tasks from LS
function getTasksFromLS() {
  // Get uncheck tasks from LS
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((uncheckTask) => {
    displayUncheckTaskInTaskList(uncheckTask);
  });

  // Get check tasks from LS
  let completeTasks;
  if (localStorage.getItem("completeTasks") === null) {
    completeTasks = [];
  } else {
    completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
  }
  completeTasks.forEach((checkTask) => {
    displayCheckTaskInTaskList(checkTask);
  });
}

//////////////////////////////////////////////
///////////// Event Listeners ////////////////

// DOC Load Event
document.addEventListener("DOMContentLoaded", getTasksFromLS);

// Submit Event
btnSubmit.addEventListener("click", function () {
  // Store in LS (Fun-1)
  addUncheckTaskInLS(inputTask.value);
  // Display in Task List (Fun-5)
  displayUncheckTaskInTaskList(inputTask.value);
});

// Task list event
taskList.addEventListener("click", function (e) {
  e.preventDefault();
  // Display check task
  if (e.target.closest(".fa-square")) {
    const checkTask = e.target.parentElement.parentElement;      
    displayCheckTaskInTaskList(checkTask.textContent);
    // Store check task in LS
    addCheckTaskInLS(checkTask.textContent);
    // Delete uncheck task from LS
    delUncheckTaskInLS(checkTask.textContent);
    checkTask.remove();
  }

  // Display uncheck task
  if (e.target.closest(".fa-check-square")) {
    const uncheckTask = e.target.parentElement.parentElement;
    console.log(uncheckTask);
    // Display uncheck task in task list
    displayUncheckTaskInTaskList(uncheckTask.textContent);
    // Remove check task from task list
    uncheckTask.remove();

    // Store uncheck task in LS
    addUncheckTaskInLS(uncheckTask.textContent);
    // Delete check task in LS
    delCheckTaskInLS(uncheckTask.textContent);
    location.reload();
  }

  // Delete check task
  if (e.target.closest(".check-delete")) {
    // Remove from task list
    e.target.parentElement.parentElement.remove();
    // Delete from LS
    const checkTask = e.target.parentElement.parentElement;
    delCheckTaskInLS(checkTask.textContent);
  }

  // Delete uncheck task
  if (e.target.closest(".uncheck-delete")) {
    // Remove from task list
    e.target.parentElement.parentElement.remove();
    // Delete from LS
    const uncheckTask = e.target.parentElement.parentElement;
    delUncheckTaskInLS(uncheckTask.textContent);
  }
  // location.reload();
});
