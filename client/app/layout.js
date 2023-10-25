import "bootstrap/dist/css/bootstrap.css"

import SessionAuthProvider from "@/context/SessionAuthProvider"
import { getServerSession } from "next-auth"

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
