import React from "react";
import classNames from 'classnames';

import './InterviewerListItem.scss';

//Props:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer


export default function InterviewerListItem(props) {
  const classes = classNames(
    'interviewers__item',
    { 'interviewers__item--selected': props.selected });



  return (
    <li className={classes} onClick={() => { props.setInterviewer(props.id); }}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};