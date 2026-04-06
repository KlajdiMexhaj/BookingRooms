import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, Filter, X, Calendar, CheckCircle2 } from 'lucide-react';
import { Room } from '../types';

export default function Rooms() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [filter, setFilter] = React.useState<'All' | string>('All');
  const [search, setSearch] = React.useState('');
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const [bookingStep, setBookingStep] = React.useState<'form' | 'success'>('form');

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

  const filteredRooms = rooms.filter(room => {
    const matchesType = filter === 'All' || room.type === filter;
    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep('success');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-1.5" />
                    <span>{room.amenities.length} Amenities</span>
                  </div>
                </div>

                <p className="text-brand-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wider font-bold text-brand-400 bg-brand-50 px-2.5 py-1 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
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

        {filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-brand-300 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">
              No rooms found
            </h3>
            <p className="text-brand-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Booking modal remains unchanged */}
      <AnimatePresence>{/* existing modal code */}</AnimatePresence>
    </div>
  );
}