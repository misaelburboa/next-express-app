"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container justify-content-end">
        {session?.user ? (
          <button onClick={() => signOut()} className="btn btn-danger btn-sm">
            Sign Out
          </button>
        ) : null}
      </div>
    </nav>
  )
}
export default Navbar
