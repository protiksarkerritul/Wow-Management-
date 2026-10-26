import React from 'react';
import { Calendar, Sparkles, Award, ShieldCheck, HeartHandshake, ArrowRight, Calculator } from 'lucide-react';

interface HeroProps {
  brandName: string;
  onNavigateToBooking: () => void;
  onNavigateToPackages: () => void;
  onNavigateToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  brandName,
  onNavigateToBooking,
  onNavigateToPackages,
  onNavigateToCalculator,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
      {/* Background radial gold glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/10 via-yellow-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Golden Pattern / Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f5c542 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Brand Name Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-amber-500/10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-semibold">{brandName}</span>
          <span className="text-amber-500/70 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline text-xs">প্রিমিয়াম ওয়েডিং ও ইভেন্ট এক্সপেরিয়েন্স</span>
        </div>

        {/* Hero Main Heading & Requested Tagline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          <span className="block text-slate-100 font-serif mb-2">
            আপনার স্বপ্নের আয়োজন,
          </span>
          <span className="gold-gradient-text font-royal drop-shadow-sm block">
            আমাদের নিখুঁত ব্যবস্থাপনা
          </span>
        </h1>

        {/* English & Bengali bilingual subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-light">
          বিয়ে, রিসেপশন, গায়ে হলুদ কিংবা কর্পোরেট সামিট—প্রতিটি বিশেষ মুহূর্তকে রাজকীয় রূপ দিতে আমরা দিচ্ছি প্রিমিয়াম স্টেজ ডেকোরেশন, 4K সিনেমাটোগ্রাফি, কনসার্ট লাইটিং ও ঐতিহ্যবাহী ব্যাঙ্কোয়েট ক্যাটারিং।
          <span className="block text-xs sm:text-sm text-amber-300/80 mt-2 font-mono">
            Crafting Unforgettable Royal Experiences with Precision & Elegance
          </span>
        </p>

        {/* Quick CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onNavigateToBooking}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-bold text-black rounded-full overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Calendar className="w-5 h-5 mr-2 text-black" />
            <span>বুকিং করুন (Book Now)</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onNavigateToPackages}
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-amber-200 rounded-full bg-[#161824] hover:bg-[#202336] border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 active:scale-95"
          >
            <Award className="w-5 h-5 mr-2 text-amber-400" />
            <span>প্যাকেজ দেখুন (Check Packages)</span>
          </button>

          <button
            onClick={onNavigateToCalculator}
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-slate-300 hover:text-white rounded-full bg-[#12131d]/80 hover:bg-[#1a1c2a] border border-slate-700 hover:border-amber-500/50 transition-all duration-300"
          >
            <Calculator className="w-4 h-4 mr-2 text-amber-400" />
            <span>বাজেট ক্যালকুলেটর (Calculator)</span>
          </button>
        </div>

        {/* Luxury Trust Indicators / Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-amber-500/15">
          <div className="bg-[#11131c]/80 border border-amber-500/10 rounded-2xl p-4 text-center hover:border-amber-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-royal">১,০০০+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">সফল ইভেন্ট</div>
            <div className="text-[11px] text-slate-500">1000+ Completed Events</div>
          </div>

          <div className="bg-[#11131c]/80 border border-amber-500/10 rounded-2xl p-4 text-center hover:border-amber-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-royal">১৫+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">বছরের অভিজ্ঞতা</div>
            <div className="text-[11px] text-slate-500">15+ Years Legacy</div>
          </div>

          <div className="bg-[#11131c]/80 border border-amber-500/10 rounded-2xl p-4 text-center hover:border-amber-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-royal">১০০%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">কাস্টমাইজড প্ল্যান</div>
            <div className="text-[11px] text-slate-500">Tailored to Your Vision</div>
          </div>

          <div className="bg-[#11131c]/80 border border-amber-500/10 rounded-2xl p-4 text-center hover:border-amber-500/30 transition">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-royal">২৪/৭</div>
            <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">ডেডিকেটেড টিম</div>
            <div className="text-[11px] text-slate-500">Full Support on Event Day</div>
          </div>
        </div>

      </div>
    </section>
  );
};
