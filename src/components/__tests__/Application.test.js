import React from "react";

import {
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import axios from '../../__mocks__/axios';

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {

  it('Defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText('Monday'));
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Sylvia Palmer'));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render page
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Verify that one spot is available
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

    // Establish 'appointment' as a DOM variable for use throughout
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[1];

    // Start cancellation process
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(getByText(appointment, /are you sure you want to delete this appointment/i)).toBeInTheDocument();

    // Confirm cancellation
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));

    // Verify the spots remaining has updated.
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();

  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render Application
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Verify that one spot is available
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

    // Establish 'appointment' as a DOM variable for use throughout
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[1];

    // Start edit process - Update student and interviewer
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: 'Bilbo Baggins' }
    });
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));

    //Save
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Bilbo Baggins'));

    // Verify the spots remaining is unchanged.
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //Render Application
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // Establish 'appointment' as a DOM variable for use throughout
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // Create new appointment
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // Save
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // Verify save error is presented
    await waitForElement(() => getByText(appointment, 'Could not save your appointment'));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Render Application
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // Establish 'appointment' as a DOM variable for use throughout
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[1];

    //Delete appointment
    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    // Verify delete error is presented
    await waitForElement(() => getByText(appointment, 'Could not cancel your appointment'));
  });


}
)

