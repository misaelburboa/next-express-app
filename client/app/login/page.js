"use client"

import { useState } from "react"
import { ErrorMessage, Form, Formik, useFormik } from "formik"
import * as Yup from "yup"
import { redirect, useRouter } from "next/navigation"

import { InputField } from "@/app/components/InputField"
import { FormLabel } from "@/app/components/FormLabel"
import Cookies from "js-cookie"

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
})

const LoginForm = () => {  
  const router = useRouter()
  const [error, setError] = useState("")

  const token = Cookies.get('token')

  // TODO: also validate the validity of the token otherwise the user could start jumping from
  // profile page to this.
  if (token) {
    router.replace("/profile")
  }

  const handleSubmit = async (formValues, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        body: JSON.stringify(formValues),
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })

      const data = await response.json()

      if (data.token) {
        // document.cookie = `token=${data.token}; path=/`
        Cookies.set('token', data.token)
        router.push("/profile")

      } else if (data.error) {
        setError(data.error)
      }
    } catch (error) {
      throw new Error(error)
    }

    setSubmitting(false)
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
      <Form id="loginform">
        <div>{error.message}</div>
        <FormLabel text="Email:" />
        <InputField type="text" name="email" />
        <ErrorMessage name="email" />

        <FormLabel text="Password: " />
        <InputField type="password" name="password" />
        <ErrorMessage name="password" />

        <button form="loginform" type="submit">
          Login
        </button>
      </Form>
    </Formik>
  )
}

export default LoginForm
