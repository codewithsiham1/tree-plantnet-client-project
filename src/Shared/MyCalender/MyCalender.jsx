import React, { useState } from 'react';
import { Calendar } from 'react-date-range';

const MyCalender = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Calendar date={date} onChange={setDate} color='#4cc718'/>
        </div>
    );
};

export default MyCalender;