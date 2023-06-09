import React from 'react';
import classNames from 'classnames';

import './DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classNames(
    'day-list__item',
    {
      'day-list__item--selected': props.selected,
      'day-list__item--full': props.spots === 0
    }
  );


  const formatSpots = (spots) => {
    if (spots > 1) { return `${spots} spots remaining`; }
    if (spots === 1) { return `${spots} spot remaining`; }
    else { return `no spots remaining`; }
  };

  return (
    <li
      className={dayClass}
      onClick={() => props.onChange(props.name)}
      data-testid='day'>

      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li >
  );
}