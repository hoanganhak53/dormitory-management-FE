import React, { useState } from 'react';
import { styled } from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
    width: '100%'
});

const Input = styled('input')({
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    lineHeight: '1.4375em',
    flex: 1,
    fontFamily: `'Public Sans', sans-serif`,
    color: 'black',
    '&:hover': {
        borderColor: '#69c0ff'
    },
    '&:focus': {
        outline: 'none',
        borderColor: '#69c0ff',
        boxShadow: '0 0 0 2px #bae7ff'
    }
});

function DatePicker({ value, onChange }) {
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        onChange(event);
    };

    return (
        <Container>
            <Input type="date" id="birth" value={selectedDate} name="birth" onChange={handleDateChange} min="1997-01-01" max="2012-12-31" />
        </Container>
    );
}

export default DatePicker;
