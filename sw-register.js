if ('serviceWorker' in navigator && "Notification" in window) {

  navigator.serviceWorker.register('sw.js')
    .then((swReg) => {
      console.log('service worker installed');
      self.swRegistration = swReg;
      notifyMe();
    })
    .catch(err => console.error('Error', err));

} else if (!("Notification" in window)) {
  alert("This browser does not support system notifications");
}

//Notifications Manager
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    //var notification = new Notification("Hi there!");
    showNotification();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        showNotification();
      }
    });
    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
  }
}

function showNotification() {
  swRegistration.showNotification("Notification", {
    "body": "Did you make a $1,000,000 purchase at Dr. Evil?",
    "icon": "images/email.png",
    "vibrate": [200, 100, 200, 100, 200, 100, 400],
    "tag": "request",
    "actions": [{
        "action": "yes",
        "title": "Yes",
        "icon": "images/yes.png"
      },
      {
        "action": "no",
        "title": "No",
        "icon": "images/no.png"
      }
    ]
  });
}