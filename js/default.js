const complete = document.querySelectorAll('.todo-complete, .todo-details');
complete.forEach(evt => {
  evt.addEventListener('click', () => {
    console.log(evt);
    document.querySelector('.todo-complete').classList.toggle('completed');
  })
});
const add_todo = document.querySelector('#todo-add');
const add_form = document.querySelector('#add-form');
add_todo.addEventListener('click', () => {
  add_form.classList.add('active');
});