"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <header className="w-full bg-black text-white flex justify-between items-center px-6 py-4">
                <h1 className="text-lg font-bold">Morocco Drive</h1>
                <nav className="flex gap-6 text-sm">
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="/drive" className="hover:underline">
                        Drive
                    </Link>
                    <Link href="/help" className="hover:underline">
                        Help
                    </Link>
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-white text-black px-4 py-1 rounded-full hover:bg-gray-100"
                    >
                        Sign Up
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col">
                    <h1 className="text-4xl font-bold mb-8">
                        Allez où vous voulez avec Morocco Drive
                    </h1>

                    {/* Location Form */}
                    <div className="space-y-6 max-w-md">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Entrer un point de départ"
                                className="w-full px-4 py-4 rounded-sm border border-gray-300 focus:border-black focus:outline-none text-gray-700"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Destination"
                                className="w-full px-4 py-4 rounded-sm border border-gray-300 focus:border-black focus:outline-none text-gray-700"
                            />
                        </div>

                        <button className="w-full bg-black text-white py-4 text-base font-medium">
                            Voir les prix
                        </button>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold mb-6">
                            Connectez-vous pour consulter votre activité récente
                        </h2>
                        <div className="flex gap-8">
                            <div className="flex-1">
                                <h3 className="text-base font-medium mb-4">Plus récent</h3>
                                <div className="h-32 bg-gray-100 rounded-sm"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-medium mb-4">Passé</h3>
                                <div className="h-32 bg-gray-100 rounded-sm"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-medium mb-4">Promotions</h3>
                                <div className="h-32 bg-gray-100 rounded-sm"></div>
                            </div>
                        </div>
                        <button className="mt-6 px-6 py-2 bg-black text-white text-sm font-medium cursor-not-allowed">
                            Connectez-vous à votre compte
                        </button>
                    </div>

                    {/* New Layout for Images and Content */}
                    <div className="mt-16 space-y-16">
                        {/* First Section */}
                        <div className="flex items-center gap-8">
                            <Image
                                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_690,w_552/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png"
                                alt="Morocco Drive One Membership"
                                width={552}
                                height={368}
                                className="w-1/2 rounded-lg shadow-xl"
                            />
                            <div className="w-1/2 space-y-4">
                                <h2 className="text-3xl font-bold text-gray-900">À propos de nous</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Découvrez Morocco Drive, votre partenaire de confiance pour des voyages
                                    inoubliables à travers le Maroc. Notre engagement envers l'excellence
                                    et la satisfaction client fait de nous le choix privilégié pour vos
                                    déplacements quotidiens et vos aventures extraordinaires.
                                </p>
                                <button className="mt-4 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                                    En savoir plus
                                </button>
                            </div>
                        </div>

                        {/* Second Section */}
                        <div className="flex items-center gap-8">
                            <div className="w-1/2 space-y-4">
                                <h2 className="text-3xl font-bold text-gray-900">Notre Vision</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Transformer la mobilité au Maroc en offrant un service de transport
                                    innovant, fiable et accessible à tous. Nous nous efforçons de créer
                                    une expérience de voyage unique, alliant confort, sécurité et
                                    excellence du service.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                                        Service personnalisé
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                                        Conducteurs professionnels
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                                        Véhicules modernes
                                    </li>
                                </ul>
                            </div>
                            <Image
                                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1693342284/assets/aa/618593-ad05-4700-8b9a-0eeea2a2c734/original/UBER-ONE_One_Membership_for_Uber_and_Uber_Eats_Interstitial-Full-750-x-6803x.png"
                                alt="Ride with Morocco Drive"
                                width={552}
                                height={690}
                                className="w-1/2 rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section - Map */}
                <div className="hidden lg:block w-1/2 p-8">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-black text-white py-12 px-16">
                <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div>
                        <h3 className="font-bold mb-4">Entreprise</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-gray-300">À propos</Link></li>
                            <li><Link href="/offers" className="hover:text-gray-300">Offres</Link></li>
                            <li><Link href="/careers" className="hover:text-gray-300">Carrières</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Produits</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/ride" className="hover:text-gray-300">Course</Link></li>
                            <li><Link href="/drive" className="hover:text-gray-300">Conduire</Link></li>
                            <li><Link href="/business" className="hover:text-gray-300">Entreprises</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Ressources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/cities" className="hover:text-gray-300">Villes</Link></li>
                            <li><Link href="/help" className="hover:text-gray-300">Centre d'aide</Link></li>
                            <li><Link href="/safety" className="hover:text-gray-300">Sécurité</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 max-w-6xl mx-auto">
                    <p className="text-sm text-gray-400">© 2024 Morocco Drive. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}