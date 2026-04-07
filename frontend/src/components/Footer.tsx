import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
<>
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

  {/* WhatsApp Floating Button */}
  <a
    href="https://wa.me/355685395037"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
  >
    <svg class="w-10 h-10 fill-current" viewBox="0 0 32 32"><path d="M16 .4C7.5.4.6 7.3.6 15.8c0 2.8.7 5.5 2.1 7.9L.4 31.6l8.1-2.1c2.3 1.3 4.9 2 7.5 2 8.5 0 15.4-6.9 15.4-15.4S24.5.4 16 .4zm0 28.2c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2-2-4.3-2-6.7C3 8.4 8.4 3 16 3s13 5.4 13 13-5.4 12.6-13 12.6zm7.1-9.5c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.6-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.3-2.9-.3-.7-.7-.6-.9-.6h-.8c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 3 0 1.7 1.3 3.4 1.5 3.6.2.2 2.5 3.8 6.1 5.2.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 2.4-1 2.8-1.9.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"></path></svg>
  </a>
</>
    
  );
}
