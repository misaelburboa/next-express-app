import jwt from "jsonwebtoken"

import { getUsers } from "./usersService.js"
import {
  InvalidCredentialsException,
  ServerException,
} from "../exceptions/exceptions.js"

// TODO: add this to the process.env
const secretKey = "mySuperSecretKey"

export const authenticateUser = async (email, password) => {
  const users = await getUsers()

  const user = users.find(
    (user) => user.email === email && user.password === password
  )

  if (!user) {
    throw new InvalidCredentialsException()
  }

  const expires = Math.floor(Date.now() / 1000) + 60 * 60
  return {
    token: jwt.sign(
      {
        // Expires in 1hr
        exp: expires,
        data: { id: user._id, email: user.email },
      },
      secretKey
    ),
    expires,
  }
}
