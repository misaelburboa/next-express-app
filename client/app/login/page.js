import LoginForm from "@/app/login/LoginForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await getServerSession()
  if (session) {
    redirect("/profile")
  }
  return <LoginForm />
}