import React from 'react';
import './App.scss'

import UnlinkedCalendar from './components/UnlinkedCalendar';
function App() {
  const onDatesChange = ({ startDate, endDate }) => {
  }
  return (
    <div className="date-range-picker-calendar">
      <UnlinkedCalendar onDatesChange={onDatesChange} showDropdowns={false} />
    </div>
  );
}

export default App;
