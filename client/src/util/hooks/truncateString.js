const truncateString = (yourString, maxLength) => {
  // get the index of space after maxLength
  const index = yourString.indexOf(" ", maxLength);
  return index === -1 ? yourString : yourString.substring(0, index);
};

export default truncateString;
