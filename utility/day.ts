const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const currentDay = () => {
  const now = new Date();
  return days[now.getDay()];
};
