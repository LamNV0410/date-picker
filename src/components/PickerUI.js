import React from "react";
import { Box } from "@chakra-ui/react"
import { interval } from "./utils";
import { getDefaultState } from "./utils";
import DefinedRange from './DefinedRange'
import dayjs from "dayjs";
import { ClearIcon, ArrowRightIcon } from './icons'
export default class PickerUI extends React.Component {
    state = getDefaultState();
    onDayMouseEnter = (day) => {
        const { startDate, endDate } = this.state;
        const range = (day >= startDate) ? endDate || day : startDate;
        this.setState({ range });
    }

    onDayClick = (day) => {
        this.onClearSelection();
        const isOpen = this.state.closedOrOpen === interval.OPEN;
        const startDate = isOpen && this.state.startDate ? this.state.startDate : day;
        const endDate = isOpen && day >= startDate ? day : null;
        const range = endDate || startDate;
        const closedOrOpen = isOpen && day >= startDate ? interval.CLOSED : interval.OPEN;
        this.setState({
            startDate,
            endDate,
            closedOrOpen,
            range
        });
    }
    onClearSelection = () => {
        const day = null;
        const state = getDefaultState();
        const isOpen = state.closedOrOpen === interval.CLOSED;
        const { startDate, endDate } = state
        const range = null;
        const closedOrOpen = isOpen && day >= startDate ? interval.CLOSED : interval.OPEN;
        this.setState({
            startDate,
            endDate,
            closedOrOpen,
            range,
            type: null
        });
    }
    
    dateLabel = () => {
        const { startDate, endDate } = this.state;
        this.props.onDateRangeClick(this.state.startDate, this.state.endDate)
        return (
            <Box className="display-date-range">
                {
                    startDate && endDate ?
                        (
                            <>
                                <span>
                                    {startDate.format("DD/MM/YYYY")}
                                </span>
                                <ArrowRightIcon />
                                <span>
                                    {endDate.format("DD/MM/YYYY")}
                                </span>
                            </>
                        ) : 'Select a start date'
                }
            </Box >
        );
    }
    onActiveClicked = (id, value) => {
        this.renderDate(id);
    }

    onDefinedRangeClick = (from, to, id) => {
        const isOpen = this.state.closedOrOpen == interval.OPEN;
        const startDate = from;
        const endDate = to;
        const range = startDate || endDate;
        const closedOrOpen = interval.CLOSED;
        this.setState({
            startDate,
            endDate,
            closedOrOpen,
            range,
            type: id
        });
    }

    renderDate = (id) => {
        const calendar = dayjs();
        this.onClearSelection();
        let toDate = calendar.clone();
        let fromDate = calendar.clone();
        switch (id) {
            case 1:
                toDate = calendar;
                fromDate = calendar.add(-1, 'day');
                break;
            case 2:
                fromDate = toDate.add(-7, 'day');
                break;
            case 3:
                fromDate = toDate.add(-14, 'day');
                break;
            case 4:
                fromDate = toDate.add(-30, 'day');
                break;
            case 5:
                fromDate = toDate.add(-60, 'day');
                break;
            case 6:
                fromDate = toDate.add(-90, 'day');
                break;
            default:
                break;
        }
        this.onDefinedRangeClick(fromDate, toDate, id)
    }

    render() {
        const { onDayClick, onDayMouseEnter } = this;
        const props = { onDayClick, onDayMouseEnter, ...this.state, ...this.props };

        const { component: Component } = this.props;
        return (
            <>
                <Box style={{ display: 'inline-flex' }}>
                    <DefinedRange onActiveClicked={this.onActiveClicked} />
                    <Component {...props} />
                </Box>
                <div className="drp-buttons">
                    <span className="drp-selected">{this.dateLabel() == '' ? 'Select a start date' : this.dateLabel()}</span>
                    <Box className="clear-btn btn btn-sm btn-primary" onClick={this.onClearSelection}>
                        <Box>
                            <ClearIcon />
                        </Box>
                        <Box>Clear selection</Box>
                    </Box>
                </div>
            </>
        )
    }
}
