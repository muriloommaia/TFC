enum StatusCode {
  badRequest = 400,
  ok = 200,
  internalServerError = 500,
  unauthorized = 401,
  created = 201,
}

enum MessagesStatus {
  internalServerError = 'Internal server error',
  incorrectEmail = 'Incorrect email or password',
  incorrectPassword = 'Incorrect email or password',
  allFieldsFilled = 'All fields must be filled',
  tokenNotFound = 'Token not found',
  invalidToken = 'invalid token',
  clubNotFound = 'Club not found',
}

export {
  StatusCode,
  MessagesStatus,
};
