import React from "react";

export default function Activity(props) {
  const { feed } = props;
  return (
    <ul id="activityLog">
      {feed.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
