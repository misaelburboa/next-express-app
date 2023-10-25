import express from "express"

import { authenticateUser } from "../services/authService.js"
import {
  InvalidCredentialsException,
  ServerException,
} from "../exceptions/exceptions.js"

export const router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const { token, expires: exp } = await authenticateUser(email, password)

    return res.status(200).json({ token, exp, email })
  } catch (error) {
    if (error instanceof InvalidCredentialsException) {
      return res.status(error.status).json({ error })
    }

    return res.status(500).json({ error })
  }
})

export { router as authRoutes }
