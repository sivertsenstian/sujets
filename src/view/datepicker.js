import React, { PureComponent } from "react";
import classNames from "classnames";
import { DatePicker } from "material-ui-pickers";
import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = theme => ({
  dayWrapper: {
    position: "relative"
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit"
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%"
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled
  },
  highlightNonCurrentMonthDay: {
    color: "#676767"
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  }
});

class MoodleDatePicker extends PureComponent {
  state = {
    selectedDates: []
  };

  handleWeekChange = date => {
    // this.state.selectedDates.push(date);
    console.log("SELECTED DATES:");
    console.log(this.state.selectedDates);
  };

  formatWeekSelectLabel = (date, invalidLabel) => {
    return `options: ${this.state.selectedDates.length}`;
  };

  renderSelectedDays = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;

    let highlight = _.includes(
      this.state.selectedDates.map(x => x.dayOfYear()),
      date.dayOfYear()
    );

    const wrapperClassName = classNames({
        [classes.highlight]: highlight
      }),
      dayClassName = classNames(classes.day, {
        [classes.nonCurrentMonthDay]:
          !dayInCurrentMonth || date.isSameOrBefore()
      });

    return (
      <div
        className={wrapperClassName}
        onClick={() => {
          if (dayInCurrentMonth && !date.isSameOrBefore()) {
            this.setState(s => ({
              selectedDates: [...s.selectedDates, date]
            }));
          }
        }}
      >
        <IconButton className={dayClassName}>
          <span>{date.date()}</span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDates } = this.state;

    return (
      <div className="picker">
        <DatePicker
          disablePast
          value={null}
          onChange={this.handleWeekChange}
          renderDay={this.renderSelectedDays}
          labelFunc={this.formatWeekSelectLabel}
          helperText={`Currently ${selectedDates.length} options`}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MoodleDatePicker);
