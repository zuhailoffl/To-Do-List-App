// Select elements
const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("due-date");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task item
    const li = document.createElement("li");

    // Create task text
    const taskSpan = document.createElement("span");
    taskSpan.innerText = taskText;
    
    // Create complete button
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✅";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => {
        taskSpan.classList.toggle("completed");
        updateProgress();
    });
    
    // Append everything to list item
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.innerHTML = `
        <span>${taskText} (${dueDate || "No Due Date"})</span>
        <button class="delete-btn">❌</button>
    `;

    // Add event listener to delete button
    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
    });

    // Add task to the list
    taskList.appendChild(li);

    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";
}

// Event listener for Add Task button
addTaskButton.addEventListener("click", addTask);
// Select the theme toggle button
const themeToggle = document.querySelector(".theme-toggle");

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Event listener for dark mode toggle
themeToggle.addEventListener("click", toggleDarkMode);
// Function to mark a task as completed
function toggleTaskCompletion(event) {
    event.target.classList.toggle("completed");
}

// Add event listener to tasks
li.querySelector("span").addEventListener("click", toggleTaskCompletion);
// Function to filter tasks
function filterTasks(filterType) {
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
        const isCompleted = task.querySelector("span").classList.contains("completed");

        if (filterType === "all") {
            task.style.display = "flex";
        } else if (filterType === "completed" && isCompleted) {
            task.style.display = "flex";
        } else if (filterType === "pending" && !isCompleted) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}
// Function to check and send reminders
function checkReminders() {
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
        const taskText = task.querySelector("span").innerText;
        const dueDate = task.getAttribute("data-due-date");

        if (dueDate) {
            const dueTime = new Date(dueDate).getTime();
            const currentTime = new Date().getTime();

            if (dueTime <= currentTime) {
                alert(`⏳ Reminder: "${taskText}" is due!`);
                task.classList.add("overdue");
            }
        }
    });
}

// Run the reminder function every 30 seconds
setInterval(checkReminders, 30000);
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.classList.remove("hidden");

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}

function checkReminders() {
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
        const taskText = task.querySelector("span").innerText;
        const dueDate = task.getAttribute("data-due-date");

        if (dueDate) {
            const dueTime = new Date(dueDate).getTime();
            const currentTime = new Date().getTime();

            if (dueTime <= currentTime) {
                showNotification(`⏳ Reminder: "${taskText}" is due!`);
                task.classList.add("overdue");
            }
        }
    });
}
function updateProgress() {
    const tasks = document.querySelectorAll("#task-list li");
    const completedTasks = document.querySelectorAll("#task-list .completed");

    const percentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    document.getElementById("progress-bar").style.width = percentage + "%";
    document.getElementById("progress-text").innerText = `${Math.round(percentage)}% Completed`;
}

function toggleTaskCompletion(event) {
    event.target.classList.toggle("completed");
    updateProgress();
}
