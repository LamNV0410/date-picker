import { Box, InputGroup, InputRightElement, Input } from "@chakra-ui/react";
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
                    <Input isReadOnly type='input' placeholder='mm/dd/yyyy' _focusVisible={{
                        outline: "none",
                    }} value={props.startDate} />
                    <InputRightElement
                        height="100%"
                        pointerEvents='none'
                        children={<ArrowRightIcon />}
                    />
                </InputGroup>
            </Box>
            <Box className="date-range-input-arrow-icon">
                <ArrowRightIcon />
            </Box>
            <Box>
                <InputGroup>
                    <Input isReadOnly type='tel' placeholder='mm/dd/yyyy' _focusVisible={{
                        outline: "none"
                    }} value={props.endDate} />
                    <InputRightElement
                        height="100%"
                        pointerEvents='none'
                        children={<ArrowRightIcon />}
                    />
                </InputGroup>
            </Box>

        </Box>
    )
}
export default DateRangeInput;