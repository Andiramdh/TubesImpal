const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

let selectedTaskRow = null;

// Show alert
function showAlert(message, className) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${className}`;
  alertDiv.appendChild(document.createTextNode(message));
  const main = document.querySelector(".main");
  main.prepend(alertDiv);

  setTimeout(() => alertDiv.remove(), 3000);
}

// Clear form fields
function clearFormFields() {
  document.querySelector("#taskTitle").value = "";
  document.querySelector("#taskDescription").value = "";
  document.querySelector("#dueDate").value = "";
  document.querySelector("#priority").value = "low";
}

// Save task
function saveTask() {
  const taskTitle = document.querySelector("#taskTitle").value;
  const taskDescription = document.querySelector("#taskDescription").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;

  if (taskTitle === "" || dueDate === "") {
    showAlert("Please fill in all required fields.", "danger");
    return;
  }

  if (selectedTaskRow === null) {
    // Add new task
    const tableBody = document.querySelector("#taskTableBody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${taskTitle}</td>
      <td>${taskDescription}</td>
      <td>${dueDate}</td>
      <td>${priority.charAt(0).toUpperCase() + priority.slice(1)}</td>
      <td>
        <button class="btn btn-warning btn-sm editTask">Edit</button>
        <button class="btn btn-danger btn-sm deleteTask">Delete</button>
      </td>
    `;

    tableBody.appendChild(newRow);
    showAlert("Task added successfully!", "success");
  } else {
    // Edit existing task
    selectedTaskRow.children[0].textContent = taskTitle;
    selectedTaskRow.children[1].textContent = taskDescription;
    selectedTaskRow.children[2].textContent = dueDate;
    selectedTaskRow.children[3].textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

    showAlert("Task updated successfully!", "info");
    selectedTaskRow = null;
  }

  clearFormFields();
  const modalElement = document.querySelector("#addTaskModal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

// Handle edit and delete actions
document.querySelector("#taskTableBody").addEventListener("click", (e) => {
  if (e.target.classList.contains("editTask")) {
    selectedTaskRow = e.target.parentElement.parentElement;

    document.querySelector("#taskTitle").value = selectedTaskRow.children[0].textContent;
    document.querySelector("#taskDescription").value = selectedTaskRow.children[1].textContent;
    document.querySelector("#dueDate").value = selectedTaskRow.children[2].textContent;
    document.querySelector("#priority").value = selectedTaskRow.children[3].textContent.toLowerCase();

    const modalElement = document.querySelector("#addTaskModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else if (e.target.classList.contains("deleteTask")) {
    e.target.parentElement.parentElement.remove();
    showAlert("Task deleted successfully!", "danger");
  }
});

// Reset selectedTaskRow when modal is closed
document.querySelector("#addTaskModal").addEventListener("hidden.bs.modal", () => {
  selectedTaskRow = null;
  clearFormFields();
});







// Request

// Fungsi untuk menambah task
function addTask(taskData) {
  return fetch("backend url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      return response.json();
    });
}

// Fungsi untuk menghapus task
function deleteTask(taskId) {
  return fetch(`backend url/${taskId}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return response.json();
    });
}

// Fungsi untuk mengambil semua task
function getAllTasks() {
  return fetch("backend url")
    .then(response => response.json())
    .catch(error => console.error("Error fetching tasks:", error));
}


//Today Task

fetch("backend url today")
  .then(response => response.json())
  .then(data => {
    // Render task hari ini
  });


// 7 day task
fetch("backend url 7 days")
  .then(response => response.json())
  .then(data => {
    // Render task untuk 7 hari ke depan
  });


// All task
fetch("backend url all task")
  .then(response => response.json())
  .then(data => {
    // Render semua task
  });



// Implementasi fungsi di event listener
document.querySelector("#addTaskButton").addEventListener("click", () => {
  const taskData = {
    title: "New Task",
    description: "Task description",
    dueDate: "2024-11-22",
    priority: "medium",
  };
  addTask(taskData)
    .then(data => console.log("Task added:", data))
    .catch(error => alert("Error adding task: " + error.message));
});
