import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { push } from "react-router-redux";
import { toJSComponent } from "./utility";
import * as actions from "./actions";
import { store } from "./store";
import Events from "./page/events";
import Login from "./page/login";
import NoMatch from "./page/nomatch";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { red, grey } from "@material-ui/core/colors";
import agent from "./agent";
import auth from "./authenticate";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: red,
    secondary: grey
  }
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
    if (this.props.appLoaded && this.props.user !== null) {
      return (
        <React.Fragment>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CssBaseline />
              <Switch>
                <Route exact path="/" component={Events} />
                <Route component={NoMatch} />
              </Switch>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Login />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLoaded: state.getIn(["common", "appLoaded"]),
    redirectTo: state.getIn(["common", "redirectTo"]),
    user: state.getIn(["common", "user"])
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: actions.APP_LOAD, payload, skipTracking: true }),
  onRedirect: () => dispatch({ type: actions.REDIRECT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJSComponent(App));
