import Navbar from "@/app/components/Navbar"
import { ProfileForm } from "@/app/components/ProfileForm"

import RootLayout from "@/app/layout"

const Profile = async () => {
  return (
    <>
      <Navbar />
      <ProfileForm />
    </>
  )
}

export default Profile
