export const correctLogin = {
  "email": "user@user.com",
  "password": "secret_user"
};

export const loginWithoutPass = {
  "email": "user@user.com",
}

export const loginWithoutEmail = {
  "password": "secret_user"
}

export const wrongLoginPass = {
  "email": "user@user.com",
  "password": "secret"
};
export const wrongLoginPassLength = {
  "email": "user@user.com",
  "password": "sec"
};

export const wrongLoginEmail = {
  "email": "userUser.com",
  "password": "secret"
};

export const resolveLogin = {
  user: {
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com"
  },
  token: "tokenJwt"
}

export const findEmailCorrect = {
  id: 2,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}

export const findEmailWrong = null;

export const invalidToken = 'eyJhbGciOiJII1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NDc1NTYyODEsImV4cCI6MTY0NzY0MjY4MX0.Ad2zi6SkQhEaisj9X7oNI_kR2GFf-2OEB8ZnqT-I2w';
