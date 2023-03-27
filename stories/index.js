import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "../src/components/Button";
import DayListItem from "../src/components/DayListItem";
import DayList from '../src/components/DayList.js';
import InterviewerListItem from '../src/components/InterviewerListItem';
import InterviewerList from '../src/components/InterviewerList';
//Appointment components
import Appointment from '../src/components/Appointment';
import Header from '../src/components/Appointment/Header';
import Empty from '../src/components/Appointment/Empty';
import Show from '../src/components/Appointment/Show';
import Confirm from '../src/components/Appointment/Confirm';
import Status from '../src/components/Appointment/Status';
import Error from '../src/components/Appointment/Error';
import Form from '../src/components/Appointment/Form';


// Button
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// Day List Item
storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" onChange={action("setDay")} spots={5} />
  ));

//Day List - Dummy Data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

//Day List
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

//Interviewer List Item
const interviewer = {
  id: 1,
  name: "Sylvia Palm",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      onChange={() => action("setInterviewer")(interviewer.id)}
    />
  ));

// Interviewer List
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf('Appointment', module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#FFFFFF", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add('Appointment with time', () => (
    <Appointment
      time='12pm' />
  ))
  .add("Header", () => <Header time='12pm' />)
  .add('Empty', () => (
    <Empty onAdd={action('Clicked Empty')} />
  ))
  .add('Show', () => (
    <Show
      student={'Lydia Miller'}
      interviewer={interviewer}
      onEdit={action('Clicked onEdit')}
      onDelete={action('Clicked Delete')} />
  ))
  .add('Confirm', () => (
    <Confirm
      message={'Delete Appointment?'}
      onConfirm={action('Clicked Confirm')}
      onCancel={action('Clicked Cancel')} />
  ))
  .add('Status', () => (
    <Status message={'Deleting'} />
  ))
  .add('Error', () => (
    <Error
      message={'Could not delete'}
      onClose={action('onClose Clicked')} />
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));

storiesOf('Form', module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add('Edit', () => (
    <Form
      student={'Jason'}
      interviewer={2}
      interviewers={interviewers}
      onSave={action('onSave fn')}
      onCancel={action('onCancel fn')}
    />
  ))
  .add('Create', () => (
    <Form
      interviewers={interviewers}
      onSave={action('onSave fn')}
      onCancel={action('onCancel fn')}
    />
  ))

