import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function CallLog(props) {
  const [callLog, setCallLog] = useState([]);

  useEffect(
    () => {
      fetch("https://twilio-0f8a.restdb.io/rest/call-log", {
        mode: "cors",
        cache: "no-cache",
        "content-type": "application/json",
        headers: {
          "x-apikey": "5c1c28e8056bf32b82ec4acf"
        }
      })
        .then(res => res.json())
        .then(responseJson => {
          setCallLog(responseJson.reverse());
        })
        .catch(error => {
          console.log(error);
        });
    },
    [props.refreshToken]
  );

  return (
    <ul id="callLog">
      <li>
        <b>Call Log</b>
      </li>
      {callLog.map((item, i) => (
        <li key={i} className={item.status !== "completed" ? "error" : "completed"}>
          {format(item.date, "YY/MM/DD - HH:mm A")}: {item.callerID} - {item.status}
        </li>
      ))}
    </ul>
  );
}
