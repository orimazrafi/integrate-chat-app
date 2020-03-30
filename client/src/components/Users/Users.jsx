import React from "react";
import "./Users.css";
export const Users = ({ users, username }) => {
  return (
    <div className="users__container">
      <h4> Users</h4>
      <ol className="users__list">
        {users.map(user => (
          <li
            key={Math.random()}
            className={user.username === username ? "active" : ""}
          >
            {user.username}
          </li>
        ))}
      </ol>
    </div>
  );
};
