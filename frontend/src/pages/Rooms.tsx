import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, Filter, X, Calendar, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { Room } from '../types';

export default function Rooms() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [filter, setFilter] = React.useState<'All' | string>('All');
  const [search, setSearch] = React.useState('');
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const [bookingStep, setBookingStep] = React.useState<'form' | 'success'>('form');
  
  // Form State
  const [formData, setFormData] = React.useState({
    name_surname: '',
    email: '',
    phone_number: '',
    check_in: '',
    check_out: ''
  });

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rooms/")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((room: any) => ({
          ...room,
          image: `http://127.0.0.1:8000${room.image}`
        }));
        setRooms(formatted);
      })
      .catch(err => console.error("Failed to load rooms:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const payload = {
      ...formData,
      room: selectedRoom.id // Sending the room ID as required by your API
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setBookingStep('success');
        // Reset form after success
        setFormData({ name_surname: '', email: '', phone_number: '', check_in: '', check_out: '' });
      } else {
        const errorData = await response.json();
        alert("Error: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesType = filter === 'All' || room.type === filter;
    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-serif text-5xl font-bold text-brand-900 mb-6">Our Rooms</h1>
          <p className="text-brand-500 max-w-2xl">
            Discover our wide range of rooms and suites designed to provide the ultimate comfort and luxury.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-100 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-brand-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-500 outline-none text-brand-900"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {['All', 'Standard', 'Deluxe', 'Suite', 'Penthouse'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === type
                    ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20'
                    : 'bg-brand-50 text-brand-500 hover:bg-brand-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, i) => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-900 uppercase tracking-wider">
                  {room.type}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl font-bold text-brand-900">{room.name}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-brand-700">${room.price}</span>
                    <span className="text-xs text-brand-400 block">/ night</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6 text-brand-500 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span>{room.capacity} Guests</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setBookingStep('form');
                  }}
                  className="w-full bg-brand-900 text-white px-6 py-4 rounded-2xl font-medium hover:bg-brand-800 transition-all"
                >
                  Book This Room
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-50 text-brand-500 hover:bg-brand-100 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {bookingStep === 'form' ? (
                <div className="p-8 md:p-10">
                  <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">Book Your Stay</h2>
                  <p className="text-brand-500 mb-8">Reserving: <span className="font-semibold text-brand-700">{selectedRoom.name}</span></p>

                  <form onSubmit={handleBook} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                      <input
                        required
                        type="text"
                        name="name_surname"
                        placeholder="Full Name"
                        value={formData.name_surname}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-brand-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-brand-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                      <input
                        required
                        type="tel"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-brand-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-400 uppercase ml-1">Check In</label>
                        <input
                          required
                          type="date"
                          name="check_in"
                          value={formData.check_in}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-brand-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-400 uppercase ml-1">Check Out</label>
                        <input
                          required
                          type="date"
                          name="check_out"
                          value={formData.check_out}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-brand-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-800 transition-all mt-4 shadow-lg shadow-brand-900/20"
                    >
                      Confirm Reservation
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-brand-900 mb-4">Booking Confirmed!</h2>
                  <p className="text-brand-500 mb-8">
                    Thank you for choosing us. We've sent the details of your stay to <span className="font-bold">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold hover:bg-brand-800 transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}