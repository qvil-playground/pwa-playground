import React, { Component } from "react";
import convertDataURIToBinary from "./lib/base64";

class App extends Component {
  componentDidMount() {
    console.log(
      "TCL: App -> componentDidMount -> process.env.REACT_APP_APPLICATION_SERVER_KEY",
      process.env.REACT_APP_APPLICATION_SERVER_KEY
    );
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(swReg => {
          console.log("SW Registered: ", swReg);
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              console.log("Permission: ", permission);
              swReg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertDataURIToBinary(
                    process.env.REACT_APP_APPLICATION_SERVER_KEY
                  )
                })
                .then(pushSubscriptionObject =>
                  console.log(pushSubscriptionObject)
                )
                .catch(error =>
                  console.error("TCL: App -> componentDidMount -> error", error)
                );
            }
          });
        })
        .catch(error => console.error("Can't register SW: ", error));
    }
  }
  render() {
    return <div>App</div>;
  }
}

export default App;
