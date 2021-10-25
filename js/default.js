const complete = document.querySelectorAll('.todo-complete, .todo-details');
complete.forEach(evt => {
  evt.addEventListener('click', () => {
    console.log(evt);
    document.querySelector('.todo-complete').classList.toggle('completed');
  })
});
const add_todo = document.querySelector('#todo-add');
const add_form = document.querySelector('#add-form');
if(add_todo) {
  add_todo.addEventListener('click', () => {
    add_form.classList.add('active');
  });
}

const todos = document.querySelector('.list-wrapper');
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
