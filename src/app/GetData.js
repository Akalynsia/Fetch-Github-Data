"use client";
import React, { useEffect, useState } from "react";

const GetData = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not found");
        }
      })
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
      });
  };

  const handleUserClick = () => {
    if (user) {
      window.location.href = `https://github.com/${user.login}`;
    }
  };
  return (
    <div className="user-list-container">
      <h1>Search Github User</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      {user && (
        <div className="user-info" onClick={handleUserClick}>
          <img src={user.avatar_url} alt={user.login} />
          <p>{user.login}</p>
        </div>
      )}
      {!user && username && <p>User not found. Please try again.</p>}
    </div>
  );
};

export default GetData;
