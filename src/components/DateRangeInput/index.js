import { Box, InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ArrowRightIcon, CalendarIcon } from '../icons'
import './index.scss'
function DateRangeInput(props) {
    const { onDateRangeInputClick } = props
    const handleOpenDaterangeCalendar = () => {
        onDateRangeInputClick();
    }
    return (
        <Box className="date-range-input" onClick={handleOpenDaterangeCalendar}>
            <Box>
                <InputGroup>
                    <Input isReadOnly type='input' _focusVisible={{
                        outline: "none",
                    }} value={props.startDate?.format("MM/DD/YY") ?? 'mm/dd/yy'} />
                    <InputRightElement
                        height="100%"
                        pointerEvents='none'
                        children={<CalendarIcon color='#0973EA' />}
                    />
                </InputGroup>
            </Box>
            <Box className="date-range-input-arrow-icon">
                <ArrowRightIcon />
            </Box>
            <Box>
                <InputGroup>
                    <Input isReadOnly type='tel' _focusVisible={{
                        outline: "none"
                    }} value={!props.endDate ? 'mm/dd/yy' : (props.endDate?.format("MM/DD/YY") == dayjs().format('MM/DD/YY') ? 'Today' : props.endDate?.format("MM/DD/YY"))} />
                    <InputRightElement
                        height="100%"
                        pointerEvents='none'
                        children={<CalendarIcon color='#0973EA' />}
                    />
                </InputGroup>
            </Box>

        </Box>
    )
}
export default DateRangeInput;