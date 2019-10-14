import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  rootList: {
    marginTop: "55px !important"
  },
  logo: {
    height: "40px"
  },
  navbar: {
    display: "flex"
  },
  navclick: {
    display: "flex",
    justifyContent: "flex-end"
  },
  textField: {
    position: "fixed",
    bottom: "0px"
  },
  inline: {
    display: "inline"
  },
  item: {
    margin: "6px !important"
  },
  rootContainer: {
    height: "100%"
  },
  mainContainer: {
    height: "100%"
  },
  listItem: {
    display: "flex",
    flexDirection: "column"
  },
  msgRight: {
    alignSelf: "flex-end",
    flex: 1,
    backgroundColor: "#cadb2c85"
  },
  msgLeft: {
    alignSelf: "flex-start",
    flex: 1,
    backgroundColor: "#49acc075"
  }
}));
