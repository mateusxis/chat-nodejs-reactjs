import React, { Fragment } from "react";

import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import useStyles from "./styles";

export default function TextFieldCommon({ message, setMessage, handleClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <TextField
        className={classes.textField}
        variant="outlined"
        value={message}
        onChange={event => setMessage(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClick}>
                <Send />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Fragment>
  );
}
