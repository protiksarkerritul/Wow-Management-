import React from 'react';
import { Crown, MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  brandName: string;
  businessPhone: string;
}

export const Footer: React.FC<FooterProps> = ({ brandName, businessPhone }) => {
  const cleanPhone = businessPhone.replace(/[^0-9]/g, '');

  return (
    <footer id="contact" className="bg-[#08090d] border-t border-amber-500/20 text-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-[1.5px] flex items-center justify-center shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-[#0d0e15] rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-royal text-lg font-bold text-white tracking-wide">
                  {brandName}
                </h3>
                <p className="text-[10px] text-amber-400/80 tracking-widest uppercase">
                  Royal Event Management
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              "আপনার স্বপ্নের আয়োজন, আমাদের নিখুঁত ব্যবস্থাপনা।" জীবনের প্রতিটি আনন্দঘন ও রাজকীয় উৎসবকে স্মরণীয় করে তুলতে আমরা নিবেদিতপ্রাণ।
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#161824] border border-amber-500/30 hover:border-amber-400 flex items-center justify-center text-amber-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold font-serif">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#161824] border border-amber-500/30 hover:border-amber-400 flex items-center justify-center text-amber-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center text-emerald-400 hover:text-white transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              দ্রুত লিঙ্ক (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition">সেবা সমূহ (Our Services)</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition">কাস্টম বাজেট ক্যালকুলেটর (Budget Calculator)</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition">রেডি প্যাকেজ (Ready Packages)</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-amber-400 transition">কাজের গ্যালারি (Event Portfolio)</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-400 transition">অনলাইন বুকিং ও ভাউচার (Online Booking)</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              মূল সেবাসমূহ (Services)
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• বিয়ে ও রিসেপশন স্টেজ ডেকোর</li>
              <li>• গায়ে হলুদ ও মেহেন্দি উৎসব</li>
              <li>• ৪কে সিনেমাটোগ্রাফি ও ড্রোন শট</li>
              <li>• কনসার্ট সাউন্ড ও এলইডি ওয়াল</li>
              <li>• ব্যাঙ্কোয়েট ও কাচ্চি ক্যাটারিং</li>
              <li>• করপোরেট গালা ও সেমিনার</li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              যোগাযোগ ও অফিস (Contact)
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>প্লট নং ১২, রোড নং ৭/এ, ধানমন্ডি / গুলশান-২, ঢাকা-১২১২, বাংলাদেশ [আপনার ঠিকানা]</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="space-y-0.5">
                <a href="tel:+8801712345678" className="hover:text-amber-300 block font-mono">
                  +880 1712-345678
                </a>
                <a href="tel:+8801911889900" className="hover:text-amber-300 block font-mono text-slate-400">
                  +880 1911-889900
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:contact@royaleventsbd.com" className="hover:text-amber-300 font-mono">
                contact@royaleventsbd.com
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>প্রতিদিন সকাল ১০:০০ - রাত ১০:০০ (সাপ্তাহিক ৭ দিন)</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {brandName}. সর্বস্বত্ব সংরক্ষিত (All rights reserved).
          </p>
          <p className="flex items-center gap-1">
            <span>নির্মিত হয়েছে নিখুঁত যত্নে</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>রাজকীয় প্রতিটি স্মৃতির তরে</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
