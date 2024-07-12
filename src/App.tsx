import './App.css'

const askNotificationPermission = () => {
  return new Promise((resolve) => {
    if (Notification.permission === 'granted') {
      resolve('granted');
    } else if (Notification.permission === 'denied') {
      resolve('denied');
    } else {
      Notification.requestPermission().then(permission => {
        resolve(permission);
      });
    }
  });
}

const sendNotification = async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10000);
  })

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(registration => {
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
