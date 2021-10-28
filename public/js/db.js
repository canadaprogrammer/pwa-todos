// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, query, collection, onSnapshot, enableIndexedDbPersistence, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1z7CrEsCWEC6L7ICxVxuB6FZFb7FuiRE",
  authDomain: "pwa---todo.firebaseapp.com",
  projectId: "pwa---todo",
  storageBucket: "pwa---todo.appspot.com",
  messagingSenderId: "974337589423",
  appId: "1:974337589423:web:bb81d319cde836f976d45a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// offline date
enableIndexedDbPersistence(db)
.catch(err => {
  if(err.code == 'failed-precondition'){
    // probably multiple tabs open at once
    console.log('persistence failed');
  } else if(err.code == 'unimplemented'){
    // lack of browser support
    console.log('persistence is not available');
  }
});

// real-time listener
const pathname = window.location.pathname;
let query_todo = {};
if(pathname == '/index.html') {
  query_todo = query(collection(db, 'todos'));
} else if(pathname == '/pages/not_todo.html'){
  query_todo = query(collection(db, 'not-todos'));
}
// const not_todos = query(collection(db, 'not-todos'));
const layout = snapshot => {
// check changes of data
// console.log(snapshot.docChanges());
snapshot.docChanges().forEach(change => {
  // console.log(change, change.doc.data(), change.doc.id);
  if(change.type === 'added'){
    // add the document data to the web page
    renderTodo(change.doc.data(), change.doc.id);
  }
  if(change.type === 'removed'){
    // remove the document data from the web page
    removeTodo(change.doc.id);
  }
})
};
const unsubscribe_todos = onSnapshot(query_todo, snapshot => layout(snapshot));
// const unsubscribe_not_todos = onSnapshot(not_todos, snapshot => layout(snapshot));

// add new todo
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  let todo = {};
  if(typeof form.date !== 'undefined') {
    const date = form.date.value;
    const start_time = form.start_time.value;
    const end_time = form.end_time.value;
    const temp_start_datetime = new Date(`${date} ${start_time}`);
    const temp_end_datetime = new Date(`${date} ${end_time}`);
    // change timezone
    // const change_server_timezone = datetime => {
    //   const dt = datetime.toLocaleString('en-US', {
    //     timeZone: "America/Los_Angeles",
    //     hour12: false
    //   });
    //   const dt_arr = dt.split(', ');
    //   let date = dt_arr[0].split('/');
    //   date = `${date[2]}-${date[0]}-${date[1]}`;
    //   return `${date} ${dt_arr[1]}`;
    // }
    // const start_datetime = new Date(change_server_timezone(temp_start_datetime));
    // const end_datetime = new Date(change_server_timezone(temp_end_datetime));
    todo = {
      title: form.title.value,
      content: form.description.value,
      start_time: temp_start_datetime,
      end_time: temp_end_datetime
    }
    addDoc(collection(db, 'todos'), todo)
    .then(form_init())
    .catch(err => console.log(err));
  } else {
    todo = {
      title: form.title.value,
      content: form.description.value
    }
    addDoc(collection(db, 'not-todos'), todo)
    .then(form_init())
    .catch(err => console.log(err));
  }
});

// remove todo
const todoContainer = document.querySelector('.list-wrapper');
todoContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I' || evt.target.className === 'todo-remove'){
    const id = evt.target.getAttribute('data-id');
    let isExecuted = confirm('Are your sure to delete?');
    if(isExecuted){
      if(pathname == '/index.html') {
        deleteDoc(doc(db, 'todos', id));
      } else if(pathname == '/pages/not_todo.html'){
        deleteDoc(doc(db, 'not-todos', id));
      }
    }
  }
});
