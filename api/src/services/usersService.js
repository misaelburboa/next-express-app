import { getConnection } from "../db/config.js"
import { NotFoundException } from "../exceptions/exceptions.js"

export const getUsers = async () => {
  try {
    return getConnection().data.users
  } catch (error) {
    console.error(error)
  }

  return users
}

export const getUserById = async (id) => {
  const users = await getUsers()

  const user = users.find((user) => user._id === id)

  if (!user) {
    throw new NotFoundException()
  }

  return user
}

export const updateUser = async (id, userUpdates) => {
  const db = getConnection()

  const user = db.data.users.find((user) => user._id === id)

  if (!user) {
    throw new NotFoundException()
  }

  const updatedUser = {
    ...user,
    ...userUpdates,
  }

  const updatedUsers = db.data.users.map((user) => {
    if (user._id === id) {
      return updatedUser
    }
    return user;
  })

  db.data.users = updatedUsers;

  await db.write()

  return updatedUser;
}
