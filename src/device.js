export default function setupDevice({ device, setConnected, log, logCall, callState, setCallState }) {
  // Events are logged
  device.on("ready", () => {
    setConnected(true);
    log("👍 Client Ready.");
  });

  // Incomming call
  device.on("incoming", conn => {
    log(`📞 Incoming Call: ${conn.parameters.From}`);
    // accept the incoming connection and start two-way audio
    setCallState({
      ringing: true,
      onCall: false,
      callerID: conn.parameters.From,
      connection: conn
    });
  });

  // Connected call
  device.on("connect", conn => {
    log("📞 Call Established.");
    setCallState({
      ringing: false,
      onCall: true,
      callerID: conn.parameters.From,
      connection: conn
    });
  });

  // Disconnected call
  device.on("disconnect", conn => {
    log("❌ Call Disconnected.");
    logCall(callState.callerID, "Call Completed");
    setCallState({
      ringing: false,
      onCall: false,
      callerID: null,
      connection: null
    });
  });

  // Cancelled Call
  device.on("cancel", conn => {
    log("❌ Caller Hung Up.");
    logCall(callState.callerID, "Call Abandoned");
    setCallState({
      ringing: false,
      onCall: false,
      callerID: null,
      connection: null
    });
  });
}
