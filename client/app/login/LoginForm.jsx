"use client"

import { ErrorMessage, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import * as Yup from "yup"
import { useRouter } from "next/navigation"

import { InputField } from "@/app/components/InputField"
import { FormLabel } from "@/app/components/FormLabel"
import { useState } from "react"

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
})

const LoginForm = () => {
  const router = useRouter()
  const [errors, setErrors] = useState([])

  const handleSubmit = async ({ email, password }) => {
    const nextAuthResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (nextAuthResponse?.error) {
      setErrors(nextAuthResponse.error.split(","))
      return
    }

    router.push("/profile")
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      <Form id="loginform" noValidate>
        {errors.length > 0 && (
          <div>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="container shadow-lg p-3 mt-5 bg-body rounded w-50">
          <div className="mb-3">
            <InputField type="email" name="email" label="Email" />
          </div>

          <div className="mb-3">
            <InputField
              type="password"
              name="password"
              label="Password"
            />
          </div>

          <button form="loginform" type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
