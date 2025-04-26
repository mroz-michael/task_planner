
/* 
    Requirements:
    1) create task
    2) update task
    3) delete task
    4)toggle darkmode
    5) task info updates dynamically
    6) toggle view between all, active, or completed tasks
*/
const taskInput = document.getElementById("task_input");

const taskList = document.getElementById("task_list");
const taskButton = document.getElementById("create_task_button");
const numTasksLeft = document.getElementById("tasks_left");
const tasks = [];

const createTask = () => {
    const taskContent = taskInput.value;
    if (taskContent.length < 1 || taskContent.length > 500) {
        return;
    }
    const task = {content: taskContent, completed: false}
    appendTask(task);
    updateNumTasks();
}

const appendTask = (task) => {
    tasks.push(task);
    const newTask = document.createElement("li");
    newTask.textContent = task.content;
    newTask.className = "task";
    taskList.appendChild(newTask);
}

taskButton.addEventListener("click", createTask);

const updateNumTasks = () => {
    let numTasks = tasks.filter(task =>!task.completed).length;
    let pluralize = numTasks == 1 ? "task" : "tasks";
    numTasksLeft.textContent = `${numTasks} ${pluralize} remaining`
}