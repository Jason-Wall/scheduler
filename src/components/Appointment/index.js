import React, { Fragment } from 'react';

//Import hooks
import useVisualMode from '../../hooks/useVisualMode';

//Components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

//CSS
import './styles.scss';

//Constants
const EMPTY = 'Empty';
const SHOW = 'Show';
const CREATE = 'Create';


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment"> <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer} />
      }
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} />}
    </article>
  );
}

