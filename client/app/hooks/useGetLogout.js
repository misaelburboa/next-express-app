import Cookies from "js-cookie"
import { redirect, useRouter } from "next/navigation"

export const useGetLogout = () => {
  return () => {
    console.log("XXXXX", Cookies.get("token", { path: "/", domain: "localhost"}));
    const test = Cookies.remove("token")
    // redirect("/login")
  }
}
