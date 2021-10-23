// check if the browser supports service worker
if('serviceWorker' in navigator){
  // navigator.serviceWorker.register('/sw.js')
  //   .then(reg => console.log('service worker registered', reg))
  //   .catch(err => console.log('service worker not registered', err));
  const sw_register = async () => {
    try {
      let reg = await navigator.serviceWorker.register('/sw.js');
      // console.log('service worker registered', reg);
    } catch(err) {
      // console.log('service worker not registered', err);
    }
  }
  sw_register();
}