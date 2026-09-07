export const toUserResponse = (user: {
  id: number;
  username: string;
  email: string;
}) => ({
  userId: user.id,
  username: user.username,
  email: user.email,
});

export const toAuthResponse = (
  user: {
    id: number;
    username: string;
    email: string;
  },
  token: string,
) => ({
  token,
  user: toUserResponse(user),
});
