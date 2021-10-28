const add_todo = document.querySelector('#todo-add');
const add_form = document.querySelector('#add-form');
if(typeof add_todo !== 'undefined') {
  add_todo.addEventListener('click', () => {
    add_form.classList.add('show');
  });
}
// initial date and time default input
const makeTwoDigit = input => {
  return input < 10 ? '0' + input : input;
}
const form_init = () => {
  const title = document.querySelector('#add-form #title');
  const description = document.querySelector('#add-form #description');
  title.value = description.value = '';;
}
form_init();

const todos = document.querySelector('.list-wrapper');
// completed
if(typeof todos !== 'undefined'){
  todos.addEventListener('click', evt => {
    const clicked = evt.target.className;
    const step_1_classes = ['title', 'content'];
    const step_2_classes = ['todo-complete', 'todo-complete completed'];
    const step_3_classes = ['todo', 'todo completed'];
    if(step_1_classes.includes(clicked)){
      evt.target.parentNode.parentNode.classList.toggle('completed');
    } else if(step_2_classes.includes(clicked)){
      evt.target.parentNode.classList.toggle('completed');
    } else if(step_3_classes.includes(clicked)){
      evt.target.classList.toggle('completed');
    }
  })
}
// render todo data
const renderTodo = (data, id) => {
  let html = `
  <div class="todo" data-id="${id}">
    <div class="todo-complete"></div>
    <div class="todo-details">
      <div class="title">${data.title}</div>
      <div class="content">${data.content}</div>
    </div>
    <div class="todo-remove">
      <i class="fas fa-trash-alt" data-id="${id}"></i>
    </div>
  </div>
  `;
  todos.innerHTML += html;
}
// remove todo data
const removeTodo = id => {
  const todo = document.querySelector(`.todo[data-id="${id}"]`);
  todo.remove();
}
