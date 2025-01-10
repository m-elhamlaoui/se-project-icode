"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Person,
  History,
  HelpOutline,
  ExitToApp,
  West,
  Verified,
  DirectionsCar,
  CheckCircle,
  Pending,
} from "@mui/icons-material";
import RideCar from "./RideCar";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import {
  getCompletedRideByUser,
  getUserRequestedRides,
} from "@/utils/reducers/userReducers";
import Image from "next/image";
import toast from "react-hot-toast";
import { userProfile } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";

function Rides() {
  const completedRide = useAppSelector((state) => state.ride.completedRides);
  const requestdRide = useAppSelector((state) => state.ride.requestedRides);
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState("REQUESTED");
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => router.back();

  useEffect(() => {
    const dispatchCompleteRide = async () => {
      setIsLoading(true);
      try {
        if (auth.token) {
          const response = await dispatch(userProfile(auth.token));
          if (response.payload.code === 401) {
            toast.error(response.payload.payload);
            router.replace("/login");
          }
          if (toggle === "REQUESTED" && auth.user) {
            const user = { userId: response.payload?.id, token: auth.token };
            await dispatch(getUserRequestedRides(user));
          } else {
            await dispatch(getCompletedRideByUser(auth.token));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    dispatchCompleteRide();
  }, [auth.token, toggle]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgressBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <button
          onClick={goBack}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all"
        >
          <West />
        </button>
        <div className="flex justify-between w-full">
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={() => router.push("/home")}
          >
            <Home />
            <span className="text-sm font-medium hidden md:inline">Home</span>
          </button>
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={() => router.push("/profile")}
          >
            <Person />
            <span className="text-sm font-medium hidden md:inline">Profile</span>
          </button>
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={() => setToggle("REQUESTED")}
          >
            <DirectionsCar />
            <span className="text-sm font-medium hidden md:inline">Requested</span>
          </button>
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={() => setToggle("COMPLETED")}
          >
            <History />
            <span className="text-sm font-medium hidden md:inline">Completed</span>
          </button>
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={() => router.push("/help")}
          >
            <HelpOutline />
            <span className="text-sm font-medium hidden md:inline">Help</span>
          </button>
          <button
            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            onClick={() => {
              toast.success("Logged out successfully");
              router.replace("/login");
            }}
          >
            <ExitToApp />
            <span className="text-sm font-medium hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-8">
        {/* Left Section: Rides */}
        <div className="space-y-4">
          {toggle === "REQUESTED" ? (
            requestdRide.length === 0 ? (
              <div className="flex justify-center items-center text-gray-500 h-40">
                <Pending className="mr-2" /> No Requested Rides...
              </div>
            ) : (
              requestdRide.map((item, idx) => (
                <RideCar ride={item} key={idx} />
              ))
            )
          ) : completedRide.length === 0 ? (
            <div className="flex justify-center items-center text-gray-500 h-40">
              <CheckCircle className="mr-2" /> No Completed Rides...
            </div>
          ) : (
            completedRide.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center shadow-md rounded-lg p-4 bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center">
                  <Image
                    src="https://cdn.pixabay.com/photo/2017/04/06/22/11/car-2209439_640.png"
                    alt="Ride Car"
                    className="w-16 h-16 rounded-md"
                    width={64}
                    height={64}
                  />
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(item?.startTime).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.driver?.vehicle?.company} {item?.driver?.vehicle?.model}
                    </p>
                    <p className="text-xs text-gray-400">{item?.pickupArea}</p>
                    <p className="text-xs text-gray-400">{item?.destinationArea}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 mb-2">
                    {item?.status}
                  </p>
                  <Verified className="text-green-600" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section: Image */}
        <div className="flex flex-col items-center justify-start bg-white shadow-md rounded-lg p-6">
          <Image
            src="https://www.exaland.app/wp-content/uploads/2023/06/mobile.png"
            alt="App Promo"
            width={300}
            height={400}
            className="rounded-lg shadow-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Explore Our App
          </h3>
          <p className="text-sm text-gray-500 text-center">
            Download our app to experience seamless ride management on the go.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rides;
