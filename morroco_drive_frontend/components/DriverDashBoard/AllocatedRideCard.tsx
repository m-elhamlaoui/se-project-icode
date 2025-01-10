import Image from "next/image";
import React from "react";

const AllocatedRideCard = ({ ride, type }: { type: string; ride: any }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{ride?.user?.fullName}</h2>
            <p className="text-sm text-gray-500">
              Booked on {new Date(ride.startTime).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            {type}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section with vehicle info */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <Image
              src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
              alt="Vehicle"
              className="w-full h-24 object-contain"
              width={200}
              height={200}
            />
            <div className="mt-3 text-center">
              <p className="font-medium text-gray-900">
                {ride?.driver?.vehicle?.company} {ride?.driver?.vehicle?.model}
              </p>
            </div>
          </div>
        </div>

        {/* Middle section with route info */}
        <div className="lg:w-1/3">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">Pickup Location</p>
                <p className="text-sm text-gray-600">{ride?.pickupArea}</p>
              </div>
            </div>

            <div className="ml-1 w-0.5 h-12 bg-gray-200"></div>

            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">Drop Location</p>
                <p className="text-sm text-gray-600">{ride?.destinationArea}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section with stats */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Distance</span>
                <span className="font-medium">3.1 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Est. Time</span>
                <span className="font-medium">8 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fare</span>
                <span className="font-medium">₹250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocatedRideCard;