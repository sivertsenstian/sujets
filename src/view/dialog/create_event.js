import { toJSComponent } from "../../utility";
import { connect } from "react-redux";
import * as actions from "../../actions";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Slide,
  Grid,
  Switch,
  FormControlLabel,
  Chip,
  MenuItem
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { MODAL } from "../../enum";
import agent from "../../agent";
import Moodle from "./moodle";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  marginTop: {
    marginTop: 30
  },
  bottom: {
    position: "absolute",
    bottom: 40,
    width: 400
  },
  chip: {
    margin: theme.spacing.unit * 0.5
  },
  button: {
    marginTop: 30
  },
  moodle: {
    marginTop: 62
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateEvent extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {
      classes,
      pollForDate,
      event,
      updateField,
      inviteGuest,
      removeGuest,
      createEvent
    } = this.props;
    return (
      <div>
        <Button
          onClick={this.props.openModal}
          className={classes.fab}
          variant="fab"
          color="primary"
        >
          <AddIcon />
        </Button>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.closeModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Create new
              </Typography>
              <IconButton
                color="inherit"
                onClick={this.props.closeModal}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid container justify="center">
            <Grid item xs={8}>
              <form>
                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <TextField
                      label="Title"
                      className={classes.textField}
                      defaultValue={event.name || ""}
                      onChange={event =>
                        updateField(["name"], event.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      label="Description"
                      className={classes.textField}
                      defaultValue={event.description || ""}
                      onChange={event =>
                        updateField(["description"], event.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Location"
                      className={classes.textField}
                      defaultValue={event.location || ""}
                      onChange={event =>
                        updateField(["location"], event.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.button}>
                    <Button
                      color="secondary"
                      fullWidth={true}
                      variant="contained"
                    >
                      Upload cover photo
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="event-host">Host</InputLabel>
                      <Select
                        id="event-host"
                        value={event.host.id || ""}
                        onChange={event => {
                          updateField(["host", "id"], event.target.value);
                        }}
                      >
                        {event.invited.map(u => {
                          return (
                            <MenuItem key={u.id} value={u.id}>
                              {u.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="event-organizer">
                        Organizer
                      </InputLabel>
                      <Select
                        id="event-organizer"
                        value={event.organizer.id || ""}
                        onChange={event =>
                          updateField(["organizer", "id"], event.target.value)
                        }
                      >
                        {event.invited.map(u => {
                          return (
                            <MenuItem key={u.id} value={u.id}>
                              {u.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} className={classes.textField}>
                    <TextField
                      label="Start"
                      className={classes.textField}
                      defaultValue={event.time.start || ""}
                      onChange={event =>
                        updateField(["time", "start"], event.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.textField}>
                    <TextField
                      label="End"
                      className={classes.textField}
                      defaultValue={event.time.end || ""}
                      onChange={event =>
                        updateField(["time", "end"], event.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className={pollForDate ? classes.moodle : classes.textField}
                  >
                    {!pollForDate && (
                      <TextField
                        label="Date"
                        className={classes.textField}
                        defaultValue={event.date || ""}
                        onChange={event =>
                          updateField(["time", "date"], event.target.value)
                        }
                        margin="normal"
                      />
                    )}
                    {pollForDate && <Moodle />}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch checked={false} color="primary" />}
                      label="Automatically create workplace event"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Invite guests"
                      className={classes.textField}
                      value={event.guest || ""}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {event.invited.map(u => {
                      return (
                        <Chip
                          key={u.id}
                          avatar={<Avatar>MB</Avatar>}
                          label={u.name}
                          color="primary"
                          onDelete={() => {
                            removeGuest(u);
                          }}
                          className={classes.chip}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={6} className={classes.bottom}>
              <Button
                color="primary"
                fullWidth={true}
                variant="contained"
                onClick={() => createEvent(agent.Event.create(event))}
              >
                Create event
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.getIn(["event", "data"]),
    open: state.getIn(["event", "modal"]),
    pollForDate: state.getIn(["event", "pollForDate"])
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: () =>
    dispatch({
      type: actions.TOGGLE_MODAL,
      modal: MODAL.CREATE_EVENT,
      open: true
    }),
  closeModal: () =>
    dispatch({
      type: actions.TOGGLE_MODAL,
      modal: MODAL.CREATE_EVENT,
      open: false
    }),
  onLoad: payload =>
    dispatch({ type: actions.CREATE_EVENT_MODAL_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.CREATE_EVENT_MODAL_UNLOADED }),
  updateField: (keys, value) =>
    dispatch({ type: actions.UPDATE_EVENT_VALUE, keys, value }),
  inviteGuest: user =>
    dispatch({ type: actions.UPDATE_EVENT_INVITE_GUEST, user }),
  removeGuest: user =>
    dispatch({ type: actions.UPDATE_EVENT_INVITE_GUEST, id: user.id }),
  createEvent: payload =>
    dispatch({
      type: actions.CREATE_EVENT,
      payload
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJSComponent(withStyles(styles)(CreateEvent)));
