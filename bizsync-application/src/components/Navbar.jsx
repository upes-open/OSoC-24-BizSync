import React, { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { path: "/", name: "Home" },
  { path: "/", name: "Features" },
  { path: "/", name: "Pricing" },
  { path: "/", name: "About Us" },
  { path: "/contact", name: "Contact Us" },
  { path: "/sign-up", name: "Sign up" },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w-full p-3 shadow-md bg-black text-white">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold font-inter">BizSync</p>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <p>{link.name}</p>
            </Link>
          ))}
          <Link to="/sign-in">
            <button className="bg-white text-black w-32 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-white transition ease-in-out">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsNavOpen(false)}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-evenly flex-grow">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsNavOpen(false)}
              >
                <p className="py-2">{link.name}</p>
              </Link>
            ))}
            <Link to="register" onClick={() => setIsNavOpen(false)}>
              <button className="bg-white text-black w-32 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-white transition ease-in-out">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
