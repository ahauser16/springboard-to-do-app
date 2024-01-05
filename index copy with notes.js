
const form = document.querySelector('#taskForm');
const taskNameInput = document.querySelector('input[name="taskName"]');
const taskDescInput = document.querySelector('textarea[name="taskDescription"]');
const taskList = document.querySelector('.taskList');

// retrieve from localStorage
const todosStorage = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < todosStorage.length; i++) {
    let itemFromStorage = document.createElement("li");
    let nameFromStorage = document.createElement("h5");
    let descFromStorage = document.createElement("p");

    nameFromStorage.innerText = todosStorage[i].name;
    
    itemFromStorage.isCompleted = todosStorage[i].isCompleted ? true : false;
    if (itemFromStorage.isCompleted) {
        itemFromStorage.style.textDecoration = "line-through";
    }
    todoList.appendChild(itemFromStorage);
}

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-task-btn')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('complete-task-btn')) {
        e.target.parentElement.classList.add('strikeText');
    }
    console.log(localStorageTasks);
    console.log(userData);

});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log(taskNameInput.value, taskDescInput.value);
    makeTodoItem(taskNameInput.value, taskDescInput.value);
    saveToLocalStorage(taskNameInput.value, taskDescInput.value);

});

function saveToLocalStorage(taskName, taskDesc) {

}

function makeTodoItem(name, description) {
    ///////creation of elements//////////////////////////
    //create a new <li> element to contain append to the <ul> element named "taskList" and to which you will append the <h5> and <p> elements.
    const newTodoItem = document.createElement('li');

    //create a new <h5> element
    const itemHeader = document.createElement('h5');

    //add 'taskName' form data to the <h5> element
    itemHeader.innerText = name;

    //create a new <p> element
    const newTodoDesc = document.createElement('p');

    //add 'taskDescription' form data to the <p> element
    newTodoDesc.innerText = description;

    //create a new <button> element for the delete button
    const deleteButton = document.createElement('button');

    //create text to add to the deleteButton
    deleteButton.textContent = 'Remove';

    //add a class to the delete button
    deleteButton.classList.add('delete-task-btn');

    //add an event listener to the delete button to remove the parent element of the button
    //THIS IS THE APPROACH THAT DOES NOT INCLUDE EVENT DELEGATION
    // deleteButton.addEventListener('click', function (e) {
    //     e.target.parentElement.remove();
    // })

    //create a new <button> element for the complete task button
    const completeButton = document.createElement('button');

    //create text to add to the completeButton
    completeButton.textContent = 'Complete';

    //add a class to the complete button
    completeButton.classList.add('complete-task-btn');

    //THIS IS THE APPROACH THAT DOES NOT INCLUDE EVENT DELEGATION
    // completeButton.addEventListener('click', function (e) {
    //     e.target.parentElement.classList.add('strikeText');
    // })

    /////////////add classes to the new elements////////////////
    //add the "todo" class to the <li> element
    newTodoItem.classList = 'todo';

    ///////////targeting of elements/////////////////
    //target the <ul> element with class name "taskList" that you want to append to
    // const taskList = document.querySelector('#taskListContainer ul')

    //start with the lowest level element and work your way up when appending new elements to other new elements
    newTodoItem.append(itemHeader);
    newTodoItem.append(newTodoDesc);
    newTodoItem.appendChild(completeButton);
    newTodoItem.appendChild(deleteButton);
    taskList.append(newTodoItem);
    taskNameInput.value = '';
    taskDescInput.value = '';
}


//the following code is for the delete and complete buttons but does not demonstrate Event Delegation.  This approach is not as good because new to do items that are added after the page loads will not have the event listeners attached to them.  The better approach is to add the event listeners to the parent element and then use event delegation to target the child elements.
// const removeButtons = document.querySelectorAll('.todo #delete-task-btn')
// for (let btn of removeButtons) {
//     btn.addEventListener('click', function (e) {
//         e.target.parentElement.remove();
//     })
// }

// const completeButtons = document.querySelectorAll('.todo #complete-task-btn')
// for (let btn of completeButtons) {
//     btn.addEventListener('click', function (e) {
//         e.target.parentElement.classList.add('strikeText');
//     })
// }