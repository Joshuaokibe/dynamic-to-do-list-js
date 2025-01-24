// Ensure the script runs after the document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load without saving again
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(item => {
            tasks.push(item.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        taskText = taskText.trim();

        // Check if task is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove task
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removal
        };

        // Append button to list item and list item to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';

        // Save task to Local Storage if necessary
        if (save) {
            saveTasks();
        }
    }

    // Event listener for button click to add task
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event listener for pressing "Enter" key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when page loads
    loadTasks();
});