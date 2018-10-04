import React from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import "typeface-roboto";
import App from "./app";
import { history, store } from "./store";
import * as auth from "./authenticate";

Moment.globalFormat = "DD/MM/YYYY";

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default;
    render(NextApp);
  });
}
