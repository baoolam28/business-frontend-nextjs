const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("vi-VN", options);
};

export default convertTimestampToDate;