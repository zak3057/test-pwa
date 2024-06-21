import './App.css'

const askNotificationPermission = () => {
  console.log('askNotificationPermission 1');
  return new Promise((resolve) => {
    if (Notification.permission === 'granted') {
      console.log('askNotificationPermission 2');
      resolve('granted');
    } else if (Notification.permission === 'denied') {
      console.log('askNotificationPermission 3');
      resolve('denied');
    } else {
      console.log('askNotificationPermission 4');
      Notification.requestPermission().then(permission => {
        console.log('askNotificationPermission 5');
        resolve(permission);
      });
    }
  });
}

const sendNotification = async () => {
  console.log('sendNotification s');
 
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10000);
  })

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(registration => {
      console.log('sendNotification then');
      if (registration) {
        registration.showNotification('Hello World!', {
          body: 'This is a test notification',
        });
      }
    });
  }
}

function App() {
  return (
    <>
      <div className="card">
        <button onClick={() => askNotificationPermission()}>
          通知許可
        </button>
      </div>
      <div className="card">
        <button onClick={() => sendNotification()}>
          local push
        </button>
      </div>
    </>
  )
}

export default App
