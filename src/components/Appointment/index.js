import React, { Fragment } from 'react';

//Components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


//CSS
import './styles.scss';



export default function Appointment(props) {



  return (
    <article className="appointment"> <Header time={props.time} />
      {props.interview
        ? <Show student={props.interview.student} interviewer={props.interview.interviewer} />
        : <Empty />}
    </article>
  );
}

