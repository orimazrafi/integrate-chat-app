import React, { useState, useRef } from "react";
import "./Message.css";
export const Message = ({ onSubmit, onTyping, onStopTyping }) => {
  const messageRef = useRef(null);
  const [message, setMessage] = useState("");
  const handleChange = e => {
    const { value } = e.target;
    if (value.length === 0) {
      onStopTyping();
    } else {
      onTyping();
    }

    setMessage(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
    messageRef.current.focus();
  };
  return (
    <form onSubmit={handleSubmit} className="message__form">
      <div className="row">
        <input
          type="text"
          ref={messageRef}
          className="message__input"
          placeholder="Message..."
          name="message"
          value={message}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary" disabled={!message}>
          Send
        </button>
      </div>
    </form>
  );
};
