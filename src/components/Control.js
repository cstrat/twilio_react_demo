import React, { useState } from "react";
import { Classes, Position, Icon, Menu, MenuItem, MenuDivider, Tooltip } from "@blueprintjs/core";

export default function Control(props) {
  const [muted, setMuted] = useState(false);

  const { connected, log, callState, setCallState, setRefresh } = props;

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
    setRefresh(Math.random());
    connection.reject();
    setCallState({
      ringing: false,
      onCall: false,
      callerID: null,
      connection: null
    });
  }

  function toggleMute() {
    if (callState.onCall) {
      let muteStatus = connection.isMuted();
      setMuted(!muteStatus);
      connection.mute(!muteStatus);
    }
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
          <MenuDivider title="No Active Calls" />
        )}

        {ringing && <MenuItem className={Classes.INTENT_DANGER} icon="phone" text="Reject Call" onClick={handleReject} />}

        {callerID && (
          // On Call Controls
          <>
            <MenuDivider />
            <Tooltip content={`Click here to ${muted ? "unmute" : "mute"} call.`} position={Position.BOTTOM}>
              <MenuItem className={muted && Classes.INTENT_WARNING} text={callerID} icon={muted ? "volume-off" : "volume-up"} onClick={toggleMute} />
            </Tooltip>
          </>
        )}
      </Menu>
    </div>
  );
}
