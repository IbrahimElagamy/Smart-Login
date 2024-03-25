var helloUser = document.getElementById("helloUser");
var toDoInput = document.getElementById("toDo");
var toDoList = document.querySelectorAll(".toDoList");
var btnAddUpdate = document.querySelectorAll(".btnAddUpdate");
var boxsList = document.querySelectorAll(".boxList");
var myAcc = localStorage.getItem("userName");
var tasks = [];
var tasksDoing = [];
var uIndex;
var drag = null;


if (myAcc == null) {
  window.open("./index.html", "_self");
}
if (localStorage.getItem("myTasks") == null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("myTasks"));
  displaytask(tasks);
}
if (localStorage.getItem("myTasksDoing") == null) {
  tasksDoing = [];
} else {
  tasksDoing = JSON.parse(localStorage.getItem("myTasksDoing"));
  displaytaskDoing(tasksDoing);
}

helloUser.innerHTML = `Hello ${localStorage.getItem(
  "userName"
)}, you can now write down your daily tasks`;

function logOut() {
  window.location.href = "./index.html";
  localStorage.removeItem("userName");
}
function addToDO() {
  if (toDoInput.value != "") {
    var myTasks = {
      task: toDoInput.value,
    };
    tasks.push(myTasks);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    clearToDoForm();
    displaytask(tasks);
    dragItem();
  }
}
function clearToDoForm() {
  toDoInput.value = "";
}
function displaytask(arr) {
  var box = "";
  for (var i = 0; i < arr.length; i++) {
    box += ` <div class="toDoList mt-4 ">
    <div draggable="true" class="my-2">
      <div class="w-100  fs-5 fw-medium text-light">
        <div class="item d-flex justify-content-between align-items-center rounded-2 p-3">
          <div>${arr[i].task}</div> 
          <div class="icons">
            <a onclick="setFormForUpdate(${i})" href="#"><i class="fa-solid fa-pen-to-square fw-lighter text-success"></i></a>
            <a onclick="deleteTask(${i})" href="#"><i class=" fa-solid fa-trash-can fw-lighter text-danger"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
  toDoList[0].innerHTML = box;
}
function deleteTask(index) {
  tasks.splice(index, 1);
  displaytask(tasks);
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}
function setFormForUpdate(index) {
  uIndex = index;
  toDoInput.value = tasks[index].task;
  btnAddUpdate[0].classList.replace("d-block", "d-none");
  btnAddUpdate[1].classList.replace("d-none", "d-block");
  console.log(btnAddUpdate[1]);
}
function updateTask() {
  tasks[uIndex].task = toDoInput.value;
  localStorage.setItem("myTasks", JSON.stringify(tasks));
  btnAddUpdate[1].classList.replace("d-block", "d-none");
  btnAddUpdate[0].classList.replace("d-none", "d-block");
  displaytask(tasks);
  clearToDoForm();
}
function dragItem() {
  var items = document.querySelectorAll(".toDoList div");
  items.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
      item.classList.add("opacity-50");
    });
    item.addEventListener("dragend", function () {
      drag = null;
      item.classList.remove("opacity-50");
    });
  });

  boxsList.forEach((boxList) => {
    boxList.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("bg-success", "text-light", "opacity-75");
    });
    boxList.addEventListener("dragleave", function () {
      this.classList.remove("bg-success", "text-light", "opacity-75");
    });
    boxList.addEventListener("drop", function () {
      this.append(drag);
      this.classList.remove("bg-success", "text-light", "opacity-75");
    });
  });
}
dragItem();
