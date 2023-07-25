const imageEl = document.querySelector(".bg-image");
const createInput = document.querySelector(".todo-create");
const closeIcon = document.querySelector(".close-icon");

const appContainer = document.querySelector(".app");
const numberOfItemsInList = document.querySelector(".items-no");

const createdTasksEl = document.querySelector(".created-tasks");

const completedTasksButton = document.querySelector(".completed-tasks");
const activeTasksButton = document.querySelector(".active-tasks");
const allTasksButton = document.querySelector(".all-tasks");
const clearCompletedButton = document.querySelector(".clear-completed");

const appFooter = document.querySelector(".app-footer");
const footerActions = document.querySelectorAll(".footer-action");

//to create the tasks
createInput.addEventListener("keydown", function (e) {
  if (createInput.value && e.key === "Enter") {
    const html = `<div class="tasks active-task">
    <span class="tick-container "><svg class="tick-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span
    ><input
      type="text"
      placeholder="Create a new task"
      class="todo-input" value="${createInput.value}"
      disabled
    /><span class="close-icon-container"><i class="fa-solid fa-circle-xmark close-icon"></i></span>
  </div>`;

    createdTasksEl.insertAdjacentHTML("afterbegin", html);

    //show the number of tasks in the stack
    numberOfActiveTasks();

    //clear the input field after creating a task
    createInput.value = "";

    //remove the cursor from the input field
    createInput.blur();
  }
});

function numberOfActiveTasks() {
  //show the number of tasks in the stack
  numberOfItemsInList.textContent =
    document.querySelectorAll(".active-task").length;
}

//when we complete a task, clicking the tick
createdTasksEl.addEventListener("click", function (e) {
  //clicking the tick container
  if (e.target.classList.contains("tick-container")) {
    //show the ticked icon
    e.target.lastElementChild.classList.add("ticked");

    //remove the active-task class to cus it is now completed
    e.target.closest(".tasks").classList.remove("active-task");

    //add the class completed to the the task element to indicate that it is completed
    e.target.closest(".tasks").classList.add("completed-task");

    //add completed class to the input element of that task
    e.target
      .closest(".tasks")
      .lastElementChild.previousElementSibling.classList.add("completed");

    //show the number of active tasks left in the queue
    numberOfActiveTasks();
  } //if the close icon is clicked
  else if (e.target.classList.contains("close-icon")) {
    //delete the parent element
    e.target.closest(".tasks").remove();

    //update the number of active items
    numberOfActiveTasks();
  }
});

function customiseTasksAvailable(c, nameOfClass) {
  //show the tasks which satisfy the classname
  if (c.classList.contains(nameOfClass)) {
    c.classList.remove("hide-task");
  } //hide the tasks which do not satisfy the classname
  else {
    c.classList.add("hide-task");
  }
}

//to show only completed tasks
completedTasksButton.addEventListener("click", function () {
  document.querySelectorAll(".tasks").forEach((c) => {
    customiseTasksAvailable(c, "completed-task");
  });
});

//to show only active tasks
activeTasksButton.addEventListener("click", function () {
  document.querySelectorAll(".tasks").forEach((c) => {
    customiseTasksAvailable(c, "active-task");
  });
});

//to show all tasks
allTasksButton.addEventListener("click", function () {
  document.querySelectorAll(".tasks").forEach((c) => {
    customiseTasksAvailable(c, "tasks");
  });
});

//to clear all completed tasks
clearCompletedButton.addEventListener("click", function () {
  //remove all elements with the class completed-task
  document.querySelectorAll(".completed-task").forEach((c) => {
    //remove element from html
    c.remove();
  });
});

//style for when a footer action is clicked
appFooter.addEventListener("click", function (e) {
  if (!e.target.classList.contains("footer-action")) return;

  //if the element clicked contains task action
  if (e.target.classList.contains("footer-action")) {
    //remove the footer-action-active from all buttons first
    footerActions.forEach((c) => c.classList.remove("footer-action-active"));

    //add the footer-action-active class to only the element that was clicked
    e.target.classList.add("footer-action-active");
  }
});
