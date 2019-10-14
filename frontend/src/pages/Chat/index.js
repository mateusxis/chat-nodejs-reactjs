import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";

import Time from "react-time-format";
import { Container, Card } from "@material-ui/core";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

import TextFieldCommon from "./TextFieldCommon";
import Header from "../../components/Header";
import NotificationMySnack from "../../components/NotificationMySnackbar";

import { isAuthenticated, getToken, logout } from "../../services/auth";

import api from "../../services/api";
import socket from "../../services/io";

import useStyles from "./styles";

export default function Main({ match }) {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState({});
  const [connected, setConnected] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgNotification, setMsgNotification] = useState("");

  

  useEffect(() => {
    if (isAuthenticated()) {
      async function loadMessages() {
        const response = await api.get("/messages");

        setMessages(response.data);
      }

      async function loadUser() {
        const userId = getToken();

        const response = await api.get(`/users/${userId}`);

        const loggedUser = response.data;

        setUser(loggedUser);
      }

      loadMessages();
      loadUser();
    }
  }, [match]);

  async function updateMessage() {
    const response = await api.get("/messages");

    setMessages(response.data);
  }

  const init = () => {
    socket.on("update", msg => {
      openNotification(msg);
    });

    socket.on("chat", () => {
      updateMessage();
    });
  };

  const openNotification = (msg) => {
    setOpen(true);
    setMsgNotification(msg);
    setTimeout(() => { setOpen(false); }, 3000);
  }

  const join = loggedUser => {
    if (loggedUser.nickname) {
      socket.emit("join", loggedUser);
    
      init();
    }
  };

  const send = msg => {
    socket.emit("send", msg);
    updateMessage();
  };

  const handleClick = async () => {
    const response = await api.post("/messages", {
      message: newMessage,
      userId: user._id
    });

    const newMsg = response.data;

    send(newMsg);
  };


  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const logoutSystem = async () => {
    const userId = getToken();
    logout();

    await api.post(`/logout/${userId}`, user);
  };

  if (!isAuthenticated()) {
    return <Redirect to={"/"} />;
  }

  if (user.nickname && connected === false) {
    setConnected(true);
    join(user);
  }

  return (
    <div className={classes.mainContainer}>
      <Header
        nickname={user.nickname}
        dateLogin={user.updatedAt}
        logoutSystem={logoutSystem}
        message={msgNotification}
        open={open}
      />
      <Container className={classes.rootContainer} maxWidth="lg">
        {messages.length > 0 ? (
          <List className={classes.rootList}>
            {messages.map(message => (
              <ListItem
                className={classes.listItem}
                key={message._id}
                alignItems="flex-start"
              >
                <Card
                  className={
                    message.userId._id === user._id
                      ? classes.msgRight
                      : classes.msgLeft
                  }
                >
                  <ListItemText
                    className={classes.item}
                    primary={message.message}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {message.userId.nickname}
                        </Typography>
                        {" - "}
                        <Time
                          value={message.createdAt}
                          format="YYYY-MM-DD hh:mm"
                        />
                      </Fragment>
                    }
                  />
                </Card>
              </ListItem>
            ))}
          </List>
        ) : null}
        <TextFieldCommon
          message={newMessage}
          setMessage={setNewMessage}
          handleClick={handleClick}
        />
      </Container>
    </div>
  );
}
