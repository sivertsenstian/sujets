import { toJSComponent, withNavigation } from "../utility"; 
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Button, Grid, Icon, Toolbar,
        IconButton, Typography, Avatar, Divider,
	Table, TableBody, TableHead, TableRow, TableCell, Paper
       } from "@material-ui/core";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "@material-ui/core/Card";
import * as actions from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { Component } from "react";
import Moment from "react-moment";
import * as dummy from "../testdata";
import { EVENT_STATUS } from "../enum";
import CreateEvent from "../view/dialog/create_event";


const styles = theme => ({
});

const EventTable = ({events}) => {
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
	{events.map(({id, name, date, status,
		      host, organizer, invited}) => {
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
			  </TableRow>);
		      })}
    </TableBody>
    </Table>
  );
};

class Events extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.resolve(dummy.events));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { planned, upcoming, previous, classes } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography style={{ flex: 1 }} variant="title" color="inherit">
              Fagmiles
            </Typography>
            <Button color="secondary" variant="contained">Login</Button>
          </Toolbar>
        </AppBar>
	<div style={{padding: 20}}>
          <Grid style={{ flexGrow: 1 }} container spacing={16} justify="center">
            <Grid item xs={10}>
              <Grid container spacing={8}>
		<Typography variant="headline">Planned</Typography>
		<EventTable events={planned}/>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={8}>
		<Typography variant="headline">Upcoming</Typography>
		<EventTable events={upcoming}/>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={8}>
		<Typography variant="headline">Previous</Typography>
		<EventTable events={previous}/>
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
    planned: state.get("events").filter(x => x.get("status") === EVENT_STATUS.PLANNED),
    upcoming: state.get("events").filter(x => x.get("status") === EVENT_STATUS.UPCOMING),
    previous: state.get("events").filter(x => x.get("status") === EVENT_STATUS.PAST)
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: actions.EVENTS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.EVENTS_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(
  toJSComponent(withStyles(styles)(Events))
);
