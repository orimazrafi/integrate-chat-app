import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Message } from "../Message/Message";
import { Rooms } from "../Rooms/Rooms";
import { Messages } from "../Messages/Messages";
import { Users } from "../Users/Users";
import { Button } from "../Button/Button";
import "./Chat.css";

let socket;

export const Chat = () => {
  const messagesRef = useRef(null);
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState({ typing: false, username: "" });
  const { username, room } = history.location.state;

  useEffect(() => {
    const warning = () => {
      return socket.emit("leaveChat", username);
    };
    window.onbeforeunload = warning;
    socket = io.connect(process.env.REACT_APP_SERVER_URL);
    socket.emit("joinCredentail", { username, room });
    socket.on("getUsers", users => {
      const filterUsers = users.filter(user => user.room === room);
      setUsers(() => [...filterUsers]);
    });
    socket.emit("joinChat", username);
    socket.on("getInitialMessage", messages => {
      setMessages(messages);
    });
    socket.on("typing", username => {
      setIsTyping({ typing: true, username });
    });

    socket.on("message", messageObject => {
      setMessages(prevState => [...prevState, messageObject]);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    });

    socket.on("stop-typing", ({ username }) => {
      setIsTyping({ typing: false, username });
    });

    socket.on("leaveChat", ({ users, username }) => {
      setMessages(prevState => [
        ...prevState,
        { username, message: " Has Left The Chat!" }
      ]);
      setUsers(() => [...users]);
    });

    socket.on("goBack", () => {
      history.push("/");
    });

    socket.on("joinChat", username => {
      setMessages(prevState => [
        ...prevState,
        { username, message: " Has Join The Chat!" }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room, username, history]);

  const handleTyping = () => {
    socket.emit("typing", username);
  };
  const handleStopTyping = () => {
    socket.emit("stop-typing");
  };
  const handleSubmit = message => {
    socket.emit("stop-typing");
    socket.emit("message", { username, message });
  };
  const handleLeave = () => {
    window.location.replace("/");
  };

  return (
    <div>
      <h2 className="chat__headline">Chat</h2>
      <div className="chat__wrapper">
        <div className="chat__container">
          <Users users={users} username={username} />
          <Rooms userRoom={room} />
          <div className="messages__container" ref={messagesRef}>
            <Messages messages={messages} />
            {isTyping.typing && (
              <h4 className="on__typing__message">
                {isTyping.username} is typing...
              </h4>
            )}
            <Message
              onSubmit={handleSubmit}
              onTyping={handleTyping}
              onStopTyping={handleStopTyping}
            />
          </div>
          <Button onLeave={handleLeave} />
        </div>
      </div>
    </div>
  );
};
