"use client";
import React, { useState } from "react";
import { debounce } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookRideNavBar from "./BookRideNavBar";
import axios from "axios";
import { requestRide } from "@/utils/reducers/rideReducers";
import { useAppDispatch } from "@/utils/store/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Calendar } from "lucide-react";

const validationSchema = Yup.object().shape({
  pickupArea: Yup.string().required("Pickup location is required"),
  destinationArea: Yup.string().required("Destination location is required"),
});

function BookRide() {
  const [activeField, setActiveField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchSuggestions = debounce(async (input: string) => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/autocomplete.php?limit=5&key=pk.1dca78a113a7c45533e83e6c9f2196ae&q=${input}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 500);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setActiveField(name);
    fetchSuggestions(value);
  };

  const handleOnSubmit = async (values: {
    pickupArea: string;
    destinationArea: string;
    destinationLatitude: string;
    destinationLongitude: string;
    pickupLatitude: string;
    pickupLongitude: string;
  }) => {
    try {
      const response = await dispatch(
        requestRide({
          destinationArea: values.destinationArea,
          pickupArea: values.pickupArea,
          destinationLatitude: parseFloat(values.destinationLatitude),
          destinationLongitude: parseFloat(values.destinationLongitude),
          pickupLatitude: parseFloat(values.pickupLatitude),
          pickupLongitude: parseFloat(values.pickupLongitude),
        })
      );
      if (response.payload.code === 401) {
        router.replace("/login");
        return;
      }
      if (response.payload.error) {
        toast.error(response.payload.message);
      } else {
        toast.success(response.payload.message || "Ride Booked successfully");
        router.push(`/rideDetail/${response.payload?.id}`);
      }
    } catch (error) {
      toast.error("An error occurred while Booking Ride");
    }
  };

  const formik = useFormik({
    initialValues: {
      pickupArea: "",
      pickupLatitude: "",
      pickupLongitude: "",
      destinationArea: "",
      destinationLatitude: "",
      destinationLongitude: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (formik.isValid) handleOnSubmit(values);
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <BookRideNavBar />

      <div className="container mx-auto px-4 py-8 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Section - Booking Form */}
        <div className="w-full lg:w-5/12">
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Request a ride now
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Quick Options */}
              <div className="flex gap-4 mb-6">
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-black transition-colors">
                  <Clock size={16} />
                  Now
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-black transition-colors">
                  <Calendar size={16} />
                  Schedule
                </button>
              </div>

              {/* Location Inputs */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <input
                  id="pickupArea"
                  type="text"
                  name="pickupArea"
                  placeholder="Enter pickup location"
                  className="w-full pl-12 pr-4 py-3 border-0 border-b border-gray-200 focus:border-black focus:ring-0 text-base"
                  value={formik.values.pickupArea}
                  onChange={handleInputChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.pickupArea && formik.errors.pickupArea && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.pickupArea}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <input
                  id="destinationArea"
                  type="text"
                  name="destinationArea"
                  placeholder="Enter destination"
                  className="w-full pl-12 pr-4 py-3 border-0 border-b border-gray-200 focus:border-black focus:ring-0 text-base"
                  value={formik.values.destinationArea}
                  onChange={handleInputChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.destinationArea && formik.errors.destinationArea && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.destinationArea}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-base mt-8"
              >
                Request Now
              </button>
            </form>
          </div>

          {/* Saved Places Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Saved Places</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  🏠
                </div>
                <div className="text-left">
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-gray-500">Add home address</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  💼
                </div>
                <div className="text-left">
                  <p className="font-medium">Work</p>
                  <p className="text-sm text-gray-500">Add work address</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Map/Animation */}
        <div className="w-full lg:w-7/12 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://cdn.dribbble.com/users/1055192/screenshots/12841366/media/6f7d13c3737aebce2680d4e421e3b33f.gif"
            alt="Ride Illustration"
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default BookRide;