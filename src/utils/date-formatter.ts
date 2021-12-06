// Formatting the datetime string to a 'HH:MM AMPM' format
export const getFormattedTime = (time: string) => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  // :${seconds < 10 ? `0${seconds}` : seconds}
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};
