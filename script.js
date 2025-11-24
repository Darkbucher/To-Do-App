const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// When page loads, restore theme and tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => renderTask(taskText));

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
    updateThemeIcon();
});

// Add new task
if (addBtn) addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    renderTask(taskText);

    // Save task list to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
}

// Helper to render a task item
function renderTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${taskText}</span> <button class="delete-btn">Delete</button>`;
    taskList.appendChild(li);
}

// Delete task and update localStorage
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskText = e.target.previousElementSibling.textContent;
        e.target.parentElement.remove();

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

// Toggle dark/light theme and save preference
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// Update toggle icon (🌙 / 🌞)
function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌞' : '🌙';
}
