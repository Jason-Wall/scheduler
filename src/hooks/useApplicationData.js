import { useState, useEffect } from 'react';
import axios from 'axios';


// State management
export default function useApplicationData() {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
    interviewers: {}
  });

  //Requests for data on first load.
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((res) => {
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      });
  }, []);

  // Update spots for all days
  useEffect(() => {
    setState(prev => ({ ...prev, days: updateSpots(prev.days, prev.appointments) }));
  }, [state.appointments]);

  const setDay = (day) => setState({ ...state, day });


  //Internal functions
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(
        () => setState({ ...state, appointments })
      ));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(
        () => setState({ ...state, appointments })
      ));
  };

  const updateSpots = (days, appointments) => {
    //Check edge cases, return early if no appointments
    if (Object.keys(appointments).length === 0) {
      return [];
    }

    // Loop through all days and appointments.
    let daysArr = [];
    for (let entry of days) {
      let spotCount = 0;
      for (let appointment of entry.appointments) {
        if (!appointments[appointment].interview) {
          spotCount++;
        }
      }

      const dayObj = { ...entry, spots: spotCount };
      daysArr.push(dayObj);
    }
    return daysArr;
  };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
  };
};