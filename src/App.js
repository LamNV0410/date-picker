import React from 'react';
import './App.scss'
import UnlinkedCalendar from './components/UnlinkedCalendar';
import { ChakraProvider, Input } from '@chakra-ui/react'
import DateRangeInput from './components/DateRangeInput/DateRangeInput'
function App() {
  const onDatesChange = ({ startDate, endDate }) => {
  }

  return (
    <>
      <div>
        <Input type='tel' placeholder='Phone number' />
      </div>
      <div className="date-range-picker-calendar">
        <UnlinkedCalendar onDatesChange={onDatesChange} showDropdowns={false} />
      </div>
    </>
  );
}

export default App;
