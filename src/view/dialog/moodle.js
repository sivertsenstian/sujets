import { toJSComponent } from "../../utility";
import { connect } from "react-redux";
import * as actions from "../../actions";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { MODAL } from "../../enum";
import DatePicker from "../datepicker";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  bottom: {
    position: "absolute",
    bottom: 40,
    width: 400
  }
});

class Moodle extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    // const { classes, event, moodle } = this.props;
    return <DatePicker />;
  }
}

const mapStateToProps = state => {
  return {
    event: state.getIn(["event", "data"]),
    moodle: state.getIn(["event", "moodle"]),
    open: state.getIn(["event", "moodleModal"])
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: () =>
    dispatch({
      type: actions.TOGGLE_MODAL,
      modal: MODAL.CREATE_MOODLE,
      open: true
    }),
  closeModal: () =>
    dispatch({
      type: actions.TOGGLE_MODAL,
      modal: MODAL.CREATE_MOODLE,
      open: false
    }),
  onLoad: payload =>
    dispatch({ type: actions.CREATE_MOODLE_MODAL_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.CREATE_MOODLE_MODAL_UNLOADED })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJSComponent(withStyles(styles)(Moodle)));
