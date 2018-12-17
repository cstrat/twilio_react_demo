import React from "react";
import { format } from "date-fns";

export default function CallLog(props) {
  const { log } = props;
  const logCopy = [...log].reverse() || [];

  return (
    <ul id="callLog">
      {logCopy.map((item, i) => (
        <li key={i}>
          {format(item.date, "YY/MM/DD - HH:mm A")}: {item.from} - {item.status}
        </li>
      ))}
    </ul>
  );
}
