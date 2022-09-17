import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
export default class CalendarNext extends React.Component {
  static propTypes = {
    next: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
    handleNext: PropTypes.func.isRequired
  };
  static defaultProps = {
    next: true
  };

  handleNext(calendar) {
    const { handleNext } = this.props;
    if (handleNext) {
      handleNext(calendar);
    }
  }

  render() {
    const { next, calendar } = this.props;
    const className = classNames({ next, available: next });
    const onClick = calendar ? this.handleNext.bind(this, calendar) : () => { };
    const Span = next ? <span /> : null;
    const nextProps = {
      className,
      onClick
    };

    return (
      <Box style={{ width: '100%' }} onClick={onClick}>
        < ChevronRightIcon w={20} h={20} />
      </Box>);
  }
}
