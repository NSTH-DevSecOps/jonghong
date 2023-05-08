import React, { useState } from "react";
import PropTypes from "prop-types";

const proto = "http";
const BaseURL = "127.0.0.1:8080";
const API = `${proto}://${BaseURL}`;

async function loginUser(credentials) {
  return fetch(`${API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type='text' onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
