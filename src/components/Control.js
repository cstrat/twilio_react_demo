import React from "react";
import { Classes, Icon, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export default function Control(props) {
  const { connected, log, logCall, callState, setCallState } = props;

  const { ringing, onCall, callerID, connection } = callState;

  function handleAction() {
    if (onCall) {
      connection.disconnect();
      setCallState({
        ringing: false,
        onCall: false,
        callerID: null,
        connection: null
      });
    } else {
      connection.accept();
    }
  }

  function handleReject() {
    log("❌ Call Rejected.");
    logCall(callState.From, "Call Rejected");
    connection.reject();
    setCallState({
      ringing: false,
      onCall: false,
      callerID: null,
      connection: null
    });
  }

  return (
    <div id="menu">
      <strong>Twilio Agent Demo</strong>
      <br />
      <em>
        <Icon className={connected ? Classes.INTENT_SUCCESS : Classes.INTENT_DANGER} icon={connected ? "confirm" : "offline"} />{" "}
        {connected ? "Online!" : "Offline"}
      </em>

      <Menu id="actionMenu" className={Classes.ELEVATION_1}>
        {ringing || onCall ? (
          <MenuItem
            className={onCall ? Classes.INTENT_WARNING : Classes.INTENT_SUCCESS}
            icon="phone"
            text={onCall ? "End Call" : "Answer Call"}
            onClick={handleAction}
          />
        ) : (
          <MenuDivider title="No Calls" />
        )}

        {ringing && <MenuItem className={Classes.INTENT_DANGER} icon="phone" text="Reject Call" onClick={handleReject} />}

        {callerID && (
          <>
            <MenuDivider />
            <MenuItem text={callerID} />
          </>
        )}
      </Menu>
    </div>
  );
}
