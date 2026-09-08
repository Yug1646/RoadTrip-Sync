export const toUserResponse = (user: {
  id: number;
  username: string;
  email: string;
}) => ({
  userId: user.id,
  username: user.username,
  email: user.email,
});

export const toUserProfileResponse = (user: {
  username: string;
  email: string;
  // TODO: Add rest of the details after phase 5
}) => ({ username: user.username, email: user.email });
