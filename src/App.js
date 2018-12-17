import React, { useState } from "react";
import { FocusStyleManager } from "@blueprintjs/core";
import Activity from "./components/Activity";
import Connect from "./components/Connect";
import Control from "./components/Control";
import CallLog from "./components/CallLog";
import setupDevice from "./device";

// Import various CSS dependancies
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// Custom CSS
import "./App.css";

// Hides blue outline around elements
FocusStyleManager.onlyShowFocusOnTabs();

// Main App Component
export default function App() {
  // Application State
  const [connected, setConnected] = useState(false);
  const [activity, setActivity] = useState([]);
  const [callLog, setCallLog] = useState([]);
  const [callState, setCallState] = useState({
    ringing: false,
    onCall: false,
    callerID: null,
    connection: null
  });

  // Helper Function To Log Activity
  function log(newActivity) {
    activity.push(newActivity); // Not correct way to do this, but for some reason the spread operator didn't work
    setActivity(activity);
  }

  // Helper Function To Log Calls
  function logCall(callFrom, callStatus) {
    let callEntry = {
      date: new Date(),
      from: callFrom,
      status: callStatus
    };
    setCallLog([...callLog, callEntry]);
  }

  // Client Device Object
  // eslint-disable-next-line no-undef
  const device = new Twilio.Device();

  setupDevice({
    device,
    setConnected,
    log,
    callState,
    setCallState,
    logCall
  });

  // App
  return (
    <>
      <Connect connected={connected} setConnected={setConnected} device={device} log={log} />
      <div id="frame">
        <Control connected={connected} device={device} log={log} logCall={logCall} callState={callState} setCallState={setCallState} />
        <Activity feed={activity} />
        {connected && <CallLog log={callLog} />}
      </div>
    </>
  );
}
