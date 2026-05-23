"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const dropdownLinks = [
    {
      name: "Add Car",
      href: "/add-car",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      name: "My Added Cars",
      href: "/my-added-cars",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/get-session");
      const data = await res.json();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    }
    setSessionLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    fetchSession();
    const sessionTimer = setTimeout(() => fetchSession(), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(sessionTimer);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {}
    setUser(null);
    setDropdownOpen(false);
  };

  const linkIcon = (name) => {
    if (name === "Home")
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
          />
        </svg>
      );
    if (name === "Explore Cars")
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      );
    if (name === "Add Car")
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      );
    if (name === "My Bookings")
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      );
    return null;
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-[72px]">
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-2.5 select-none"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md shadow-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-300/50 group-hover:rotate-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 17h2m10 0h2M2 9l2-4h16l2 4M2 9h20M2 9v6a2 2 0 002 2h16a2 2 0 002-2V9" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <span className="text-xl sm:text-[1.35rem] font-extrabold tracking-tight transition-all duration-300 group-hover:tracking-wide">
              <span className="text-gray-900">Drive</span>
              <span className="text-blue-600">Fleet</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-[0.9rem] font-medium transition-all duration-200 group/nav ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50/60"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 hover:-translate-y-0.5"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.href) && (
                  <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[3px] bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {sessionLoading ? (
              <div className="w-9 h-9 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="group/profile flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-blue-50/60 hover:ring-2 hover:ring-blue-100 transition-all duration-200"
                >
                  <img
                    src={
                      user.image ||
                      "https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff"
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-gray-200"
                  />
                  <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-all duration-300 ${dropdownOpen ? "rotate-180 text-blue-500" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 origin-top-right ${
                    dropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  } transition-all duration-200`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50/60 hover:text-blue-700 transition-all duration-200"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-5 py-2.5 text-[0.9rem] font-semibold text-gray-700 rounded-xl border border-gray-200 hover:bg-white hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 text-[0.9rem] font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : "rotate-0 translate-y-0"}`}
              />
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : "rotate-0 translate-y-0"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <div
          className={`absolute top-0 right-0 w-[280px] max-w-[80vw] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 h-14 sm:h-[72px] border-b border-gray-100">
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-2 select-none"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 17h2m10 0h2M2 9l2-4h16l2 4M2 9h20M2 9v6a2 2 0 002 2h16a2 2 0 002-2V9" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-gray-900">Drive</span>
                <span className="text-blue-600">Fleet</span>
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {user && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.image ||
                    "https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff"
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-100"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <div
            className="px-3 py-3 space-y-1 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.href) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50/60 hover:text-blue-600"}`}
              >
                {linkIcon(link.name)}
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/my-added-cars"
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive("/my-added-cars") ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50/60 hover:text-blue-600"}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                My Added Cars
              </Link>
            )}
          </div>

          <div className="mx-5 border-t border-gray-100" />
          <div className="px-5 py-4">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-red-500 rounded-xl border-2 border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-gray-700 rounded-xl border-2 border-gray-200 hover:bg-white hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
