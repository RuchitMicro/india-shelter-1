import { useState } from 'react';
import { DatePicker } from './components';

function App() {
  const [startDate, setStartDate] = useState();

  return (
    <div className='bg-white h-full rss-backdrop min-h-full p-4'>
      <DatePicker startDate={startDate} setStartDate={setStartDate} />
    </div>
  );
}

export default App;
