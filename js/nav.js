document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementsByClassName('sidebar-trigger')[0];
  const overlay = document.querySelector('#overlay');
  sidebar.addEventListener('click', () => {
    sidebar.childNodes.forEach(child => {
      if(child.nodeType != 3) {
        child.classList.toggle('close');
      }
    });
    document.querySelector('#side-menu').classList.toggle('show');
    overlay.classList.toggle('show');
    hide_overlay();
  });
  const hide_overlay = () => {
    console.log(document.querySelector('#overlay.show'));
    if(document.querySelector('#overlay.show')) {
      document.querySelector('#overlay.show').addEventListener('click', () => {
        document.querySelector('#side-menu').classList.remove('show');
        overlay.classList.remove('show');
      })
    }
  }
  
});