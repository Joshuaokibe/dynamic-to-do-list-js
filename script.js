// Ensure the script runs after the document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        // Get and trim input value
        const taskText = taskInput.value.trim();

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
        };

        // Append button to list item and list item to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for button click to add task
    addButton.addEventListener('click', addTask);

    // Event listener for pressing "Enter" key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize with a sample task
    addTask("Sample task");
});