import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  Typography,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "../actions";
import { toJSComponent } from "../utility";
import agent from "../agent";
import auth from "../authenticate";
import logo from "./logo.png";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 12,
    ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8
  },
  button: {
    marginTop: theme.spacing.unit * 14,
    width: "100%"
  },
  logo: {
    marginTop: theme.spacing.unit * 8,
    textAlign: "center"
  }
});

const LoginCard = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root} elevation={4} square>
      <div className={classes.logo}>
        <img width="150" src={logo} alt="Fagmiles" />
      </div>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => {
          auth().signIn();
        }}
      >
        Click to log In
      </Button>
    </Paper>
  );
};

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    // Redirect on login..
    if (this.props.user === null && nextProps.user !== null) {
      nextProps.redirectToRoot();
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography style={{ flex: 1 }} variant="title" color="inherit">
              Fagmiles - Please log in
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          <Grid style={{ flexGrow: 1 }} container spacing={16} justify="center">
            <Grid item xs={10}>
              <Grid container spacing={8} justify="center">
                <Grid item xs={5}>
                  <LoginCard classes={this.props.classes} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.getIn(["common", "user"]),
    token: state.getIn(["common", "token"])
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: actions.LOGIN_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.LOGIN_PAGE_UNLOADED }),
  redirectToRoot: () => dispatch({ type: actions.REDIRECT_TO, to: "/" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJSComponent(withStyles(styles)(Login)));
