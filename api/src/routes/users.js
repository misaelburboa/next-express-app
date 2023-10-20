import express from "express"

import { getUserById, getUsers, updateUser } from "../services/usersService.js"
import { isAuth } from "../middlewares/isAuth.js"
import { NotFoundException, ServerException } from "../exceptions/exceptions.js"

export const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const users = await getUsers()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.get("/profile", isAuth, async ({ user }, res) => {
  const { id } = user.data

  try {
    const user = await getUserById(id)
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof NotFoundException) {
      return res.status(error.status).json({ error })
    } else {
      return res.status(500).json({ error })
    }
  }
})

// TODO: validations
router.put("/profile", isAuth, async ({ user, body }, res) => {
  const { id } = user.data

  try {
    const updatedUser = await updateUser(id, body)

    return res.status(200).json(updatedUser)
  } catch (error) {
    if (error instanceof NotFoundException) {
      return res.status(error.status).json({ error })
    } else {
      return res.status(500).json({ error })
    }
  }
})

export { router as usersRoutes }
