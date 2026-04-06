import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 text-white">LuxeStay</h3>
            <p className="text-brand-300 text-sm leading-relaxed">
              Crafting unforgettable experiences in the world's most beautiful locations. Your sanctuary away from home.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/rooms" className="hover:text-white transition-colors">Our Rooms</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Contact Info</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>123 Paradise Road, Coastal City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>hello@luxestay.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-brand-800 rounded-full hover:bg-brand-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-brand-800 rounded-full hover:bg-brand-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-brand-800 rounded-full hover:bg-brand-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-800 pt-8 text-center text-xs text-brand-400">
          <p>&copy; {new Date().getFullYear()} LuxeStay Bookings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
