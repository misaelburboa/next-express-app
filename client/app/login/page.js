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

// "use client"

// import ButtonAuth from "@/app/login/ButtonAuth"
// import { signIn } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// const LoginPage = () => {
//   const [errors, setErrors] = useState([])
//   const [email, setEmail] = useState("test@test.com")
//   const [password, setPassword] = useState("123123")
//   const router = useRouter()

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setErrors([])

//     const responseNextAuth = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     })

//     if (responseNextAuth?.error) {
//       setErrors(responseNextAuth.error.split(","))
//       return
//     }

//     router.push("/dashboard")
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="test@test.com"
//           name="email"
//           className="form-control mb-2"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="123123"
//           name="password"
//           className="form-control mb-2"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//       <ButtonAuth />
//       {errors.length > 0 && (
//         <div className="alert alert-danger mt-2">
//           <ul className="mb-0">
//             {errors.map((error) => (
//               <li key={error}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }
// export default LoginPage
