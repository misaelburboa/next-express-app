import express from "express"
import cors from "cors"

import { authRoutes } from "./routes/auth.js"
import { usersRoutes } from "./routes/users.js"
import { createConnection } from "./db/config.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/authentication", authRoutes)
app.use("/api/users", usersRoutes)

createConnection()

app.listen(5001, () => {
  console.log("App is listening on port 5001")
})
