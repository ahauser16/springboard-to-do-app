
const form = document.querySelector('#taskForm');
const taskNameInput = document.querySelector('input[name="taskName"]');
const taskDescInput = document.querySelector('textarea[name="taskDescription"]');
const taskList = document.querySelector('.taskList');

document.addEventListener('DOMContentLoaded', localStorageRetrievalOnStartup);

function localStorageRetrievalOnStartup() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length === 0) {
        // for testing or first-time initialization
        tasks.push({ taskName: 'monkey business', taskDescription: 'bananas!' });
    }

    tasks.forEach(task => {
        makeTodoItem(task.taskName, task.taskDescription);
    });
    console.log(tasks);
}

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-task-btn')) {
        e.target.parentElement.remove();
        //update localStorage
    } else if (e.target.classList.contains('complete-task-btn')) {
        e.target.parentElement.classList.add('strikeText');
        //update localStorage
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Task Name:", taskNameInput.value); // Debugging
    console.log("Task Description:", taskDescInput.value); // Debugging
    makeTodoItem(taskNameInput.value, taskDescInput.value);
    saveToLocalStorage(taskNameInput.value, taskDescInput.value);
    taskNameInput.value = '';
    taskDescInput.value = '';
});

function saveToLocalStorage(taskName, taskDesc) {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskName: taskName, taskDescription: taskDesc });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("Error in saveToLocalStorage:", error);
    }
}

function makeTodoItem(name, description) {
    const newTodoLi = document.createElement('li');
    taskList.append(newTodoLi);
    newTodoLi.classList = 'todo';

    const newTodoHeader = document.createElement('h3');
    newTodoLi.append(newTodoHeader);
    newTodoHeader.innerText = name;

    const newTodoDesc = document.createElement('p');
    newTodoLi.append(newTodoDesc);
    newTodoDesc.innerText = description;


    const deleteTaskButton = document.createElement('button');
    newTodoLi.appendChild(deleteTaskButton);
    deleteTaskButton.textContent = 'Remove';
    deleteTaskButton.classList.add('delete-task-btn');

    deleteTaskButton.addEventListener('click', function () {
        newTodoLi.remove();
        // updateLocalStorage();
    });

    const completeTaskButton = document.createElement('button');
    newTodoLi.appendChild(completeTaskButton);
    completeTaskButton.textContent = 'Complete';
    completeTaskButton.classList.add('complete-task-btn');
    // updateLocalStorage();
}

