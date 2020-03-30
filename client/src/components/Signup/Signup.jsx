import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export const Signup = ({ onSubmit }) => {
  const history = useHistory();
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const [user, setUser] = useState({ username: "", room: "" });
  const [nameMessage, setNameMessage] = useState(false);

  const handleChange = e => {
    setNameMessage(false);
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let nameWithUpper = capitalizeFirstLetter(user.username);
    const { data: users } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users`
    );
    let index = users.findIndex(u => u.username === nameWithUpper);
    if (index !== -1) return setNameMessage(true);
    onSubmit(user);
    history.push("/chat", { username: nameWithUpper, room: user.room });
  };

  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className="form__wrapper">
      <form onSubmit={handleSubmit} className="form__container">
        <div className="form-group">
          <label htmlFor="paperInputs1">Username</label>
          <input
            className="form-control"
            name="username"
            placeholder="Username..."
            value={user.username}
            onChange={handleChange}
            type="text"
            ref={nameRef}
            id="paperInputs1"
          />
          {nameMessage && (
            <p className="username__error__message">
              username is already taken
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="paperSelects1">Room</label>
          <select
            id="paperSelects1"
            className="custom-select"
            value={user.room}
            onChange={handleChange}
            name="room"
          >
            <option>Choose...</option>
            <option value="Javascript">Javascript</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <button
          className="btn btn-primary submit"
          type="submit"
          disabled={!user.username || !user.room}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
