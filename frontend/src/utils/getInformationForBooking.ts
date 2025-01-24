export default function getInformationForBooking(
  type: string,
  information: number | null,
  numberOfConference: number | null
) {
  let string = "";
  switch (type) {
    case "open-space":
      string = `${information} Чел.`;
      break;
    case "conference":
      string = `№${numberOfConference} ${information} Чел.`;
      break;
    case "event":
      string = `В ожидании согласования`;
      break;
    default:
      break;
  }
  return string;
}
