import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = React.useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-serif text-5xl font-bold text-brand-900 mb-8 leading-tight">Get in Touch <br /> With Us</h1>
              <p className="text-brand-500 text-lg mb-12 leading-relaxed">
                Have questions about our rooms or services? Our team is here to help you plan your perfect stay. Reach out to us anytime.
              </p>

              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'Our Location', detail: '123 Paradise Road, Coastal City, FL 33101' },
                  { icon: Phone, title: 'Phone Number', detail: '+1 (555) 000-1234' },
                  { icon: Mail, title: 'Email Address', detail: 'hello@luxestay.com' },
                  { icon: Clock, title: 'Working Hours', detail: 'Mon - Sun: 24/7 Reception' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5">
                    <div className="p-3 bg-brand-100 rounded-2xl text-brand-700">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-900 text-sm uppercase tracking-widest mb-1">{item.title}</h3>
                      <p className="text-brand-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-brand-900 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl font-bold mb-4">Need immediate help?</h3>
                  <p className="text-brand-300 text-sm mb-6">Our concierge team is available via live chat for urgent inquiries.</p>
                  <button className="bg-white text-brand-900 px-8 py-3 rounded-full font-medium hover:bg-brand-100 transition-all flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Start Live Chat
                  </button>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-brand-100"
            >
              {formState === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-6 bg-green-50 rounded-full mb-6 text-green-600">
                    <Send className="h-10 w-10" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-brand-900 mb-4">Message Sent!</h2>
                  <p className="text-brand-500 mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-brand-700 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-3xl font-bold text-brand-900 mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-5 py-4 bg-brand-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-500 transition-all outline-none text-brand-900"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          className="w-full px-5 py-4 bg-brand-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-500 transition-all outline-none text-brand-900"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Subject</label>
                      <select className="w-full px-5 py-4 bg-brand-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-500 transition-all outline-none text-brand-900 appearance-none">
                        <option>General Inquiry</option>
                        <option>Booking Question</option>
                        <option>Special Request</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Your Message</label>
                      <textarea 
                        required
                        rows={5}
                        className="w-full px-5 py-4 bg-brand-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-500 transition-all outline-none text-brand-900 resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button 
                      disabled={formState === 'submitting'}
                      type="submit"
                      className="w-full bg-brand-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/20 flex items-center justify-center disabled:opacity-50"
                    >
                      {formState === 'submitting' ? (
                        <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
