const add_todo = document.querySelector('#todo-add');
const add_form = document.querySelector('#add-form');
if(add_todo) {
  add_todo.addEventListener('click', () => {
    add_form.classList.add('show');
  });
}
// initial date and time default input
const makeTwoDigit = input => {
  return input < 10 ? '0' + input : input;
}
const form_init = () => {
  const today = new Date();
  let temp_month = makeTwoDigit(today.getMonth() + 1);
  let temp_date = makeTwoDigit(today.getDate());
  const current_date = `${today.getFullYear()}-${temp_month}-${temp_date}`;

  let temp_hour = makeTwoDigit(today.getHours());
  let temp_min = makeTwoDigit(today.getMinutes());
  const current_time = `${temp_hour}:${temp_min}`;
  let future_hour = parseInt(temp_hour) + 1;
  if(future_hour > 24) {
    future_hour -= 24;
  } else if(future_hour < 10) {
    future_hour = '0' + future_hour;
  }
  const future_time = `${future_hour}:${temp_min}`;

  const title = document.querySelector('#add-form #title');
  const description = document.querySelector('#add-form #description');
  const date = document.querySelector('#add-form [type="date"]');
  const start_time = document.querySelector('#add-form #start_time');
  const end_time = document.querySelector('#add-form #end_time');
  if(date) {
    title.value = description.value = '';
    date.value = current_date;
    start_time.value = current_time;
    end_time.value = future_time;
  }
}
form_init();
// change default end time to changed start time + 1
if(start_time){
  start_time.addEventListener('change', evt => {
    start_arr = evt.target.value.split(':');
    let hours = parseInt(start_arr[0]) + 1;
    if(hours >= 24){
      hours = '0' + (hours - 24);
    } else if(hours < 10) {
      hours = '0' + hours;
    }
    end_time.value = `${hours}:${start_arr[1]}`;
  });
}
const todos = document.querySelector('.list-wrapper');
// completed
if(todos){
  todos.addEventListener('click', evt => {
    const clicked = evt.target.className;
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
  const start = new Date(data.start_time.seconds*1000);
  const end = new Date(data.end_time.seconds*1000);
  // change timezone
  const change_server_timezone = datetime => {
    const dt = datetime.toLocaleString('en-US', {
      timeZone: "America/Toronto",
      hour12: false
    });
    const dt_arr = dt.split(', ');
    let date = dt_arr[0].split('/');
    let time = dt_arr[1].split(':');
    date = `${date[2]}-${date[0]}-${date[1]}`;
    time = `${time[0]}:${time[1]}`;
    return `${date} ${time}`;
  }
  const start_datetime = change_server_timezone(start);
  const end_datetime = change_server_timezone(end);
  const date = start_datetime.split(' ')[0];


  const html = `
  <div class="todo" data-id="${id}">
    <div class="todo-complete"></div>
    <div class="todo-details">
      <div class="title">${data.title}</div>
      <div class="content">${data.content}</div>
      <div class="time"><span>${date}</span><span>${start_datetime.split(' ')[1]} ~ ${end_datetime.split(' ')[1]}</span></div>
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
