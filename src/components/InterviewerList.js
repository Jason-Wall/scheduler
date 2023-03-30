import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from './InterviewerListItem';

import './InterviewerList.scss';

function InterviewerList(props) {


  const interviewerItems = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.name}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      onChange={() => { props.onChange(interviewer.id); }}
    />;
  });


  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interviewerItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
