
export default function formatDate(
  timestamp: Date | EpochTimeStamp,
  separator = "/"
) {
  const date = new Date(timestamp);
  const day = date.getUTCDay();
  const month = date.getUTCMonth();
  const year = date.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}