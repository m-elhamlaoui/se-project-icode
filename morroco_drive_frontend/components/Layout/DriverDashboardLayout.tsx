"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AccountCircle,
  Dashboard,
  CheckCircle,
  Logout,
  Menu,
  Close,
  HomeOutlined,
  LocalTaxiOutlined,
  HistoryOutlined,
  PersonOutlined,
  ExitToAppOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { logout } from "@/utils/slices/authSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { driverProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";

interface DriverDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DriverDashboardLayout({ children }: DriverDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((store) => store.auth);

  useEffect(() => {
    const dispatchDriverProfile = async () => {
      if (auth.token) {
        const response = await appDispatch(driverProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        }
      }
    };
    dispatchDriverProfile();
  }, [auth.token, appDispatch, router]);

  const handleProfileClick = () => {
    setProfileOpen(true);
  };

  const closeProfileModal = () => {
    setProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    router.replace("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative lg:flex z-20 flex-shrink-0 transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col w-64 h-full bg-white border-r border-gray-100">
          {/* Logo */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <LocalTaxiOutlined className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Morocco Drive</h1>
                <p className="text-xs text-gray-500">Driver Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3">
            <Link href="/driver/dashboard">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 mb-2">
                <HomeOutlined />
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>
            <Link href="/driver/dashboard/current-rides">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 mb-2">
                <LocalTaxiOutlined />
                <span className="font-medium">Current Rides</span>
              </div>
            </Link>
            <Link href="/driver/dashboard/completedRides">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 mb-2">
                <HistoryOutlined />
                <span className="font-medium">Ride History</span>
              </div>
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer" onClick={handleProfileClick}>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <PersonOutlined />
              </div>
              <div>
                <p className="font-medium text-sm">{auth?.driver?.name || "Driver"}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
              >
                {sidebarOpen ? <Close /> : <Menu />}
              </button>
              <h1 className="text-xl font-bold">Welcome Back!</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl hover:bg-gray-100">
                <NotificationsOutlined />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50"
              >
                <ExitToAppOutlined />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeProfileModal}>
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 max-w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Driver Profile</h2>
              <button onClick={closeProfileModal} className="p-2 hover:bg-gray-100 rounded-xl">
                <Close />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <PersonOutlined style={{ fontSize: '32px' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{auth?.driver?.name}</h3>
                <p className="text-gray-500">{auth?.driver?.email}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-medium">{auth?.driver?.phone}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-medium">{auth?.driver?.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 font-medium transition-colors"
                onClick={() => router.push("/driver/profile")}
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2.5 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors"
                onClick={closeProfileModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}