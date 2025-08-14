"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react"; // icons from lucide-react

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedsOpen, setFeedsOpen] = useState(false);

  const feedsLinks = [
    { label: "DoD", href: "/dod" },
    { label: "Federal Reserve Board", href: "/frb" },
    { label: "Treasury Direct", href: "/treasury" },
    { label: "US Congress", href: "/congress" },
  ];

  return (
    <header className="w-full">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-6 px-8">
        
        {/* Logo
        <div className="text-2xl font-bold text-slate-600">
          GovFeeds
        </div> */}
        <div className="flex items-center mb-4">
        {/* Logo */}
          <img src="/flag.png" alt="GovFeeds Logo" className="h-8 w-8 mr-2" />
          <div className="text-2xl font-bold text-[#355e93]">
            GovFeeds
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-[#355e93] font-medium relative">

          {/* Feeds Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setFeedsOpen(true)}
            onMouseLeave={() => setFeedsOpen(false)}
          >
            <button
              className="flex items-center hover:text-blue-600 transition-colors"
              onClick={() => setFeedsOpen(!feedsOpen)}
            >
              Feeds
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${
                  feedsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {feedsOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-2xl rounded-md mt-2 py-2 w-48">
                {feedsLinks.map((feed) => (
                  <li key={feed.href}>
                    <Link
                      href={feed.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {feed.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">

            {/* Feeds Dropdown (Mobile) */}
            <li>
              <button
                className="flex items-center justify-between w-full py-1"
                onClick={() => setFeedsOpen(!feedsOpen)}
              >
                Feeds
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    feedsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {feedsOpen && (
                <ul className="pl-4">
                  {feedsLinks.map((feed) => (
                    <li key={feed.href}>
                      <Link
                        href={feed.href}
                        className="block py-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {feed.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link href="/contact-us" className="block py-2" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
