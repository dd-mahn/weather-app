export function formatDay(datetime: string) {
  // datetime format: "YYYY-MM-DD"
  const dateArr = datetime.split("-");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`);
  return [
    `${days[date.getDay()]}`,
    `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`,
  ];
}

export function formatTime(datetime: string) {
  // datetime format: "10:00:00"
  const timeArr = datetime.split(":");
  const hours = parseInt(timeArr[0]);
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hours % 12}:${timeArr[1]} ${ampm}`;
}

export function getTimeState(datetime: string) {
  const hour = parseInt(datetime.split(":")[0]);
  return hour >= 5 && hour < 7
    ? "dusk"
    : hour >= 7 && hour <= 17
    ? "morning"
    : hour > 17 && hour < 19
    ? "dusk"
    : "night";
}
