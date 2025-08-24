export const authorInitials = (string: string) => {
  const initials = string
    .split(' ')
    .map((word) => word[0])
    .join('');

  if (initials.length <= 1) return initials;
  return initials[0] + initials[initials.length - 1];
};
