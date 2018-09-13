import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { push } from "react-router-redux";
import { toJSComponent } from "./utility";
import * as actions from "./actions";
import { store } from "./store";
import Events from "./page/events";
import NoMatch from "./page/nomatch";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Events} />
            <Route component={NoMatch} />
          </Switch>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  let appLoaded = state.getIn(["common", "appLoaded"]),
    redirectTo = state.getIn(["common", "redirectTo"]);
  return {
    appLoaded,
    redirectTo
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
