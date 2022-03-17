enum StatusCode {
  badRequest = 400,
  ok = 200,
  internalServerError = 500,
}

enum MessagesStatus {
  internalServerError = 'Internal server error',
  incorrectEmail = 'Incorrect email or password',
  incorrectPassword = 'Incorrect email or password',
}

export {
  StatusCode,
  MessagesStatus,
};
