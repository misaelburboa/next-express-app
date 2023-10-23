import jwt from "jsonwebtoken"

// TODO: add it to the environment variables
const secretKey = "mySuperSecretKey"
export const useIsTokenValid = (token) => {
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return false
    }

    return true
  })
}
