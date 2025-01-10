"use client";

import { driverProfile } from "@/utils/reducers/authReducers";
import {
  getDriverCompletedRides,
  getDriverCurrentRide,
} from "@/utils/reducers/driverReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

const DriverMyRides = () => {
  const { auth, driver, ride } = useAppSelector((state) => state);

  useEffect(() => { }, [ride.status]);

  return (
    <div className="bg-gray-50 w-full rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Ride Details</h1>
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
          Active Driver
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Rides Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="rounded-full bg-yellow-50 p-3">
              <Image
                src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                alt="Current rides"
                className="w-12 h-8 object-contain"
                width={200}
                height={200}
              />
            </div>
            <span className="text-3xl font-bold text-yellow-600">
              {driver.currentRides.length}
            </span>
          </div>
          <h2 className="mt-4 text-gray-600 font-medium">Current Rides</h2>
        </div>

        {/* Cancelled Rides Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="rounded-full bg-red-50 p-3">
              <Image
                src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                alt="Cancelled rides"
                className="w-12 h-8 object-contain"
                width={200}
                height={200}
              />
            </div>
            <span className="text-3xl font-bold text-red-600">0</span>
          </div>
          <h2 className="mt-4 text-gray-600 font-medium">Cancelled Rides</h2>
        </div>

        {/* Completed Rides Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="rounded-full bg-green-50 p-3">
              <Image
                src="https://www.liderempresarial.com/wp-content/uploads/2022/08/Servicio-Mi-Taxi-en-la-FENAPO-2022-Uber-DiDi-e-InDriver-quedan-fuera.jpeg"
                alt="Completed rides"
                className="w-12 h-8 object-contain"
                width={200}
                height={200}
              />
            </div>
            <span className="text-3xl font-bold text-green-600">
              {driver.completedRides.length}
            </span>
          </div>
          <h2 className="mt-4 text-gray-600 font-medium">Completed Rides</h2>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="rounded-full bg-blue-50 p-3">
              <Image
                src="https://cdn.pixabay.com/photo/2013/07/12/14/07/bag-147782_1280.png"
                alt="Revenue"
                className="w-10 h-10 object-contain"
                width={200}
                height={200}
              />
            </div>
            <span className="text-3xl font-bold text-gray-900">$0</span>
          </div>
          <h2 className="mt-4 text-gray-600 font-medium">Revenue</h2>
        </div>
      </div>
    </div>
  );
};

export default DriverMyRides;