import { redirect } from "next/navigation"

// This route is just used for redirection
const Home = async () => {
  redirect("/login")
  return null
}

export default Home
