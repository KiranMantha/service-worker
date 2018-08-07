if ('serviceWorker' in navigator && "Notification" in window) {
  navigator.serviceWorker.register('sw.js');
  navigator.serviceWorker.ready.then((swReg) => {
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
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
}

function showNotification() {
  var notification = new Notification("Notification", {
    "body": "Did you make a $1,000,000 purchase at Dr. Evil?",
    "icon": "images/email.png",
    "tag": 'request'
  });

  swRegistration.showNotification("Notification", {
    "body": "Did you make a $1,000,000 purchase at Dr. Evil?",
    "icon": "images/email.png",
    "badge": "images/email.png",
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
  setTimeout(notification.close.bind(notification), 4000);
}