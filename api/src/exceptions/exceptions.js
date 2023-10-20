function ForbiddenException() {
  this.message = "Forbidden Credentials"
  this.name = "ForbiddenCredentialsException"
  this.status = 403
}

function InvalidCredentialsException() {
  this.message = "Invalid Credentials"
  this.name = "InvalidCredentialsException"
  this.status = 401
}

function NotFoundException() {
  this.message = "Not Found"
  this.name = "NotFoundException"
  this.status = 404
}

function ServerException(message) {
  this.message = message
  this.name = "ServerException"
  this.status = 500
}

export {
  ForbiddenException,
  InvalidCredentialsException,
  NotFoundException,
  ServerException,
}
