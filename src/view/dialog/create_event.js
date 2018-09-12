import { toJSComponent, withNavigation } from "../../utility"; 
import { connect } from "react-redux";
import * as actions from "../../actions";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Avatar, Button, DIalog, ListItemText, ListItem, List,
	Divider, AppBar, Toolbar, IconButton, TextField,
	Typography, Slide, Dialog, Grid, Switch, FormControlLabel,
	Chip, MenuItem} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {MODAL} from "../../enum";
import * as dummy from "../../testdata";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
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
    margin: theme.spacing.unit * 0.5,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateEvent extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.resolve([dummy.users(7)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { classes, event } = this.props;
    return (
      <div>
	<Button onClick={this.props.openModal}
		className={classes.fab}
		variant="fab"
		color="primary"><AddIcon/></Button>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.closeModal}
          TransitionComponent={Transition}
          >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
		Create new
              </Typography>
              <IconButton color="inherit" onClick={this.props.closeModal} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
	  <Grid container justify="center">
	    <Grid item xs={8}>
	      <form>
		<Grid container spacing={8}> 
		  <Grid item xs={6}>
		    <TextField
		      label="Title"
		      className={classes.textField}
		      value={event.name || ""}
		      margin="normal"
		      />
		  </Grid>
		  <Grid item xs={12}>
		    <TextField
		      multiline
		      label="Description"
		      className={classes.textField}
		      value={event.description || ""}
		      margin="normal"
		      />
		  </Grid>
		  <Grid item xs={6}>
		    <TextField
		      select
		      label="Host"
		      className={classes.textField}
		      value={event.host.id || ""}
		      margin="normal"
		      >
		      {event.invited.map(u => {
			return (
			  <MenuItem key={u.id} value={u.id}>
			    {u.name}
			  </MenuItem>
			);
		      })}
		    </TextField>
		  </Grid>
		  <Grid item xs={6}>
		    <TextField
		      select
		      label="Organizer"
		      className={classes.textField}
		      value={event.organizer.id || ""}
		      margin="normal" >
		      {event.invited.map(u => {
			return (
			  <MenuItem key={u.id} value={u.id}>
			    {u.name}
			  </MenuItem>
			);
		      })}
	          </TextField>
		  </Grid>
		  <Grid item xs={6} className={classes.marginTop}>
		    <Button color="secondary" fullWidth={true} variant="contained">
		      Choose a date
		    </Button>
		  </Grid>
		  <Grid item xs={6} className={classes.marginTop}>
		    <Button color="secondary" fullWidth={true} variant="contained">
		      Poll for date
		    </Button>
		  </Grid>
		  <Grid item xs={12}>
		    <FormControlLabel
		      control={
			  <Switch
			      checked={false}
			      color="primary"
			    />}
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
			  onDelete={() => {}}
			  className={classes.chip}
			  />
		      );
		    })}
		  </Grid>
		</Grid>
	      </form>
	    </Grid>
	    <Grid item xs={6} className={classes.bottom}>
	      <Button color="primary" fullWidth={true} variant="contained">
		Create  event
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
    open: state.getIn(["event", "modal"])
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch({type: actions.TOGGLE_MODAL, modal: MODAL.CREATE_EVENT, open: true}),
  closeModal: () => dispatch({type: actions.TOGGLE_MODAL, modal: MODAL.CREATE_EVENT, open: false}),
  onLoad: payload => dispatch({ type: actions.CREATE_EVENT_MODAL_LOADED, payload }),
  onUnload: () => dispatch({ type: actions.CREATE_EVENT_MODAL_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(
  toJSComponent(withStyles(styles)(CreateEvent))
);
