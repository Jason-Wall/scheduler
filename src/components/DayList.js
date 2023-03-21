import React from 'react';
import classNames from 'classnames';

import DayListItem from './DayListItem';

export default function DayList(props) {

  const dayItemArr = props.days.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={props.day === day.name}
      setDay={props.setDay}
    />;
  });


  return (
    <ul>
      {dayItemArr}
    </ul>
  );

};
