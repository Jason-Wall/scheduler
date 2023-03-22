import React from 'react';
import classNames from 'classnames';

import InterviewerListItem from './InterviewerListItem';

import './InterviewerList.scss';

export default function InterviewerList(props) {


  const interviewerItems = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      onChange={() => { props.onChange(interviewer.id); }}
    />;
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}

