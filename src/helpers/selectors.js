
export const getAppointmentsForDay = (state, day) => {
  let apptList = [];
  for (const entry of state.days) {
    if (entry.name === day) {
      apptList = [...entry.appointments];
    }
  }

  let apptArr = apptList.map((apptId) => {
    return state.appointments[apptId];
  });


  return apptArr;
};


export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  let interviewDetail = { ...interview };
  const interviewerId = interview.interviewer;
  const interviewerDetail = state.interviewers[interviewerId];
  interviewDetail.interviewer = { ...interviewerDetail };

  return interviewDetail;
}

