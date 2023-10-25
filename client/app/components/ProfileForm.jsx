"use client"

import * as Yup from "yup"

import { InputField } from "@/app/components/InputField"
import { ErrorMessage, Form, Formik } from "formik"
import {
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoadingComponent } from "@/app/components/LoadingComponent"

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

export const ProfileForm = () => {
  const [error, setError] = useState("")
  const [data, setData] = useState()

  const { data: session, status } = useSession()

  const router = useRouter()
  const searchParams = useSearchParams()
  const isPageSaved = Boolean(searchParams.get("saved"))

  const token = session?.user?.token

  const getProfileData = useCallback(async (token) => {
    if (!token) {
      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
      {
        mode: "cors",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    setData(data)
  }, [])

  useEffect(() => {
    getProfileData(token)
  }, [getProfileData, token])

  if (status === "loading") {
    return <LoadingComponent />
  }

  const handleSubmit = async (formValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formValues }),
        }
      )

      startTransition(() => {
        window.location = "/profile?saved=1"
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fname: data?.name?.first ? data?.name?.first : "",
        lname: data?.name?.last ? data?.name?.last : "",
        email: data?.email ? data?.email : "",
        phone: data?.phone ? data?.phone : "",
        address: data?.address ? data?.address : "",
        company: data?.company ? data?.company : "",
        eyeColor: data?.eyeColor ? data?.eyeColor : "",
        password: data?.password ? data?.password : "",
        picture: data?.picture ? data?.picture : "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form id="profileForm">
        <>
          {error ? (
            <div
              className="w-100 d-flex justify-content-center alert alert-danger"
              role="alert"
            >
              There was an error: {error}
            </div>
          ) : isPageSaved ? (
            <div
              className="w-100 d-flex justify-content-center alert alert-success"
              role="alert"
            >
              Page Saved Successfully
            </div>
          ) : null}

          <div className="row px-3 pt-5 mb-5">
            <div className="col-sm-12 col-md-6">
              <InputField type="text" name="fname" label="First Name" />

              <InputField type="text" name="lname" label="Last Name" />

              <InputField type="text" name="email" label="Email" />

              <InputField type="text" name="picture" label="Picture URL" />

              <InputField type="text" name="phone" label="Phone" />

              <InputField type="text" name="address" label="Address" />

              <InputField type="text" name="company" label="Company" />

              <InputField type="password" name="password" label="Password" />

              <InputField type="text" name="eyeColor" label="Eye Color" />

              <button
                type="submit"
                form="profileForm"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>

            <div className="col-sm-12 col-md-6 mt-5 mt-md-0">
              <div className="d-flex justify-content-center">
                <img src={data?.picture} alt="Profile" className="mw-100" />
              </div>

              <div className="d-flex justify-content-center mt-5">
                <div>
                  <p>Your account balance is: </p>
                  <div className="alert alert-secondary d-flex justify-content-center">
                    {data?.balance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Form>
    </Formik>
  )
}
