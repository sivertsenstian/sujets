import {
  AppBar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "../actions";
import { toJSComponent } from "../utility";
import CreateEvent from "../view/dialog/create_event";
import agent from "../agent";

const styles = theme => ({});

const EventTable = ({ events }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Host</TableCell>
          <TableCell>Organizer</TableCell>
          <TableCell numeric>Invited</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map(({ id, name, date, status, host, organizer, invited }) => {
          return (
            <TableRow key={`event-${id}`}>
              <TableCell>{name}</TableCell>
              <TableCell>
                <Moment>{date}</Moment>
              </TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>{host.name}</TableCell>
              <TableCell>{organizer.name}</TableCell>
              <TableCell numeric>{invited.length}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

class Events extends Component {
  componentWillMount() {
    this.props.onLoad(agent.Event.all());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { events } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography style={{ flex: 1 }} variant="title" color="inherit">
              Fagmiles
            </Typography>
            <Button color="secondary" variant="contained">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          <Grid style={{ flexGrow: 1 }} container spacing={16} justify="center">
            <Grid item xs={10}>
              <Grid container spacing={8}>
                <Typography variant="headline">Events</Typography>
                <EventTable events={events} />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <CreateEvent />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.get("events")
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: actions.EVENTS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.EVENTS_PAGE_UNLOADED })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJSComponent(withStyles(styles)(Events)));
