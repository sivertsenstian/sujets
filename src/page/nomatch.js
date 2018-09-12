import {Button, Grid, Icon, Typography} from "@material-ui/core";
import Card, { CardActions, CardContent, CardMedia } from "@material-ui/core/Card";
import React, { Component } from "react";
import notfound from "./not_found.jpg";

class NoMatch extends Component {
  render() {
    return (
      <div className="not-found">
        <Grid style={{ flexGrow: 1, padding: 20 }} container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={12}>
              <Card style={{ maxWidth: 350 }}>
                <CardMedia
                  style={{ height: 0, paddingTop: "100%" }}
                  image={notfound}
                  title="404 - Not found!"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    404 - Page not found
                  </Typography>
                  <Typography component="p">
                    This page is far too silly to be shown, please turn around
                    and jump backwards
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    color="secondary"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    <Icon style={{ marginRight: 10 }}>record_voice_over</Icon>
                    Get on with it
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NoMatch;