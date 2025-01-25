export default function convertDate(startDate: string, endDate: string) {
  // "startTime": "2025-01-31 13:00",
  //     "endTime": "2025-01-31 18:00",
  const date = startDate.split(" ")[0].split("-").reverse().join(".");
  const time = `${startDate.split(" ")[1]} — ${endDate.split(" ")[1]}`;
  return `${date} ${time}`;
}
