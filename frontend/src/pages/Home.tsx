import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Coffee, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rooms/")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="uppercase tracking-[0.3em] text-sm font-medium mb-4 block text-brand-200">
              Welcome to LuxeStay
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Where Luxury <br /> Meets Comfort
            </h1>
            <p className="text-lg md:text-xl mb-10 text-brand-100 font-light leading-relaxed">
              Experience the finest hospitality in the heart of the world's most vibrant cities.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/rooms"
                className="bg-white text-brand-900 px-10 py-4 rounded-full font-medium hover:bg-brand-100 transition-all flex items-center justify-center group"
              >
                Explore Rooms
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="border border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white/10 transition-all text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-brand-900 mb-4">
              Why Choose LuxeStay?
            </h2>
            <p className="text-brand-500 max-w-2xl mx-auto">
              We provide more than just a room. We provide an experience tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "Great Service", desc: "Our staff is dedicated to making your stay perfect." },
              { icon: Shield, title: "Secure Booking", desc: "Your data and payments are always protected." },
              { icon: Coffee, title: "Free Breakfast", desc: "Start your day with a gourmet meal on us." },
              { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Stay connected with blazing fast internet." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-brand-50 text-center"
              >
                <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-6">
                  <feature.icon className="h-6 w-6 text-brand-700" />
                </div>
                <h3 className="font-bold text-brand-900 mb-3">{feature.title}</h3>
                <p className="text-brand-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-900 mb-4">
                Our Featured Rooms
              </h2>
              <p className="text-brand-500">Hand-picked selections for your stay.</p>
            </div>
            <Link
              to="/rooms"
              className="hidden md:flex items-center text-brand-700 font-medium"
            >
              View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000${room.image}`}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {room.type}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl font-bold">{room.name}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold">${room.price}</span>
                      <span className="text-xs block">/ night</span>
                    </div>
                  </div>

                  <p className="text-sm mb-6">{room.description}</p>

                  <Link
                    to="/rooms"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border rounded-full text-sm font-medium"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}