import React from "react";

// Import components:
import DayList from './DayList';
import Appointment from './Appointment';

//Import helpers and hooks
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';

// Import CSS
import "components/Application.scss";


// MAIN FUNCTION
export default function Application(props) {

  // State management and functions
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  // Supporting Data
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day);


  const scheduleArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />;
  });


  //Component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleArr}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
};
