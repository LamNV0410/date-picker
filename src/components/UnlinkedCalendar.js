import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { dayjs } from "./utils";
import { Table } from "./Table";
import CalendarBody from "./CalendarBody";
import CalendarHead from "./CalendarHead";
import PickerUI from "./PickerUI";

class UnlinkedCalendar extends React.Component {
  static propTypes = {
    opens: PropTypes.string.isRequired,
    position: PropTypes.string
  };

  state = {
    leftCalendar: dayjs(),
    rightCalendar: dayjs().add(1, "month"),
    isDisableRightButton: true
  };

  static defaultProps = {
    position: "left"
  };

  createProps = () => {
    const { leftCalendar, rightCalendar } = this.state;
    const leftState = Object.assign({}, this.props, { calendar: leftCalendar });
    const rightState = Object.assign({}, this.props, {
      calendar: rightCalendar
    });

    let { type } = this.props
    if (type) {
      if (rightState.endDate && rightState.startDate && rightState.endDate?.month() != rightState.startDate?.month()) {
        rightState.calendar = rightState.endDate
        leftState.calendar = rightState.startDate
      }
    }
    const {
      handlePrev,
      handleNext
    } = this;
    return {
      leftProps: {
        handlePrev,
        handleNext: handlePrev,
        handleSelected: handlePrev,
        ...leftState,
        showWeekNumbers: false,
        position: 'left',
        opens: 'left'
      },
      rightProps: {
        handleSelected: handleNext,
        handlePrev: handleNext,
        handleNext,
        ...rightState,
        showWeekNumbers: false,
        position: 'right',
        opens: 'right'
      }
    };
  };

  handlePrev = leftCalendar => {
    if (leftCalendar && leftCalendar >= this.state.rightCalendar) {
      const rightCalendar = leftCalendar.add(1, "month")
      this.setState({
        rightCalendar
      });
    }

    this.setState({
      leftCalendar
    });
  };

  handleNext = rightCalendar => {
    let isDisable = false;
    if (rightCalendar && rightCalendar <= this.state.leftCalendar.add(1, 'month')) {
      isDisable = true;
    }
    this.setState({
      rightCalendar,
      isDisableRightButton: isDisable
    });
  };

  renderTable = () => {
    const props = this.createProps();
    const { leftProps, rightProps } = props;
    const className = classNames({
      "drp-calendar": true,
      left: true
    });
    const className2 = classNames({
      "drp-calendar": true,
      right: true
    });
    return [
      <div className={className} key={0}>
        <div className="calendar-table">
          <Table className="table-condensed">
            <CalendarHead {...leftProps} />
            <CalendarBody {...leftProps} />
          </Table>
        </div>
      </div>,
      <div className={className2} key={1}>
        <div className={this.state.isDisableRightButton ? 'calendar-table prev-right-disable' : 'calendar-table'}>
          <Table className="table-condensed">
            <CalendarHead {...rightProps} />
            <CalendarBody {...rightProps} />
          </Table>
        </div>
      </div>
    ];
  };

  render() {
    const { opens, children } = this.props;
    const className = classNames({
      [`opens${opens}`]: true,
      "daterangepicker ltr show-calendar": true
    });
    return (
      <div
        className={className}
        style={{
          left: "auto"
        }}
      >
        {this.renderTable()}
        {children}
      </div>
    );
  }
}


export default class UnlinkedCalendarUI extends React.Component {
  render() {
    const uiProps = { ...this.props, component: UnlinkedCalendar }
    return (
      <>
        <PickerUI {...uiProps} />
      </>
    );
  }
}