import React from 'react';

import DayListItem from './DayListItem';

export default function DayList(props) {

  const dayItemArr = props.days.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={props.value === day.name}
      onChange={props.onChange}
    />;
  });

  return (
    <ul>
      {dayItemArr}
    </ul>
  );

};
