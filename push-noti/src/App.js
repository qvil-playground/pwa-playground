import React, { useState, useEffect } from "react";
import styled from "styled-components";
import convertDataURIToBinary from "./lib/base64";

const ResultArea = styled.div`
  padding: 1rem;
  word-wrap: break-word;
`;

export default function App() {
  const [pushSubscriptionObject, setPushSubscriptionObject] = useState();

  useEffect(() => {
    console.log(
      "TCL: App -> process.env.REACT_APP_APPLICATION_SERVER_KEY",
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
                .then(pushSubscriptionObject => {
                  setPushSubscriptionObject(
                    JSON.stringify(pushSubscriptionObject)
                  );
                  console.log(pushSubscriptionObject);
                })
                .catch(error => console.log("TCL: App -> error", error));
            }
          });
        })
        .catch(error => console.error("Can't register SW: ", error));
    }
  });

  return (
    <div>
      <h2>pushSubscriptionObject</h2>
      <ResultArea>{pushSubscriptionObject}</ResultArea>
    </div>
  );
}
