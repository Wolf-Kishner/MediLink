const convertTime = (time) => {
  // Split the time string into hours and minutes
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  // Determine AM/PM
  let meridiem = "am";
  if (hours >= 12) {
    meridiem = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12; // Adjust midnight hour
  }

  // Format hours and minutes
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${meridiem}`;
};

export default convertTime;
