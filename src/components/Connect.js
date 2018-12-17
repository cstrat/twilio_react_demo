import React, { useState, useEffect } from "react";
import { Classes, Intent, Dialog, Button, Alert } from "@blueprintjs/core";

export default function Connect(props) {
  // Local State
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  // Local reference to main device in main component
  const { connected, device, log } = props;

  // On Load Get Auth Token (do this once)
  useEffect(() => {
    fetch("https://red-goat-4208.twil.io/capability-token")
      .then(res => res.json())
      .then(responseJson => {
        if (responseJson.token) {
          log("🔑 Auth Token Recieved!");
          setLoading(false);
          setToken(responseJson.token);
        } else {
          setAlertMsg("Error Fetching Token!");
        }
      });
  }, []);

  // Function To Setup Device - Best Practice via Button Click
  // Ref: https://www.twilio.com/docs/voice/client/javascript/device#best-practice-note
  function setupDevice() {
    device.setup(token);
  }

  return (
    <>
      <Alert
        isOpen={alertMsg}
        onClose={() => {
          setAlertMsg(null);
        }}
      >
        {alertMsg}
      </Alert>
      <Dialog isOpen={!connected} title="Twilio Agent Demo">
        <div className={Classes.DIALOG_BODY}>
          <p>
            <strong>Before you can recieve calls this client will need to be authorised, fetching your token now...</strong>
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={token ? Intent.SUCCESS : Intent.NONE}
              loading={loading}
              icon={!token ? "offline" : "endorsed"}
              disabled={!token}
              onClick={setupDevice}
            >
              Ready Up
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
