import "bootstrap/dist/css/bootstrap.css"

import Navbar from "@/app/components/Navbar"
import SessionAuthProvider from "@/context/SessionAuthProvider"
import { getServerSession } from "next-auth"

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          <Navbar />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
