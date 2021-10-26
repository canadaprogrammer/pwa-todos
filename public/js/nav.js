document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar-trigger');
  const side_menu = document.querySelector('#side-menu');
  const btn_add = document.querySelector('#todo-add');
  const form_add = document.querySelector('#add-form');
  const submit_add = document.querySelector('#add-form button[type="submit"]');
  const overlay = document.querySelector('#overlay');
  sidebar.addEventListener('click', () => {
    sidebar.childNodes.forEach(child => {
      if(child.nodeType != 3) {
        child.classList.toggle('close');
      }
    });
    // CHECK IF ADD FORM IS ACTIVE
    if(form_add && form_add.classList.contains('show')) {
      form_add.classList.remove('show');
    } else {
      overlay.classList.toggle('show');
    }
    side_menu.classList.toggle('show');
    hide_overlay();
  });
  if(btn_add && submit_add){
    btn_add.addEventListener('click', () => {
      form_add.classList.add('show');
      overlay.classList.add('show');
      hide_overlay();
    });
    submit_add.addEventListener('click', () => {
      form_add.classList.remove('show');
      overlay.classList.remove('show');
    });
  }
  const hide_overlay = () => {
    if(document.querySelector('#overlay.show')) {
      document.querySelector('#overlay.show').addEventListener('click', () => {
        side_menu.classList.remove('show');
        if(form_add) {
          form_add.classList.remove('show');
        }
        overlay.classList.remove('show');
      })
    }
  }
});