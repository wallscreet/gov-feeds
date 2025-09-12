'use client'

import { useState } from 'react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import Link from 'next/link';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<"congress" | "dod" | "treasury" | "fed" | null>(null);

  const toggleSubmenu = (menu: "congress" | "dod" | "treasury" | "fed") => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <div className="fixed w-full bg-[#2f5787] p-2 lg:p-4 border-b border-slate-700 grid grid-cols-12 z-100">

      {/* Left: Hamburger */}
      <div className="flex col-start-1 col-span-1 border-r border-slate-700 items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-40 p-2 md:px-4 rounded-lg shadow-lg text-white hover:text-[#2596be]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Drawer */}
        <div
          className={`fixed bg-gradient-to-l from-[#2f5787] to-[#151f4c] top-0 left-0 h-full w-full sm:w-3/4 shadow-xl transform transition-transform duration-300 ease-in-out z-30 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="pl-10 space-y-4 pt-22">

            {/* Home */}
            <Link href="/" className="block text-white font-bold hover:text-[#2596be]">
              Home
            </Link>

            {/* Dept of Defense submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("dod")}
                className="w-full text-left block text-white font-bold hover:text-[#2596be]"
              >
                War Department
              </button>
              {activeSubmenu === "dod" && (
                <div className="absolute top-[-16] left-0 ml-42 w-60 border-l border-white p-4 space-y-4 z-50 rounded-lg pl-6">
                  <Link href="/war/awards" className="block text-white hover:text-[#2596be]">
                    Contract Announcements
                  </Link>
                  <Link href="/war/featured" className="block text-white hover:text-[#2596be]">
                    Feature Stories
                  </Link>
                  <Link href="/war/news" className="block text-white hover:text-[#2596be]">
                    News
                  </Link>
                  <Link href="/war/releases" className="block text-white hover:text-[#2596be]">
                    Press Releases
                  </Link>
                  <Link href="/war/advisories" className="block text-white hover:text-[#2596be]">
                    Advisories
                  </Link>
                </div>
              )}
            </div>

            {/* US Congress submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("congress")}
                className="w-full text-left block text-white font-bold hover:text-[#2596be]"
              >
                U.S. Congress
              </button>
              {activeSubmenu === "congress" && (
                <div className="absolute top-[-18] left-0 ml-42 w-48 border-l border-white p-4 space-y-4 z-50 rounded-lg pl-6">
                  <Link href="/congress/bills" className="block text-white hover:text-[#2596be]">
                    <p>Congressional Bills</p>
                  </Link>
                  <Link href="/congress/bills-enrolled" className="block text-white hover:text-[#2596be]">
                    <p>Congressional Bills Enrolled</p>
                  </Link>
                  <Link href="/congress/congress-docs" className="block text-white hover:text-[#2596be]">
                    <p>Congressional Documents</p>
                  </Link>
                  <Link href="/congress/congress-hearings" className="block text-white hover:text-[#2596be]">
                    <p>Congressional Hearings</p>
                  </Link>
                </div>
              )}
            </div>

            {/* Treasury submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("treasury")}
                className="w-full text-left block text-white font-bold hover:text-[#2596be]"
              >
                Treasury Direct
              </button>
              {activeSubmenu === "treasury" && (
                <div className="absolute top-[-18] left-0 ml-42 w-48 border-l border-white p-4 space-y-4 z-50 rounded-lg pl-6">
                  <Link href="/treasury/usdebt" className="block text-white hover:text-[#2596be]">
                    <p>Debt To The Penny</p>
                  </Link>
                </div>
              )}
            </div>

            {/* Fed Reserve submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("fed")}
                className="w-full text-left block text-white font-bold hover:text-[#2596be]"
              >
                Federal Reserve
              </button>
              {activeSubmenu === "fed" && (
                <div className="absolute top-[-18] left-0 ml-42 w-48 border-l border-white p-4 space-y-4 z-50 rounded-lg pl-6">
                  <Link href="/frb/speeches" className="block text-white hover:text-[#2596be]">
                    <p>Speeches & Testimony</p>
                  </Link>
                  <Link href="/press-releases" className="block text-white hover:text-[#2596be]">
                    <p>Press Releases</p>
                  </Link>
                  <Link href="/research-papers" className="block text-white hover:text-[#2596be]">
                    <p>Research Papers</p>
                  </Link>
                </div>
              )}
            </div>

            {/* Other links */}
            <Link href="/#about" className="block text-white font-bold hover:text-[#2596be]">
              About
            </Link>

          </nav>
        </div>
      </div>

      {/* Center: Logo */}
      <div className="flex col-start-3 col-span-8 items-center justify-center border-r border-slate-700 z-40">
        <Link href="/">
          <div className="flex items-center text-white hover:text-[#2596be]">
            <p className="pl-2 text-2xl font-semibold">GovFeeds</p>
          </div>
        </Link>
      </div>

      {/* Right: Socials */}
      <div className="flex col-start-11 col-span-2 items-center justify-center z-50">
        <div className="flex space-x-2 text-white">
          <a
            href="https://x.com/Wallscreet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2596be] transition-colors"
          >
            <FaXTwitter size={22} />
          </a>
          <a
            href="https://github.com/wallscreet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2596be] transition-colors"
          >
            <FaGithub size={22} />
          </a>
          {/* DiscoRover logo link */}
          <a
            href="https://www.discorover.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2596be] transition-colors"
          >
            <img
              src="/DiscoRoverLogo.png"
              alt="Your Project"
              className="h-6 w-6"
            />
          </a>
        </div>
      </div>

    </div>
  );
}

export default Header;
