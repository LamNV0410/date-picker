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
    setStartDate(startDate)
    setEndDate(endDate);
    if (startDate && endDate) setIsOpenCalendar(false);
  }

  const handleClearSelection = () => {
    setStartDate(null)
    setEndDate(null)
  }
  return (
    <ChakraProvider>
      <Box className='date-range-input-wrapper'>
        <DateRangeInput onDateRangeInputClick={onDateRangeInputClick} startDate={startDate} endDate={endDate} />
        {
          isOpenCalendar && <Box className="date-range-picker-calendar">
            <UnlinkedCalendar showDropdowns={false} onDateRangeClick={onDateRangeClick} onClearSelection={handleClearSelection} startDate={startDate} endDate={endDate} />
          </Box>
        }
      </Box>
    </ChakraProvider>
  );
}

export default App;
