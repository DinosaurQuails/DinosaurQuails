import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    marginLeft: 100,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Nav = props => (
  <div id="nav" style={styles.root}>
    <AppBar position="static">
      <Toolbar variant="dense" >
        <IconButton id="Menu" color="inherit" aria-label="Menu" style={styles.menuButton}>
          <div>menu</div>
        </IconButton>
        <Typography variant="headline" color="inherit" id="logo" style={styles.flex}>
          <div>job.concat</div>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default Nav;