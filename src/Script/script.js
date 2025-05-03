
/* 
    Front end Requirements:
    1) create task  //done for now, come back when backend is added
    2) update task  //done for now, come back when backend is added
    3) delete tasks //done for now, come back when backend is added
    4) toggle darkmode //done, might update and improve colours later
    5) toggle view between all, active, or completed tasks //done for now, come back when backend done
    6) add comment headers
*/
const taskInput = document.getElementById("task_input");

const taskList = document.getElementById("task_list");
const taskButton = document.getElementById("create_task_button");
const numTasksLeft = document.getElementById("tasks_left");
const darkModeButton = document.getElementById("darkmode_toggle");
const toggleButtons = document.getElementsByClassName("display_toggle_button");

let allTasks = [];
let displayedTasks = [];

/**
 * creates a new taskObj and calls functions to add it to DOM w. the necessary elements
 * todo: once backend is up, integrate it w backend
 */
const createTask = () => {
    const taskContent = taskInput.value;
    taskInput.value = "";
    if (taskContent.length < 1 || taskContent.length > 50) {
        return;
    }

    const task = {content: taskContent, completed: false}
    allTasks.push(task);
    appendTask(task);
    updateNumTasks();
}

taskButton.addEventListener("click", createTask);

/**
 * adds the given task object to the array of displayed tasks, and creates it as a DOM element 
 * @param {*} task a JS object containing task content and completed status
 */
const appendTask = (task) => {
    displayedTasks.push(task);
    const newTask = document.createElement("li");
    createTaskChildren(newTask, task);
    newTask.className = "task";
    taskList.appendChild(newTask);
}

/**
 * calculates and displays the number of incomplete tasks
 * should be called whenever a task is added/updated/removed from the DOM
 */
const updateNumTasks = () => {
    let numTasks = displayedTasks.filter(task =>!task.completed).length;
    let pluralize = numTasks == 1 ? "task" : "tasks";
    numTasksLeft.textContent = `${numTasks} ${pluralize} remaining`
}

/**
 * Helper function to create and append children nodes to task nodes
 * @param {*} taskNode the DOM node for the task object
 * @param {*} taskObj the task object
 */
const createTaskChildren = (taskNode, taskObj) => {
    const taskContent = document.createElement("p");
    const completeTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");

    taskContent.textContent = taskObj.content;
    /*check if task is already completed*/
    taskContent.className = taskObj.completed ? "completed_task_content" : "task_content";
    completeTaskButton.className = taskObj.completed ? "completed_task_button" :"incomplete_task_button";
    completeTaskButton.addEventListener("click", () => toggleTask(taskContent, completeTaskButton, taskObj));

    deleteTaskButton.className = "delete_button";
    deleteTaskButton.addEventListener("click", () => deleteTask(taskNode, taskObj));

    taskNode.appendChild(completeTaskButton);
    taskNode.appendChild(taskContent);
    taskNode.appendChild(deleteTaskButton);
}

/**
 * Changes the given task's status from completed to incompleted, and vice versa. 
 * @param {*} taskContent 
 * @param {*} taskButton 
 * @param {*} taskObj 
 */
const toggleTask = (taskContent, taskButton, taskObj) => {
    taskObj.completed = !taskObj.completed;
    //todo: call updateTask in php backend
    if (taskObj.completed) {
        taskContent.className = "completed_task_content";
        taskButton.className = "completed_task_button";
    } else {
        taskContent.className = "task_content";
        taskButton.className = "incomplete_task_button";
    }

    updateNumTasks();
}

const deleteTask = (taskNode, taskObj) => {
    //todo: once backend is up, call backend to remove from db
    allTasks.splice(allTasks.indexOf(taskObj), 1);
    displayedTasks.splice(displayedTasks.indexOf(taskObj), 1);
    taskNode.remove();
    updateNumTasks();
}

const clearCompleted = () => {
    //todo: remove from backend once backend implemented
    allTasks = allTasks.filter(task => !task.completed);
    displayedTasks = displayedTasks.filter(task => !task.completed);
    displayTasks(displayedTasks);
}

document.getElementById("clear_completed").addEventListener("click", clearCompleted);

/**
 * called when completed tasks are cleared. Recreate taskList by adding task nodes for incomplete tasks
 *  todo: will be refactored into an api GET request once the backend is implemeted
 */
const displayTasks = (taskArray) => {
    taskList.textContent = " ";
    displayedTasks = [];
    taskArray.forEach(task => appendTask(task));
}

const toggleDarkMode = () => {
    const body = document.body;
    body.className = body.className == "dark_mode" ? "" : "dark_mode";
}

darkModeButton.addEventListener("click", toggleDarkMode);

/**event listener for display toggle buttons
 * toggleButtons: [displayAll, displayActive, displayCompleted]
 * buttonIndex = 0 for displayAll, 1 for displayActive, 2 for displayCompleted
 */
const setTaskDisplay = (buttonIndex) => {

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].id = buttonIndex == i ? "active_display" : "";
    }

    if (buttonIndex == 0) {
        displayTasks(allTasks);
        return;
    }
    
    if (buttonIndex == 1) {
        displayTasks(allTasks.filter(task => !task.completed));
        return;
    }

    if (buttonIndex == 2) {
        displayTasks(allTasks.filter(task => task.completed));
        return;
    }

}

Array.from(toggleButtons).forEach((button, i) => button.addEventListener("click", () => setTaskDisplay(i)));