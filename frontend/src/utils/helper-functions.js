export const formatDuration = (durationMs = 0) => {
  // Calculate total seconds
  const totalSeconds = Math.floor(durationMs / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad seconds with leading zero if necessary
  const paddedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted string
  return `${minutes}:${paddedSeconds}`;
};

export const getCustomInitials = (name = "") => {
  const parts = name.split(" ");

  // For multiple words, take first letter of the first word and first letter of second word
  if (parts.length > 1) {
    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  } else {
    return parts[0].charAt(0).toUpperCase() + parts[0].charAt(1).toUpperCase();
  }
};
