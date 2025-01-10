"use client";
import { driverProfile } from "@/utils/reducers/authReducers";
import {
  getDriverAllocatedRides,
  getDriverCurrentRide,
} from "@/utils/reducers/driverReducers";
import { acceptRide, getRideById } from "@/utils/reducers/rideReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllocatedRides = () => {
  const ride = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [startedride, setStartedride] = useState([]);

  useEffect(() => {
    const dispatchallocatedRide = async () => {
      try {
        if (auth.token) {
          await dispatch(getDriverAllocatedRides(auth.token));
        }
      } catch (error) { }
    };
    dispatchallocatedRide();
  }, [ride.status]);

  const handleAcceptRide = async (rideId: number) => {
    try {
      if (ride.currentRides.length <= 0) {
        await dispatch(acceptRide(rideId));
      }
      if (auth.token) {
        await dispatch(getDriverAllocatedRides(auth.token));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeclineRide = async (rideId: number) => {
    try {
      if (auth.token) {
        await dispatch(getDriverAllocatedRides(auth.token));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 w-full rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Allocated Rides</h1>
        {ride.allocatedRides.length > 0 && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {ride.allocatedRides.length} Available
          </div>
        )}
      </div>

      {ride.allocatedRides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-100">
          <Image
            src="https://png.pngtree.com/png-vector/20220205/ourmid/pngtree-white-suv-car-png-image_4378701.png"
            alt="No rides"
            className="w-32 h-24 opacity-50 mb-4"
            width={200}
            height={200}
          />
          <h2 className="text-lg text-gray-500 font-medium">No Allocated Rides</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {ride.allocatedRides.map((item: any, idx) => (
            <div
              key={idx + item.id}
              className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center gap-6 mb-4 lg:mb-0 flex-1">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                      alt="Vehicle"
                      className="w-24 h-16 object-contain"
                      width={200}
                      height={200}
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm text-gray-500">Ride ID</span>
                        <span className="block font-medium text-gray-900">{item.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Booked By</span>
                        <span className="block font-medium text-gray-900">{item?.user.fullName}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-sm font-medium text-gray-700">
                        {item?.driver?.vehicle?.company + " " + item?.driver?.vehicle?.model}
                      </span>

                      <div className="flex items-center mt-2">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="ml-2 text-sm text-gray-600">{item?.pickupArea}</p>
                          </div>
                          <div className="w-0.5 h-4 bg-gray-200 ml-1"></div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <p className="ml-2 text-sm text-gray-600">{item?.destinationArea}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 mt-4 lg:mt-0">
                  <button
                    onClick={() => handleAcceptRide(item.id)}
                    className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineRide(item.id)}
                    className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllocatedRides;