export default function forceMeridianWhitespace(datetime: string): string {
  const meridiem = datetime.slice(-2).toLowerCase();
  let corrected;
  if (meridiem === 'am' || meridiem === 'pm') {
    corrected = `${datetime.slice(0, datetime.length - 2)} ${meridiem}`;
  } else {
    corrected = datetime;
  }
  return corrected;
}
