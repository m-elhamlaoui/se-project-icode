"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@mui/material";
import {
  West,
  AccountBalanceWallet,
  ContactPhone,
  Wifi,
  Logout,
  DirectionsCar,
  Person,
  Phone,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";
import { useDispatch } from "react-redux";
import { logout } from "@/utils/slices/authSlice";
import RideCar from "../Ride/RideCar";
import toast from "react-hot-toast";
import { getCurrentRideOfUser } from "@/utils/reducers/userReducers";
import CustomLoader from "../CustomLoader";

export default function Profile() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride.currentRides);
  const isLoading = auth.isLoading;

  const goBack = () => {
    router.back();
  };

  // Fetch user profile + rides on mount
  useEffect(() => {
    const dispatchUserProfile = async () => {
      if (!auth.token) return;
      try {
        const response = await appDispatch(userProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        } else {
          const currentRideData = {
            userId: response.payload.id,
            token: auth.token,
          };
          await appDispatch(getCurrentRideOfUser(currentRideData));
        }
      } catch (error) {
        console.error(error);
      }
    };
    dispatchUserProfile();
  }, [appDispatch, auth.token, router]);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* HEADER (Black bar) */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <West
              onClick={goBack}
              className="cursor-pointer"
              fontSize="small"
              aria-label="Go back"
            />
            <h1 className="text-lg font-bold">Morocco Drive</h1>
          </div>
          <nav className="hidden md:block">
            {/* In case you'd like some nav links, similar to Uber style */}
            <ul className="flex items-center space-x-6 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Log Out
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
        {/* Page Title */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
            <Person fontSize="medium" /> My Profile
          </h2>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <Avatar
            sx={{
              bgcolor: "#222222", // a dark gray or black tone
              width: 72,
              height: 72,
              fontSize: "1.75rem",
            }}
            className="mb-3"
          >
            {/* In case fullName is empty or undefined */}
            {auth?.user?.fullName?.[0] || "U"}
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-900">
            {auth?.user?.fullName || "Your Name"}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Phone fontSize="small" className="text-gray-500" />
            {auth?.user?.mobile || "No phone"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-100 p-3 rounded-md text-center">
            <DirectionsCar className="text-gray-700 w-5 h-5 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-600">Total Rides</p>
            <p className="text-sm font-semibold text-gray-700">0</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-md text-center">
            <AccountBalanceWallet className="text-gray-700 w-5 h-5 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-600">Balance</p>
            <p className="text-sm font-semibold text-gray-700">...</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-md text-center">
            <Person className="text-gray-700 w-5 h-5 mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-600">Status</p>
            <p className="text-sm font-semibold text-gray-700">Active</p>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="bg-gray-50 rounded-md shadow-sm mb-8">
          <div className="p-4 border-b">
            <h3 className="text-base font-semibold flex items-center gap-2 text-gray-800">
              <DirectionsCar fontSize="small" />
              Recent Rides
            </h3>
          </div>
          {ride && ride.length > 0 ? (
            ride.map((item: any) => (
              <RideCar ride={item} key={item.id} />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No rides available
            </p>
          )}
          <div className="p-4">
            <Button
              fullWidth
              onClick={() => router.push("/myRides")}
              sx={{
                color: "black",
                fontSize: "0.875rem",
                textTransform: "none",
                borderRadius: "6px",
                borderColor: "#ccc",
                ":hover": {
                  bgcolor: "#f9f9f9",
                },
              }}
              variant="outlined"
            >
              See All Rides
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-md shadow-sm mb-8">
          {[
            {
              icon: <AccountBalanceWallet className="text-gray-700 w-5 h-5" />,
              title: "Morocco Drive Money",
              value: "Coming soon...",
            },
            {
              icon: <ContactPhone className="text-gray-700 w-5 h-5" />,
              title: "Emergency Contact",
              value: "0713547131",
            },
            {
              icon: <Wifi className="text-gray-700 w-5 h-5" />,
              title: "Morocco Drive Wifi",
              value: "Coming soon...",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 flex items-center justify-between border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium text-gray-800">
                  {item.title}
                </span>
              </div>
              <span className="text-sm text-gray-500">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#000000",
            fontSize: "0.875rem",
            textTransform: "none",
            borderRadius: "6px",
            ":hover": {
              bgcolor: "#222222",
            },
          }}
          onClick={() => {
            dispatch(logout());
            toast.success("Logged out successfully!");
            router.replace("/login");
          }}
        >
          <Logout className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </main>

      {/* FOOTER (Black bar) */}
      <footer className="bg-black text-white py-3">
        <div className="max-w-7xl mx-auto text-center text-sm">
          © 2024 Morocco Drive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}