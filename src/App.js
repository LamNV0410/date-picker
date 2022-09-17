import React, { useState } from 'react';
import './App.scss'
import UnlinkedCalendar from './components/UnlinkedCalendar';
import { Box, ChakraProvider } from '@chakra-ui/react'
import DateRangeInput from './components/DateRangeInput'
function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const onDateRangeInputClick = () => {
    setIsOpenCalendar(!isOpenCalendar);
  }
  const onDateRangeClick = (startDate, endDate) => {
    setStartDate(startDate?.format("DD/MM/YY"))
    setEndDate(endDate?.format("DD/MM/YY"));
  }
  return (
    <ChakraProvider>
      <Box className='date-range-input-wrapper'>
        <DateRangeInput onDateRangeInputClick={onDateRangeInputClick} startDate={startDate} endDate={endDate} />
        {
          isOpenCalendar && <Box className="date-range-picker-calendar">
            <UnlinkedCalendar showDropdowns={false} onDateRangeClick={onDateRangeClick} />
          </Box>
        }
      </Box>
    </ChakraProvider>
  );
}

export default App;
