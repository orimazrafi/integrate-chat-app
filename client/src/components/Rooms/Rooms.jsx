import React from "react";
import "./Rooms.css";

export const Rooms = ({ userRoom }) => {
  const rooms = () => {
    return ["Javascript", "PHP", "Python"];
  };
  return (
    <div className="rooms__container">
      <h4>Rooms</h4>
      <ol className="rooms_list">
        {rooms().map(room => (
          <li key={Math.random()} className={room === userRoom ? "active" : ""}>
            {room}
          </li>
        ))}
      </ol>
    </div>
  );
};
