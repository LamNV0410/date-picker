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
    leftCalendar: this.props.startDate ?? dayjs(),
    rightCalendar: this.props.endDate ?? dayjs().add(1, "month"),
    isDisableRightButton: false
  };

  static defaultProps = {
    position: "left"
  };

  createProps = () => {
    let { leftCalendar, rightCalendar } = this.state;
    rightCalendar = rightCalendar && rightCalendar.month() === leftCalendar?.month() ? leftCalendar?.add(1, 'month') : rightCalendar;
    const leftState = Object.assign({}, this.props, { calendar: leftCalendar });
    const rightState = Object.assign({}, this.props, {
      calendar: rightCalendar
    });

    let { type } = this.props;
    if (type) {
      if (rightState.endDate && rightState.startDate
        && rightState.endDate?.month() != rightState.startDate?.month()) {
        rightState.calendar = rightState.endDate
        leftState.calendar = rightState.startDate
        type = null;
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
    let isDisable = false;
    let rightCalendar = this.state.rightCalendar;
    if (leftCalendar && leftCalendar >= this.state.rightCalendar) {
      rightCalendar = leftCalendar.add(1, 'month');
      isDisable = true;
    }
    this.setState({
      leftCalendar,
      rightCalendar,
      isDisableRightButton: isDisable
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


export default function UnlinkedCalendarUI(props) {
  const { onDateRangeClick } = props;
  const onHandleDateRangeClick = (startDate, endDate) => {
    onDateRangeClick(startDate, endDate)
  }

  const handleClearSelection = () => {
    props.onClearSelection();
  }
  const uiProps = { ...props, component: UnlinkedCalendar }
  return (
    <PickerUI {...uiProps} onDateRangeClick={onHandleDateRangeClick} onClearSelection={handleClearSelection} />
  );
}