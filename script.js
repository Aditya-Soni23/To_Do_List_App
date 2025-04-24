let points = 0;
const pointsEl = document.getElementById("task-count");

const modal = document.getElementById("task-modal");
const openModalBtn = document.getElementById("open-modal-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const cancelBtn = document.getElementById("cancel-btn");

const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");

const ongoingEl = document.getElementById("ongoing-tasks");
const completedEl = document.getElementById("completed-tasks");

const ongoingTab = document.getElementById("ongoing-tab");
const completedTab = document.getElementById("completed-tab");

openModalBtn.onclick = () => {
  modal.style.display = "block";
  titleInput.value = "";
  descInput.value = "";
  titleInput.focus();
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addTaskBtn.onclick = () => {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title) {
    alert("Please enter a task title!");
    return;
  }

  const task = createTaskElement(title, desc);
  ongoingEl.appendChild(task);
  modal.style.display = "none";
  updateTaskCount();
};

function createTaskElement(title, desc) {
  const task = document.createElement("div");
  task.className = "task-card";

  const content = document.createElement("div");
  content.className = "task-content";
  content.innerHTML = `<div class="task-title">${title}</div><div class="task-desc">${desc}</div>`;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  // ✅ Complete
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✅";
  completeBtn.title = "Mark as Complete";
  completeBtn.onclick = () => {
    completedEl.appendChild(task);
    completeBtn.remove();
    points++;
    pointsEl.textContent = `Tasks🔥: ${points}`;
    updateTaskCount();
  };

  // ✏️ Rename
  const renameBtn = document.createElement("button");
  renameBtn.innerHTML = "✏️";
  renameBtn.title = "Edit Task";
  renameBtn.onclick = () => {
    const newTitle = prompt("Edit Task Title:", title);
    const newDesc = prompt("Edit Task Description:", desc);
    if (newTitle) content.querySelector(".task-title").textContent = newTitle;
    if (newDesc !== null) content.querySelector(".task-desc").textContent = newDesc;
  };

  // 🗑️ Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete Task";
  deleteBtn.onclick = () => {
    if (confirm("Delete this task?")) task.remove();
    updateTaskCount();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(renameBtn);
  actions.appendChild(deleteBtn);

  task.appendChild(content);
  task.appendChild(actions);

  return task;
}

function updateTaskCount() {
  pointsEl.textContent = `Tasks: ${points}`;
}

ongoingTab.onclick = () => {
  ongoingEl.style.display = "flex";
  completedEl.style.display = "none";
  ongoingTab.classList.add("active");
  completedTab.classList.remove("active");
};

completedTab.onclick = () => {
  completedEl.style.display = "flex";
  ongoingEl.style.display = "none";
  completedTab.classList.add("active");
  ongoingTab.classList.remove("active");
};

ongoingTab.click(); // Activate ongoing by default
