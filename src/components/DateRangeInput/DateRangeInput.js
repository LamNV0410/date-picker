import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

function DateRangeInput() {
    return (
        <Box>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<PhoneIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Phone number' />
            </InputGroup>

            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                />
            </InputGroup>
        </Box>
    )
}
export default DateRangeInput;