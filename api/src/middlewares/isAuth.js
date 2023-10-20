import jwt from "jsonwebtoken"

// TODO: add it to the environment variables
const secretKey = "mySuperSecretKey"

export const isAuth = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"]

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Forbidden" })
  }

  const [, token] = authorizationHeader.split(" ")

  if (!token) {
    return res.status(401).json({ error: "Forbidden" })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" })
    }

    req.user = user

    next()
  })
}
