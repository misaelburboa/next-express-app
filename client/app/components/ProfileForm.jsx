"use client"

import * as Yup from "yup"

import { InputField } from "@/app/components/InputField"
import { ErrorMessage, Form, Formik } from "formik"
import { useState } from "react"
import { useRouter } from "next/navigation"

const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("You've entered an invalid email")
    .required("Email is required"),
  phone: Yup.string()
    // .matches(phoneRegex, "Phone number is not valid")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
  company: Yup.string().required("Company is required"),
  eyeColor: Yup.string().required("Eye color is required"),
  password: Yup.string().min(8).required("Password is required"),
})

export const ProfileForm = ({ data }) => {
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (formValues) => {
    // TODO: make a handler for this kind of requests
    try {
      const response = await fetch("http://localhost:5001/api/user/profile", {
        body: JSON.stringify(formValues),
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
    } catch (error) {
      if (error === "Invalid Token") {
        router.push("/login")
      }
      throw new Error(error)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fname: data.name.first ? data.name.first : "",
        lname: data.name.last ? data.name.last : "",
        email: data.email ? data.email : "",
        phone: data.phone ? data.phone : "",
        address: data.address ? data.address : "",
        company: data.company ? data.company : "",
        eyeColor: data.eyeColor ? data.eyeColor : "",
        password: data.password ? data.password : "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div>{error}</div>
      <Form id="profileForm">
        <InputField type="text" name="fname" />
        <ErrorMessage name="fname" />

        <InputField type="text" name="lname" />
        <ErrorMessage name="lname" />

        <InputField type="text" name="email" />
        <ErrorMessage name="email" />

        <InputField type="text" name="phone" />
        <ErrorMessage name="phone" />

        <InputField type="text" name="address" />
        <ErrorMessage name="address" />

        <InputField type="text" name="company" />
        <ErrorMessage name="company" />

        <InputField type="text" name="eyeColor" />
        <ErrorMessage name="eyeColor" />

        <InputField type="password" name="password" />
        <ErrorMessage name="password" />

        <button type="submit" form="profileForm">
          Update
        </button>
      </Form>
    </Formik>
  )
}
