"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { sx } from "@/utils/constants";
import toast from "react-hot-toast";
import { registerUser } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";
import {
  Person,
  Phone,
  Email,
  Lock,
  DirectionsCar,
  Speed,
  Psychology,
  Groups,
} from "@mui/icons-material";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  mobile: yup.string().required("Mobile number is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .notOneOf(["ride@fast.com"], "You cannot pick this email"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      mobile: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password, mobile, fullName } = values;
      if (formik.isValid) {
        try {
          const response = await dispatch(
            registerUser({ email, password, mobile, fullName })
          );
          if (response.payload.error) {
            toast.error(response.payload.message);
          } else {
            toast.success(
              response.payload.message || "Registered successfully"
            );
            router.push("/login");
          }
        } catch (error) {
          toast.error("An error occurred while registering");
        }
      }
    },
  });

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Removed Animated Background Overlays */}

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex justify-center items-center p-6 lg:p-12">
          <div className="w-full max-w-lg bg-white p-8 lg:p-12 rounded-3xl border border-gray-200 shadow-lg">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Morocco Drive
              </h1>
              <h2 className="text-2xl font-medium text-gray-700/80 mb-4">
                Create Your Account
              </h2>
              <div className="flex justify-center gap-8 mt-6">
                {[
                  { icon: <DirectionsCar />, text: "Premium Cars" },
                  { icon: <Speed />, text: "Fast Rides" },
                  { icon: <Psychology />, text: "Smart AI" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-2 text-yellow-400 transform hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="relative group">
                <Person className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <TextField
                  label="Full Name"
                  name="fullName"
                  type="text"
                  fullWidth
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      borderRadius: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&.Mui-focused': {
                        borderColor: '#FCD34D',
                        boxShadow: '0 0 0 2px rgba(252,211,77,0.2)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FCD34D',
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#FCD34D',
                    },
                  }}
                />
              </div>

              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  fullWidth
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.mobile && Boolean(formik.errors.mobile)
                  }
                  helperText={formik.touched.mobile && formik.errors.mobile}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      borderRadius: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&.Mui-focused': {
                        borderColor: '#FCD34D',
                        boxShadow: '0 0 0 2px rgba(252,211,77,0.2)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FCD34D',
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#FCD34D',
                    },
                  }}
                />
              </div>

              <div className="relative group">
                <Email className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email && Boolean(formik.errors.email)
                  }
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      borderRadius: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&.Mui-focused': {
                        borderColor: '#FCD34D',
                        boxShadow: '0 0 0 2px rgba(252,211,77,0.2)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FCD34D',
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#FCD34D',
                    },
                  }}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password &&
                    Boolean(formik.errors.password)
                  }
                  helperText={
                    formik.touched.password && formik.errors.password
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pl: 6,
                      borderRadius: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&.Mui-focused': {
                        borderColor: '#FCD34D',
                        boxShadow: '0 0 0 2px rgba(252,211,77,0.2)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FCD34D',
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#FCD34D',
                    },
                  }}
                />
              </div>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #FCD34D, #F59E0B)',
                  color: 'black',
                  textTransform: 'none',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginTop: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #F59E0B, #FCD34D)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(252,211,77,0.3)',
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'all 0.5s',
                  },
                  '&:hover:before': {
                    left: '100%',
                  },
                }}
              >
                {isLoading ? <CircularProgressBar /> : "Create Account"}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => router.push("/driver/register")}
                sx={{
                  color: 'black',
                  borderColor: '#ccc',
                  textTransform: 'none',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    borderColor: '#FCD34D',
                    backgroundColor: 'rgba(252, 211, 77, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Register as a Driver
              </Button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => router.push("/login")}
                    className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Video Section */}
        <div className="lg:w-1/2 w-full relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://cdn.dribbble.com/uploads/59677/original/1e3ef22a333a3e9891f2c3a6ead881a4.mp4?1733426247"
              type="video/mp4"
            />
          </video>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center">
            <Groups sx={{ fontSize: 60 }} className="text-yellow-400 mb-6 animate-pulse" />
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-yellow-100 to-gray-800 bg-clip-text text-transparent">
              Join Our Community
            </h3>
            <p className="text-xl text-gray-700/80 max-w-lg mb-12">
              Experience the future of transportation with Morocco Drive's premium service and innovative technology
            </p>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-2xl">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "50+", label: "Cities" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="mt-16 grid grid-cols-2 gap-6 w-full max-w-2xl">
              {[
                {
                  title: "Premium Service",
                  description: "Experience luxury and comfort in every ride",
                  icon: <DirectionsCar className="text-yellow-400" />,
                },
                {
                  title: "Smart Technology",
                  description: "Advanced features for a seamless journey",
                  icon: <Psychology className="text-yellow-400" />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transform hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[128px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[128px] opacity-20"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
