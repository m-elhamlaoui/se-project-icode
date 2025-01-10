"use client";
import { sx } from "@/utils/constants";
import {
  driverProfile,
  loginUser,
  userProfile,
} from "@/utils/reducers/authReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { CircularProgressBar } from "../CustomLoader";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().oneOf(["DRIVER", "NORMAL_USER"]),
});

function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "NORMAL_USER",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password, role } = values;
      if (formik.isValid) {
        try {
          const response = await dispatch(loginUser({ email, password, role }));
          if (response.payload.error) {
            toast.error(response.payload.message);
          } else if (response.payload === "Internal Server Error") {
            toast.error(response.payload);
          } else {
            toast.success(response.payload.message);
          }
        } catch (error) {
          toast.error("An error occurred while logging in");
        }
      }
    },
  });

  const auth = useAppSelector((store) => store.auth);
  useEffect(() => {
    const checkAuthorized = async () => {
      try {
        let response = null;
        if (auth.role && auth.token) {
          if (auth.role === "DRIVER") {
            response = await dispatch(driverProfile(auth.token));
            if (response.payload?.code !== 401) {
              router.replace("/driver/dashboard");
            }
          } else if (auth.role === "NORMAL_USER") {
            dispatch(userProfile(auth.token)).then((response) => {
              if (response.payload.email === "ride@fast.com") {
                router.replace("/company");
              } else if (response.payload?.code !== 401) {
                router.replace("/bookRide");
              }
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuthorized();
  }, [auth.token, auth.role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-black bg-opacity-90 backdrop-blur-lg text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold tracking-tight">My Ride App</h1>
        <nav className="flex space-x-8 text-sm">
          <button className="hover:text-gray-300 transition-colors duration-200">Help</button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            Register
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center w-full px-6 lg:px-16 py-12">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-2xl mb-10 lg:mb-0">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your credentials to continue your journey with us
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                ...sx,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.75rem',
                  backgroundColor: '#f8fafc',
                }
              }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                ...sx,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.75rem',
                  backgroundColor: '#f8fafc',
                }
              }}
            />

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" className="text-gray-700">Choose Your Role</FormLabel>
              <RadioGroup
                row
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="mt-2 justify-center lg:justify-start"
              >
                <FormControlLabel
                  value="NORMAL_USER"
                  control={<Radio sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'black',
                    }
                  }} />}
                  label="Passenger"
                  className="mr-8"
                />
                <FormControlLabel
                  value="DRIVER"
                  control={<Radio sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'black',
                    }
                  }} />}
                  label="Driver"
                />
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              className="bg-black hover:bg-gray-900 text-white normal-case py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: '#1a1a1a',
                }
              }}
            >
              {isLoading ? <CircularProgressBar /> : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-black font-semibold hover:underline transition-all duration-200"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Image Section with decorative elements */}
        <div className="hidden lg:flex lg:w-1/2 justify-center lg:ml-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl transform rotate-3"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black/5 to-transparent rounded-3xl transform -rotate-3"></div>
          <img
            src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_638,w_956/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg"
            alt="Sign Up"
            className="max-w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-black rounded-full opacity-10"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gray-900 rounded-full opacity-5"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 backdrop-blur-lg text-white py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 My Ride App. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 lg:mt-0">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginForm;