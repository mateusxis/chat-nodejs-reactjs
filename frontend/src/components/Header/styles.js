import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default makeStyles(theme => ({
  rootHeader: {
    color: "#6d6f72",
    backgroundColor: "#FFF"
  },
  logo: {
    height: "40px"
  },
  navbar: {
    width: "100%"
  },
  logout: {
    position: "fixed",
    right: 0,
    paddingRight: theme.spacing(1)
  },
  dataUser: {
    marginLeft: theme.spacing(1)
  },
  item: {
    margin: 0,
    padding: 0,
    fontSize: theme.spacing(1.5)
  },
  itemName: {
    margin: 0,
    padding: 0,
    fontSize: theme.spacing(3)
  },
  paper: {
    marginLeft: "10px",
    backgroundColor: green[200]
  }
}));
