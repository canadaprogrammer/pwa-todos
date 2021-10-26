const add_todo = document.querySelector('#todo-add');
const add_form = document.querySelector('#add-form');
if(add_todo) {
  add_todo.addEventListener('click', () => {
    console.log(add_form);
    add_form.classList.add('show');
  });
}

const todos = document.querySelector('.list-wrapper');
// completed
if(todos){
  todos.addEventListener('click', evt => {
    const clicked = evt.target.className;
    console.log(evt.target.className, evt.target.parentNode);
    const step_1_classes = ['title', 'content', 'time'];
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
  const start = new Date(data.start_time.seconds*1000).toISOString();
  // const startDate = start.substr(0,10);
  const startTime = start.substr(11,5);
  const end = new Date(data.end_time.seconds*1000).toISOString();
  // const endDate = end.substr(0,10);
  const endTime = end.substr(11,5);
  const time = startTime + ' - ' + endTime;
  // if(startDate == endDate){
    // time = startDate + ' ' + startTime + ' - ' + endTime;
  // } else {
  //   time = startDate + ' ' + startTime + ' - ' + endDate + ' ' + endTime;
  // }
  const html = `
  <div class="todo" data-id="${id}">
    <div class="todo-complete"></div>
    <div class="todo-details">
      <div class="title">${data.title}</div>
      <div class="content">${data.content}</div>
      <div class="time">${time}</div>
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
