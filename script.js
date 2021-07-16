const todoFormEl = document.querySelector("#todo-form");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector("#todo-list");
const btnSubmit = document.querySelector("button[type='submit']");

function buildUniqueId(prefix = "prefix") {
  return prefix + "-" + Math.floor(Math.random() * Date.now());
}

function createTask(name) {
  return {
    id: buildUniqueId("todo"),
    name,
  };
}

const state = {
  taskName: "",
  tasks: [
    {
      id: "todo-0",
      name: "Learn some frameworks!",
    },
  ],
};

function init() {
  todoInputEl.addEventListener("change", handleInputChange);
  todoFormEl.addEventListener("submit", handleFormSubmit);
  renderInput();
  renderTodoList();
}

function renderInput() {
  state.taskName = todoInputEl.value;
}

function renderTodoList() {
  const frag = document.createDocumentFragment();
  state.tasks.forEach((task) => {
    const item = buildTodoItemEl(task.id, task.name);
    frag.appendChild(item);
  });

  while (todoListEl.lastChild) {
    todoListEl.removeChild(todoListEl.lastChild);
  }
  todoListEl.appendChild(frag);
}

function buildTodoItemEl(id, name) {
  const item = document.createElement("li");
  const span = document.createElement("span");
  const textContent = document.createTextNode(name);

  span.appendChild(textContent);

  item.id = id;
  item.appendChild(span);
  item.append(buildDeleteButtonEl(id), buildUpdateBtnEl(id));

  return item;
}

function buildDeleteButtonEl(id) {
  const button = document.createElement("button");
  const textContent = document.createTextNode("Delete");

  button.setAttribute("type", "button");
  button.addEventListener("click", handleDelBtn.bind(null, id));
  button.appendChild(textContent);

  return button;
}

function buildUpdateBtnEl(id, e) {
  const btn = document.createElement("button");
  btn.textContent = "Update";
  btn.addEventListener("click", handleUpdateBtn.bind(btn, id));

  return btn;
}

function handleInputChange(e) {
  state.taskName = e.target.value;
  console.log(state.taskName);
  return state.taskName;
}

function handleFormSubmit(e, id, event) {
  e.preventDefault();

  state.tasks = [...state.tasks, createTask(state.taskName)];
  state.taskName = "";
  renderInput();
  renderTodoList();
  todoInputEl.value = "";
  reset();
}

function handleDelBtn(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  renderTodoList();
}

function handleUpdateBtn(id, e) {
  btnSubmit.textContent = "Update";
  todoInputEl.style.outline = "2px solid lightblue";
  todoInputEl.focus();
  state.tasks.forEach((t) => t.id == id && (todoInputEl.value = t.name));
  this.previousElementSibling.click()

}

function reset() {
  btnSubmit.textContent = "Add";
  todoInputEl.style.outline = "none";
}

document.addEventListener("DOMContentLoaded", init);
