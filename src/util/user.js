export const userFullName = (user: { Profile: {} }) => {
  const userPrefix = user.Profile.Prefix || '';
  const userFirstName = user.Profile.FirstName || '';
  const userLastName = user.Profile.LastName || '';
  const userSuffix = user.Profile.Suffix || '';
  return `${userPrefix} ${userFirstName} ${userLastName} ${userSuffix}`;
};
