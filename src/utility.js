import React, { Component } from "react";
import { isCollection } from "immutable";
import { connect } from "react-redux";
import { push } from "react-router-redux";

export const toJSComponent = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = isCollection(
        wrappedComponentProp[VALUE]
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE];
      return newProps;
    },
    {}
  );
  return <WrappedComponent {...propsJS} />;
};

export const withNavigation = WrappedComponent => {
  class Navigate extends Component {
    constructor(props) {
      super(props);
      this.navigate = this.navigate.bind(this);
      this.wrappedProps = Object.entries(this.props)
        .filter(([key]) => ["dispatch", "to"].indexOf(key) === -1)
        .reduce((newProps, [k, v]) => {
          newProps[k] = v;
          return newProps;
        }, {});
    }

    navigate(event) {
      event.stopPropagation();
      this.props.dispatch(push(this.props.to));
    }

    render() {
      return (
        <WrappedComponent onClick={this.navigate} {...this.wrappedProps} />
      );
    }
  }
  return connect()(Navigate);
};
