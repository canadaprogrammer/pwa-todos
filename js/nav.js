document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementsByClassName('sidebar-trigger')[0];
  sidebar.addEventListener('click', () => {
    sidebar.childNodes.forEach(child => {
      if(child.nodeType != 3) {
        child.classList.toggle('close');
      }
    });
  });
});