import { cookies } from "next/headers"
import { ProfileForm } from "@/app/components/ProfileForm"

import { redirect, useRouter } from "next/navigation"
import { useIsTokenValid } from "@/app/hooks/useIsTokenValid"
import { useGetLogout } from "@/app/hooks/useGetLogout"

const getProfileData = async (token) => {
  try {
    const response = await fetch("http://localhost:5001/api/users/profile", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response.json()

    return data
    if (!response.ok) {
      throw new Error("Invalid Token")
    }
  } catch (error) {}
}

const Profile = async () => {
  const token = cookies().get("token")?.value
  const isTokenValid = useIsTokenValid(token);

  const logout = useGetLogout()

  logout()

  // if (!isTokenValid) {
  //   logout();
  // }

  const profileData = await getProfileData(token)

  return (
    <div>
      Profile
      {/* <ProfileForm data={profileData} /> */}
    </div>
  )
}

export default Profile
