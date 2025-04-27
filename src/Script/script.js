
/* 
    Front end Requirements:
    1) create task  //done for now, come back when backend is added
    2) update task  //done for now, come back when backend is added
    3) delete tasks 
    4) toggle darkmode
    5) toggle view between all, active, or completed tasks
    6) add comment headers
*/
const taskInput = document.getElementById("task_input");

const taskList = document.getElementById("task_list");
const taskButton = document.getElementById("create_task_button");
const numTasksLeft = document.getElementById("tasks_left");
let tasks = [];

const createTask = () => {
    const taskContent = taskInput.value;
    if (taskContent.length < 1 || taskContent.length > 500) {
        return;
    }
    const task = {content: taskContent, completed: false}
    //todo: create php backend method that actually creates a task resource based on the object
    appendTask(task);
    updateNumTasks();
    taskInput.value = "";
}

taskButton.addEventListener("click", createTask);

const appendTask = (task) => {
    tasks.push(task);
    const newTask = document.createElement("li");
    createTaskChildren(newTask, task);
    newTask.className = "task";
    taskList.appendChild(newTask);
}

const updateNumTasks = () => {
    let numTasks = tasks.filter(task =>!task.completed).length;
    let pluralize = numTasks == 1 ? "task" : "tasks";
    numTasksLeft.textContent = `${numTasks} ${pluralize} remaining`
}

const createTaskChildren = (taskNode, taskObj) => {
    const taskContent = document.createElement("p");
    const completeTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");

    taskContent.className = "task_content";
    taskContent.textContent = taskObj.content;

    completeTaskButton.className = "incomplete_task_button";
    completeTaskButton.addEventListener("click", () => completeTask(taskContent, completeTaskButton, taskObj));

    deleteTaskButton.className = "delete_button";
    deleteTaskButton.addEventListener("click", () => deleteTask(taskNode, taskObj));

    taskNode.appendChild(completeTaskButton);
    taskNode.appendChild(taskContent);
    taskNode.appendChild(deleteTaskButton);
}

const completeTask = (taskContent, taskButton, taskObj) => {
    taskObj.completed = true;
    //todo: call updateTask in php backend
    taskContent.className = "completed_task_content";
    taskButton.className = "completed_task_button";
    updateNumTasks();
}

const deleteTask = (taskNode, taskObj) => {
    //todo: once backend is up, call backend to remove from db
    tasks.splice(tasks.indexOf(taskObj), 1);
    taskNode.remove();
    updateNumTasks();
}

const clearCompleted = () => {
    //todo: remove from backend. and add as event listener once clear button implemented (see requirement 5@ top of file)
    tasks = tasks.filter(task => !task.completed);
    recreateTaskNodes();
}

/**
 * called when completed tasks are cleared. Recreate taskList by adding task nodes for incomplete tasks
 *  todo: will be refactored into an api GET request once the backend is implemeted
 */
const recreateTaskNodes = () => {
    taskList.textContent = " ";
    tasks.forEach(task => appendTask(task));
}

const toggleDarkMode = () => {
    
}