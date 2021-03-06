import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentByDate from './AppointmentsByDate/AppointmentByDate';
import Sidebar from './Sidebar/Sidebar';


const containerStyle = {
    backgroundColor : "#F4FDFB",
    height : "100%"
}

const Dashboard = () => {
    const [selectedDate,setSelectedDate] = useState((new Date().toDateString()))
    const [appointments,setAppointments] = useState([])

    const handleDateChange = (date) =>{
        setSelectedDate(date.toDateString());
    }

    useEffect(()=>{
        fetch('http://localhost:5000/appointmentsByDate', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({date:selectedDate})
        })
        .then(res=>res.json())
        .then(data => setAppointments(data))
    },[selectedDate])
    
    return (
        <section>
            <div style={containerStyle} className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-5 mt-5">
                    <Calendar
                        className="mt-4 ml-4"
                        onChange={handleDateChange}
                        value={new Date()}
                    />
                </div>
                <div className="col-md-5 mt-5">
                    <AppointmentByDate appointments={appointments}></AppointmentByDate>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;