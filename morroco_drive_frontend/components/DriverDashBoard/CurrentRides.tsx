"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { getDriverCurrentRide } from "@/utils/reducers/driverReducers";
import { driverProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";
import { startRide } from "@/utils/reducers/rideReducers";

const CurrentRides = () => {
  const driver = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  // Existing logic remains the same
  const handleOpen = () => {
    setOtp("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOtpSubmit = async () => {
    if (auth.token) {
      const response = await dispatch(driverProfile(auth.token));
      if (response.payload.code === 401) {
        toast.error(response.payload.payload);
        router.replace("/login");
      }
      dispatchGetdriverCurrentRide();
      if (driver.currentRides.length > 0) {
        const data = {
          otp: parseInt(otp),
          rideId: ride.rideId,
        };
        const response = await dispatch(startRide(data));
        if (response.payload.error) {
          toast.error(response.payload.message);
        } else {
          toast.success(response.payload.message || "Ride started successfully");
        }
      }
      handleClose();
    }
  };

  const dispatchGetdriverCurrentRide = async () => {
    try {
      if (auth.token) {
        const response = await dispatch(driverProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        }
        const currentRideData = {
          driverId: response.payload.id,
          token: auth.token,
        };
        await dispatch(getDriverCurrentRide(currentRideData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatchGetdriverCurrentRide();
  }, []);

  useEffect(() => {
    dispatchGetdriverCurrentRide();
  }, [auth.token, ride.status]);

  return (
    <div className="bg-gray-50 w-full rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Current Ride</h1>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600 font-medium">Active</span>
        </div>
      </div>

      {driver.currentRides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-100">
          <Image
            src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
            alt="No rides"
            className="w-32 h-24 opacity-50 mb-4"
            width={200}
            height={200}
          />
          <h2 className="text-lg text-gray-500 font-medium">No Current Rides</h2>
        </div>
      ) : (
        driver.currentRides.map((item: any) => (
          <div
            key={item?.id}
            className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-4 lg:mb-0">
                <div className="flex-shrink-0">
                  <Image
                    src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                    alt="Vehicle"
                    className="w-24 h-16 object-contain"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Ride ID</span>
                  <span className="font-medium text-gray-900">{item.id}</span>
                  <span className="text-sm font-medium text-gray-700 mt-2">
                    {item?.driver?.vehicle?.company +
                      " " +
                      item?.driver?.vehicle?.model}
                  </span>
                  <span className="text-sm text-gray-600 mt-1">
                    {ride?.pickupArea}
                  </span>
                </div>
              </div>

              <button
                onClick={handleOpen}
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Start Ride
              </button>
            </div>
          </div>
        ))
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "rounded-lg",
        }}
      >
        <DialogTitle className="text-xl font-bold pb-1">
          Enter Ride OTP
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="OTP"
            type="number"
            name="otp"
            margin="dense"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleOtpSubmit}
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 font-medium transition-colors ml-2"
          >
            Verify OTP
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrentRides;