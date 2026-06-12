import React, { useState, Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Error from "@mui/icons-material/Error";

import logo from "../../assets/logo.svg";
import "./styles.css";

import api from "../../services/api";
import { isAuthenticated, login } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await api
      .post("/login", {
        nickname
      })
      .then(({ status, data }) => {
        if (status === 200) {
          setError(data.message);
          setNicknameError(true);
        } else if (status === 201) {
          const { _id } = data;

          login(_id);

          navigate("/chat");
        }
      })
      .catch(() => {
        setError("Are you connected to the Internet?");
        setNicknameError(true);
      });
  }

  function getErrorMessage() {
    if (nicknameError) {
      return (
        <Fragment>
          <div className="error">
            <Error color={"error"} fontSize={"small"} />
            <Typography variant={"body2"} gutterBottom color={"error"}>
              {error}
            </Typography>
          </div>
        </Fragment>
      );
    }

    return null;
  }

  if (isAuthenticated()) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Chat+" />
        <input
          placeholder="Enter your nickname here"
          value={nickname}
          onChange={event => {
            setNickname(event.target.value);
            setNicknameError(false);
          }}
        />
        <button type="submit">Send</button>
        {getErrorMessage()}
      </form>
    </div>
  );
}
