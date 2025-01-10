"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@mui/material";
import {
  West,
  Star,
  Key,
  LocationOn,
  Navigation,
  Timer,
  DirectionsCar,
  Shield,
  VerifiedUser,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { getRideById } from "@/utils/reducers/rideReducers";

interface RideDetailProps {
  id: number;
}

function RideDetail({ id }: RideDetailProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride);
  const token = auth?.token;

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    async function fetchRide() {
      if (token) {
        await dispatch(getRideById({ rideId: id, token }));
      }
    }

    if (token) {
      fetchRide();
      intervalId = setInterval(() => {
        fetchRide();
        if (ride?.status === "COMPLETED") {
          intervalId && clearInterval(intervalId);
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [dispatch, id, ride?.status, token]);

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-hidden">
      {/* Removed Animated Background Overlays */}

      <div className="relative">
        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Go back to previous page"
              >
                <West className="text-black" fontSize="small" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Morocco Drive
              </h1>
            </div>

            <nav>
              <ul className="flex items-center space-x-8">
                {["About", "Drive", "Help", "Login"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
                    aria-label="Sign up for Morocco Drive"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT: Ride Detail Card */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  {ride?.rideId ? `Ride #${ride.rideId}` : "Ride Detail"}
                </h2>

                {/* Journey Section */}
                <div className="mb-8 bg-gray-100 rounded-2xl p-6">
                  <div className="relative pb-8">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                    <div className="relative flex items-start mb-6">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center">
                        <LocationOn className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-12">
                        <p className="text-gray-500 text-sm font-medium">PICKUP</p>
                        <p className="text-gray-800 font-semibold mt-1">
                          {ride?.pickupArea || "Pickup not available"}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-yellow-600 border-4 border-white flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-12">
                        <p className="text-gray-500 text-sm font-medium">DROP</p>
                        <p className="text-gray-800 font-semibold mt-1">
                          {ride?.destinationArea || "Drop not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle Info */}
                <div className="mb-8 space-y-6">
                  <div className="bg-gray-100 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                          <DirectionsCar className="text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {ride?.driver?.vehicle?.model || "Unknown Model"}
                          </p>
                          <p className="text-yellow-400/80 text-sm">Premium Ride</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Plate Number</p>
                        <p className="text-gray-800 font-mono mt-1">
                          {ride?.driver?.vehicle?.licensePlate || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar
                          src="https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_640.jpg"
                          alt="Driver's profile"
                          sx={{ width: 48, height: 48 }}
                          className="ring-2 ring-yellow-400"
                        />
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {ride?.driver?.name || "Driver Name"}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="text-yellow-400 w-4 h-4" />
                            <p className="text-yellow-400/80 text-sm ml-1">4.7</p>
                            <VerifiedUser className="text-blue-400 w-4 h-4 ml-2" />
                            <p className="text-blue-400/80 text-sm ml-1">Verified</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        aria-label="Contact driver"
                        sx={{
                          bgcolor: 'rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(10px)',
                          color: 'black',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.2)',
                          },
                        }}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>

                {/* OTP or Payment Section */}
                {ride?.status === "COMPLETED" ? (
                  <Button
                    onClick={() => router.push(`/ride/${ride.rideId}/payment`)}
                    variant="contained"
                    aria-label="Proceed to payment"
                    sx={{
                      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                      color: 'black',
                      textTransform: 'none',
                      borderRadius: '16px',
                      padding: '16px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginTop: 'auto',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(255,211,77,0.3)',
                      },
                    }}
                  >
                    Pay Now
                  </Button>
                ) : (
                  <div className="bg-yellow-100 rounded-2xl p-6 mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-black/30 rounded-xl flex items-center justify-center">
                          <Key className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Your OTP</p>
                          <p className="text-3xl font-bold text-gray-800">
                            {ride?.otp || 0}
                          </p>
                        </div>
                      </div>
                      <Shield className="text-gray-800 w-8 h-8" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Map Section */}
            <div className="w-full md:w-1/2">
              <div className="bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-[600px]">
                <iframe
                  src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Ride map"
                />
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © 2024 Morocco Drive. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {["Privacy", "Terms", "Support", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RideDetail;
