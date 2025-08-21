'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileMenuOpen(window.innerWidth < 768 ? false : isMobileMenuOpen);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[95%] bg-[#355e93] text-white rounded-xl shadow-xl z-30">
            <nav className="flex items-center justify-between px-6">
                <Link href="/" className="hover:text-slate-800">
                    <div className="text-2xl font-bold p-4">GovFeeds</div>
                </Link>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
                <ul className={`flex space-x-6 md:items-center ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-[#355e93] rounded-b-lg py-4' : 'hidden md:flex'}`}>
                    <li>
                        <Link href="#about">
                            <div className="block pl-4 py-2 hover:text-slate-800">About</div>
                        </Link>
                    </li>
                    
                    <li className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block pl-4 md:pl-2 py-2 hover:text-slate-800 focus:outline-none">
                            Feeds🔻
                        </button>
                        {isDropdownOpen && (
                            <ul className="bg-white rounded-xl shadow-lg w-66 z-40 border border-[#355e93] md:absolute md:w-64">
                                <li>
                                    <Link href="/congress">
                                        <div className="block text-slate-600 px-4 py-2 hover:bg-[#4a7ab5] hover:text-white">US Congress</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/frb">
                                    
                                    <div className="block text-slate-600 px-4 py-2 hover:bg-[#4a7ab5] hover:text-white">Federal Reserve Board</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dod">
                                        <div className="block text-slate-600 px-4 py-2 hover:bg-[#4a7ab5] hover:text-white">Department of Defense</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/treasury">
                                        <div className="block text-slate-600 px-4 py-2 hover:bg-[#4a7ab5] hover:text-white">Treasury Direct</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link href="/contact">
                            <div className="block pl-4 md:pl-0 py-2 hover:text-slate-800">Contact</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}