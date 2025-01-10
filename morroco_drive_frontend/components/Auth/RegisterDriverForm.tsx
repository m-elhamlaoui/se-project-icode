"use client";

import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import toast from "react-hot-toast";
import { registerDriver } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";

const validationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid mobile number")
    .required("Mobile Number is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  licenseNumber: yup.string().required("License Number is required"),
  licenseState: yup.string().required("License State is required"),
  licenseExpirationDate: yup
    .date()
    .min(new Date(), "Expiration date must be in the future")
    .required("License Expiration Date is required"),
  company: yup.string().required("Vehicle Company is required"),
  model: yup.string().required("Vehicle Model is required"),
  color: yup.string().required("Vehicle Color is required"),
  year: yup
    .number()
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear() + 1, "Enter a valid year")
    .required("Vehicle Year is required"),
  capacity: yup
    .number()
    .min(1, "Capacity must be at least 1")
    .required("Vehicle Capacity is required"),
  licensePlate: yup.string().required("License Plate is required"),
});

const RegisterDriverForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const auth = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
      location: "",
      licenseNumber: "",
      licenseState: "",
      licenseExpirationDate: "",
      company: "",
      model: "",
      color: "",
      year: "",
      capacity: "",
      licensePlate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            const driverData = {
              name: values.name,
              email: values.email,
              password: values.password,
              mobile: values.mobile,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              license: {
                licenseNumber: parseInt(values.licenseNumber),
                licenseExpirationDate: values.licenseExpirationDate,
                licenseState: values.licenseState,
              },
              vehicle: {
                company: values.company,
                model: values.model,
                year: values.year,
                color: values.color,
                capacity: parseInt(values.capacity),
                licensePlate: values.licensePlate,
              },
            };

            const response = await dispatch(registerDriver(driverData));

            if (response.payload.error) {
              toast.error(response.payload.message);
            } else if (response.payload === "Internal Server Error") {
              toast.error("An error occurred during registration");
            } else {
              toast.success("Registration successful!");
              router.push("/login");
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Please enable location services to register");
          }
        );
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration");
      }
    },
  });
  console.log("Formik errors:", formik.errors);


  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go Back"
              >
                <ArrowBack className="text-gray-600" />
              </button>
              <h1 className="ml-4 text-xl font-bold">Driver Registration</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="text"
                onClick={() => router.push("/login")}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Already have an account?
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="mb-12">
              <div className="relative">
                <div className="absolute top-4 w-full h-1 bg-gray-200">
                  <div
                    className="absolute h-full bg-black transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
                <div className="relative flex justify-between">
                  {[
                    { step: 1, label: "Personal Details" },
                    { step: 2, label: "License Info" },
                    { step: 3, label: "Vehicle Details" },
                  ].map(({ step, label }) => (
                    <div key={step} className="text-center">
                      <div
                        className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${currentStep === step
                            ? "border-black bg-black text-white"
                            : currentStep > step
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white text-gray-500"
                          }`}
                      >
                        {currentStep > step ? "✓" : step}
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-600">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <form onSubmit={formik.handleSubmit} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold">Personal Information</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Please provide your basic information to get started
                      </p>
                    </div>

                    <div className="space-y-4">
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Mobile Number"
                          name="mobile"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                          helperText={formik.touched.mobile && formik.errors.mobile}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </div>

                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold">License Details</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Enter your driving license information
                      </p>
                    </div>

                    <div className="space-y-4">
                      <TextField
                        fullWidth
                        label="License Number"
                        name="licenseNumber"
                        value={formik.values.licenseNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.licenseNumber &&
                          Boolean(formik.errors.licenseNumber)
                        }
                        helperText={
                          formik.touched.licenseNumber && formik.errors.licenseNumber
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          fullWidth
                          label="License State"
                          name="licenseState"
                          value={formik.values.licenseState}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.licenseState &&
                            Boolean(formik.errors.licenseState)
                          }
                          helperText={
                            formik.touched.licenseState && formik.errors.licenseState
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Expiration Date"
                          name="licenseExpirationDate"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={formik.values.licenseExpirationDate}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.licenseExpirationDate &&
                            Boolean(formik.errors.licenseExpirationDate)
                          }
                          helperText={
                            formik.touched.licenseExpirationDate &&
                            formik.errors.licenseExpirationDate
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold">Vehicle Information</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Enter your vehicle details
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          fullWidth
                          label="Vehicle Company"
                          name="company"
                          value={formik.values.company}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.company && Boolean(formik.errors.company)
                          }
                          helperText={formik.touched.company && formik.errors.company}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Model"
                          name="model"
                          value={formik.values.model}
                          onChange={formik.handleChange}
                          error={formik.touched.model && Boolean(formik.errors.model)}
                          helperText={formik.touched.model && formik.errors.model}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <TextField
                          fullWidth
                          label="Color"
                          name="color"
                          value={formik.values.color}
                          onChange={formik.handleChange}
                          error={formik.touched.color && Boolean(formik.errors.color)}
                          helperText={formik.touched.color && formik.errors.color}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Year"
                          name="year"
                          type="number"
                          value={formik.values.year}
                          onChange={formik.handleChange}
                          error={formik.touched.year && Boolean(formik.errors.year)}
                          helperText={formik.touched.year && formik.errors.year}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <TextField
                          fullWidth
                          label="Capacity"
                          name="capacity"
                          type="number"
                          value={formik.values.capacity}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.capacity && Boolean(formik.errors.capacity)
                          }
                          helperText={
                            formik.touched.capacity && formik.errors.capacity
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </div>

                      <TextField
                        fullWidth
                        label="License Plate"
                        name="licensePlate"
                        value={formik.values.licensePlate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.licensePlate &&
                          Boolean(formik.errors.licensePlate)
                        }
                        helperText={
                          formik.touched.licensePlate && formik.errors.licensePlate
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-2 text-gray-700 font-medium rounded-xl hover:bg-gray-50 border border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                      <button
                        type="submit" // Ensure this is set correctly
                        disabled={isLoading}
                        className={`px-6 py-2 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      >
                        {isLoading ? <CircularProgressBar /> : "Complete Registration"}
                      </button>

                  )}
                 

                </div>
              </form>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-bold mb-6">Join Our Driver Network</h3>
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source
                      src="https://cdn.dribbble.com/uploads/59677/original/1e3ef22a333a3e9891f2c3a6ead881a4.mp4?1733426247"
                      type="video/mp4"
                    />
                  </video>
                </div>

                {/* Benefits Section */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Flexible Earnings</h4>
                      <p className="text-sm text-gray-500">
                        Set your own schedule and earn on your terms
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Work Anytime</h4>
                      <p className="text-sm text-gray-500">
                        Choose your own hours, drive when you want
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Safe & Secure</h4>
                      <p className="text-sm text-gray-500">
                        Drive with confidence with our safety features
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Need help?</h4>
                      <p className="text-sm text-gray-500">Our support team is here 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterDriverForm;