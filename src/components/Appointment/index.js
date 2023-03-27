import React from 'react';

//Import hooks
import useVisualMode from '../../hooks/useVisualMode';

//Components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

//CSS
import './styles.scss';

//Constants
const EMPTY = 'Empty';
const SHOW = 'Show';
const CREATE = 'Create';
const SAVING = 'Saving';
const EDIT = 'Edit';
const DELETECONFIRM = 'Confirm';
const DELETING = 'Deleting';


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function onEdit() {
    transition(EDIT);
  }

  function onDelete() {
    transition(DELETECONFIRM);
  }

  function deleteConfirm() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }


  // JSX
  return (
    <article className="appointment"> <Header time={props.time} />
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)} />}

      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={onEdit}
        onDelete={onDelete} />}

      {(mode === CREATE) && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(name, interview) => {
          save(name, interview);
        }} />}

      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}

        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(name, interview) => {
          save(name, interview);
        }} />}

      {mode === SAVING && <Status
        message={'Saving'} />}

      {mode === DELETING && <Status
        message={'Deleting'} />}

      {mode === DELETECONFIRM && <Confirm
        message={'Are you sure you want to delete this appointment?'}
        onCancel={() => back()}
        onConfirm={() => deleteConfirm()} />}


    </article>
  );
}

