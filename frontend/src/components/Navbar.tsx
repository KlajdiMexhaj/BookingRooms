import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-brand-700" />
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-900">VilaKsamil</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-700",
                  location.pathname === link.path ? "text-brand-900 border-b-2 border-brand-700" : "text-brand-500"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/rooms"
              className="bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/10"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-brand-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-4 text-base font-medium rounded-md",
                  location.pathname === link.path ? "bg-brand-50 text-brand-900" : "text-brand-500 hover:bg-brand-50 hover:text-brand-900"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/rooms"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-900 text-white px-6 py-4 rounded-md text-base font-medium"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
