import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-md w-full">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-slate-600">
          3J GovFeeds
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-slate-600 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/feeds" className="hover:text-blue-600 transition-colors">
              Feeds
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
