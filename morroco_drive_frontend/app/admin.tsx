// app/admin/page.tsx
import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="mt-4 space-y-4">
                <Link href="/company">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Manage Companies
                    </button>
                </Link>
                <Link href="/ride">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Manage Rides
                    </button>
                </Link>
                <Link href="/profile">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Manage Profiles
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
