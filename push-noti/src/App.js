import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(result => console.log("SW Registered: ", result))
        .catch(error => console.error("Can't register SW: ", error));
    }

    if ("PushManager" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Permission: ", permission);
        }
      });
    }
  }
  render() {
    return <div>App</div>;
  }
}

export default App;
