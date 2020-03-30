import React from "react";
import "./Messages.css";
export const Messages = ({ messages }) => {
  return (
    <>
      <h4 className="messages__headline">messages</h4>
      {messages.map(m => (
        <div className="card" key={Math.random()}>
          <div className="card-header">
            {" "}
            <h6 className="message__time">{m.time}</h6>
            <h4 className="message__username">{" " + m.username + " "}</h4>{" "}
            {" " + m.message}
          </div>
        </div>
      ))}
    </>
  );
};
