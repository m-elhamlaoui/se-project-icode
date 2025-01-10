"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
  Drawer,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  DirectionsCar as DirectionsCarIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import DrawerList from "./DrawerList";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";

function BookRideNavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      dispatch(userProfile(auth.token));
    }
  }, [auth.token, dispatch]);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Rides", icon: <DirectionsCarIcon />, path: "/rides" },
  ];

  const rightIcons = [
    {
      icon: <NotificationsIcon />,
      path: "/notifications",
      tooltip: "Notifications",
    },
    { icon: <SettingsIcon />, path: "/settings", tooltip: "Settings" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: "70px", sm: "80px" },
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          {/* Left Side (Menu & Logo) */}
          <Box display="flex" alignItems="center" gap={3}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSidebarToggle}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '10px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}
              >
                Morocco InDrive
              </Typography>
            </Box>
          </Box>

          {/* Center Navigation */}
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            gap={4}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                startIcon={item.icon}
                onClick={() => router.push(item.path)}
                sx={{
                  color: 'white',
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  padding: '8px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Side (Icons & Profile/Login) */}
          <Box display="flex" alignItems="center" gap={3}>
            {rightIcons.map((item) => (
              <Tooltip title={item.tooltip} key={item.tooltip}>
                <IconButton
                  color="inherit"
                  onClick={() => router.push(item.path)}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    padding: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
            {auth.user ? (
              <Tooltip title="Profile">
                <IconButton
                  onClick={() => router.push("/profile")}
                  sx={{
                    p: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                      color: 'black',
                      fontWeight: 'bold',
                      width: 40,
                      height: 40,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {auth.user.fullName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  color: 'black',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '14px',
                  padding: '10px 24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DrawerList anchor="left" />
      </Drawer>

      {/* Placeholder to offset fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: "70px", sm: "80px" } }} />
    </Box>
  );
}

export default BookRideNavBar;