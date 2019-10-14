import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Time from "react-time-format";
import { AppBar, Toolbar, List, ListItem, Paper, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

import useStyles from "./styles";

import logo from "../../assets/logo.svg";

export default function Header({ nickname, dateLogin, logoutSystem, open, message }) {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar className={classes.rootHeader}>
        <Toolbar className={classes.navbar}>
          <Link to="/">
            <img className={classes.logo} src={logo} alt="Chat+" />
          </Link>
          <List className={classes.dataUser}>
            <ListItem className={classes.itemName}>{nickname}</ListItem>
            <ListItem className={classes.item}>
              {"First login: "}
              <Time value={dateLogin} format="hh:mm" />
            </ListItem>
          </List>
          {open ? 
            <Paper className={classes.paper}>
              <Typography component="p">
                {message}
              </Typography>
            </Paper>
            : null}
          <Link className={classes.logout} to="/" onClick={logoutSystem}>
            Logout <ExitToApp />
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
