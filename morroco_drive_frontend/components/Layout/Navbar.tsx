// components/Layout/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">RideFast</h1>
                <ul className="flex space-x-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/bookRide">Book Ride</Link></li>
                    <li><Link href="/driver">Driver Dashboard</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/admin">Admin</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
