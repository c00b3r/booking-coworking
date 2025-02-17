export const getTypeOfBooking = (
  isConferenceOpen: boolean,
  isEventOpen: boolean
) => {
  return isConferenceOpen ? "conference" : isEventOpen ? "event" : "open-space";
};
