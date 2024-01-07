
const form = document.querySelector('#taskForm');
const taskNameInput = document.querySelector('input[name="taskName"]');
const taskDescInput = document.querySelector('textarea[name="taskDescription"]');
const taskList = document.querySelector('.taskList');

document.addEventListener('DOMContentLoaded', localStorageRetrievalOnStartup);


// window.onload = (event) => {
//   NB it used to matter whether you used "onload" or "DOMContentLoaded" but now browsers are more consistent in their implementation of these events.

//step one bind all elements within the INITIALIZE FUNCTION
//NB--> do not name functions to include "saveLocalStorage"...use a more generic name.  the variables should be more precise but later when we get to OOP we will use more generic names for the variables as well.  majority of companies don't use OOP on the front end but the JQUERY, REACT, and other frameworks are all OOP.  so we will learn OOP in the next module.  for now, we are just learning the basics of JS and DOM manipulation.  trying to encourage Composition Over Inheritance model. 

//step two...makeTodoItem() function is  cyclomatic complexity of 2.  it is doing too much.  it is creating the elements, adding the event listeners, and adding the elements to the DOM.  we need to break this function up into smaller functions.  we will create a function called "createTodoItem()" and then call that function from within the makeTodoItem() function.  we will also create a function called "addEventListeners()" and call that function from within the makeTodoItem() function.  we will also create a function called "addTodoItemToDOM()" and call that function from within the makeTodoItem() function.  we will also create a function called "saveToLocalStorage()" and call that function from within the makeTodoItem() function.  we will also create a function called "updateLocalStorageAfterDeletion()" and call that function from within the makeTodoItem() function.  we will also create a function called "updateTaskStatusInLocalStorage()" and call that function from within the makeTodoItem() function.  try to make the bigger functions into smaller functions.

//refactor step three--> js doc follows a syntax to create documentation for your code.  it is a way to document your code.  it is a way to document your code so that other developers can understand your code.  it is a way to document your code so that you can understand your code.  it is a way to document your code so that you can understand your code in the future.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing.  it is a way to document your code so that you can understand your code in the future when you have forgotten what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing and you are working on a different project and you need to come back to this project and understand what you were doing.


// };




function saveToLocalStorage(id, taskName, taskDesc, isCompleted) {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            id: id,
            taskName: taskName,
            taskDescription: taskDesc,
            isCompleted: isCompleted
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("Error in saveToLocalStorage:", error);
    }
}

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-task-btn')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('complete-task-btn')) {
        e.target.parentElement.classList.add('strikeText');
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Task Name:", taskNameInput.value); 
    console.log("Task Description:", taskDescInput.value); 

    const taskId = new Date().getTime(); 

    makeTodoItem(taskId, taskNameInput.value, taskDescInput.value, false);
    saveToLocalStorage(taskId, taskNameInput.value, taskDescInput.value, false);

    taskNameInput.value = '';
    taskDescInput.value = '';
});

// function saveToLocalStorage(id, taskName, taskDesc, isCompleted) {
//     try {
//         let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//         const newTask = {
//             id: new Date().getTime(),
//             taskName: taskName,
//             taskDescription: taskDesc,
//             isCompleted: false  
//         };
//         console.log("Saving new task:", newTask); 
//         tasks.push(newTask);
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     } catch (error) {
//         console.error("Error in saveToLocalStorage:", error);
//     }
// }


function makeTodoItem(id, name, description, isCompleted = false) {
    const newTodoLi = document.createElement('li');
    taskList.append(newTodoLi);
    newTodoLi.classList = 'todo';
    if (isCompleted) {
        newTodoLi.classList.add('strikeText');
    }
    newTodoLi.dataset.taskId = id; 
    console.log("Creating task element with ID:", id); 


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
        updateLocalStorageAfterDeletion(id);
    });

    const completeTaskButton = document.createElement('button');
    completeTaskButton.textContent = 'Complete';
    completeTaskButton.classList.add('complete-task-btn');
    completeTaskButton.addEventListener('click', function () {
        newTodoLi.classList.toggle('strikeText');
        updateTaskStatusInLocalStorage(id, newTodoLi.classList.contains('strikeText'));
    });
    newTodoLi.appendChild(completeTaskButton);
}

function updateTaskStatusInLocalStorage(taskId, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, isCompleted: isCompleted };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorageAfterDeletion(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function localStorageRetrievalOnStartup() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        makeTodoItem(task.id, task.taskName, task.taskDescription, task.isCompleted);
    });
}


