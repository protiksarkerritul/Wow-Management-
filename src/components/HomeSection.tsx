import React from 'react';
import { WOW_SERVICES, WOW_COMBO_PACKAGES, WowComboPackage } from '../data/wowData';
import { formatBDT, BusinessConfig } from '../utils/calculator';
import {
  Sparkles,
  Calculator,
  Images,
  Camera,
  Video,
  Armchair,
  Lightbulb,
  Cake,
  Utensils,
  CheckCircle2,
  Crown,
  ArrowRight,
  ShieldCheck,
  Star,
  Box,
} from 'lucide-react';

interface HomeSectionProps {
  config: BusinessConfig;
  onSwitchTab: (tab: 'home' | 'calculator' | 'gallery' | 'admin') => void;
  onSelectComboPackage: (pkg: WowComboPackage) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  config,
  onSwitchTab,
  onSelectComboPackage,
}) => {
  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case 'camera':
        return <Camera className="w-6 h-6 text-amber-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-amber-400" />;
      case 'couch':
        return <Armchair className="w-6 h-6 text-amber-400" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case 'cake':
        return <Cake className="w-6 h-6 text-amber-400" />;
      case 'utensils':
        return <Utensils className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-gray-900 via-[#10131f] to-amber-950/40 shadow-2xl">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow">
            ✨ ওয়েডিং • কর্পোরেট • ফটোগ্রাফি • ডেকোরেশন
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mt-4 leading-tight text-white">
            আপনার স্বপ্নের আয়োজন,<br />
            <span className="gold-text">আমাদের নিখুঁত ব্যবস্থাপনা</span>
          </h2>

          <p className="text-gray-300 text-xs sm:text-base mt-3 max-w-xl leading-relaxed">
            বিয়ে, গায়ে হলুদ, রিসেপশন, জন্মদিন বা কর্পোরেট ইভেন্ট—আধুনিক স্টেজ ডেকোরেশন, সিনেমাটোগ্রাফি ও প্রফেশনাল ইভেন্ট ম্যানেজমেন্টের বিশ্বস্ত প্রতিষ্ঠান।
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onSwitchTab('calculator')}
              className="gold-gradient text-gray-950 font-bold px-6 py-3 rounded-xl shadow-lg hover:opacity-95 transition flex items-center gap-2 text-xs sm:text-sm active:scale-95"
            >
              <Calculator className="w-4 h-4 text-gray-950" />
              <span>নিজেই বাজেট তৈরি করুন</span>
            </button>

            <button
              onClick={() => onSwitchTab('gallery')}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl border border-gray-700 transition flex items-center gap-2 text-xs sm:text-sm"
            >
              <Images className="w-4 h-4 text-amber-400" />
              <span>ক্লায়েন্ট ফটো ডেলিভারি</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Core Services Grid */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>আমাদের প্রিমিয়াম সার্ভিসসমূহ (Our Core Services)</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {WOW_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="card-glass p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center justify-between hover:border-amber-400/50 transition group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {renderServiceIcon(srv.icon)}
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
                  {srv.titleBn}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                  {srv.subtitleBn}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-800/80 w-full text-[11px] text-amber-400 font-semibold">
                {srv.priceStartBn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ready Combo Packages */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-2">
            <Box className="w-4 h-4" />
            <span>জনপ্রিয় রেডিমেড কম্বো প্যাকেজ (Ready Packages)</span>
          </h3>
          <span className="text-xs text-gray-500 hidden sm:inline">সাশ্রয়ী ও ঝামেলামুক্ত</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {WOW_COMBO_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`card-glass p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'border-2 border-amber-400 bg-gradient-to-b from-[#181a28] to-[#11131f] shadow-amber-500/15 shadow-xl md:-translate-y-1'
                    : 'border border-amber-500/25 hover:border-amber-400/60'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <span className="absolute -top-3 right-4 gold-gradient text-gray-950 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full shadow">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-mono">
                    {pkg.nameEn}
                  </span>

                  <h4 className="text-lg sm:text-xl font-bold mt-2 text-white">
                    {pkg.nameBn}
                  </h4>

                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 my-2 font-mono">
                    ৳ {formatBDT(pkg.price)}
                  </p>

                  <ul className="text-xs text-gray-300 space-y-2 mt-4">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectComboPackage(pkg)}
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 active:scale-95 shadow ${
                    isPopular
                      ? 'gold-gradient text-gray-950'
                      : 'border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-950'
                  }`}
                >
                  <span>এই প্যাকেজটি বুক করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
