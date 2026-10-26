import React from 'react';
import { READY_PACKAGES, ReadyPackage } from '../data/eventData';
import { Check, Crown, Sparkles, Star, ArrowRight } from 'lucide-react';
import { formatBDT } from '../utils/calculator';

interface PackagesSectionProps {
  onSelectPackage: (pkg: ReadyPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-20 bg-[#0e1017] relative">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>রেডিমেড প্যাকেজ (Ready Event Packages)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ঝামেলাহীন পূর্ণাঙ্গ আয়োজনে <span className="gold-gradient-text">রেডি প্যাকেজ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            কোনো জটিলতা ছাড়াই একটি মাত্র ক্লিকে বেছে নিন আপনার বাজেটের সেরা প্যাকেজ। প্রতিটি প্যাকেজে রয়েছে আমাদের সর্বোচ্চ মানসম্পন্ন সার্ভিসের নিশ্চয়তা।
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {READY_PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            const isRoyal = pkg.tier === 'royal';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#1c1f2e] via-[#151724] to-[#0f111a] border-2 border-amber-400/80 shadow-amber-500/15 md:-translate-y-2'
                    : isRoyal
                    ? 'bg-gradient-to-b from-[#1b1910] via-[#14141d] to-[#0f1017] border border-amber-500/50 hover:border-amber-400 shadow-amber-900/20'
                    : 'bg-[#12141f] border border-slate-700 hover:border-amber-500/40'
                }`}
              >
                {/* Popular or Royal Ribbon Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md ${
                        isPopular
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black'
                          : isRoyal
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isPopular && <Star className="w-3.5 h-3.5 fill-black text-black" />}
                      {isRoyal && <Crown className="w-3.5 h-3.5 text-white" />}
                      <span>{pkg.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Target */}
                  <div className="text-center pb-6 border-b border-slate-800 pt-2">
                    <h3 className="font-royal text-2xl font-bold text-white mb-1">
                      {pkg.nameBn}
                    </h3>
                    <div className="text-xs text-amber-400/80 font-mono mb-4">
                      {pkg.nameEn}
                    </div>

                    {/* Price Tag */}
                    <div className="py-2">
                      <span className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-royal">
                        {formatBDT(pkg.priceBDT)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 font-light">
                      {pkg.idealForBn}
                    </p>
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#1e2235] text-[11px] text-amber-300 font-medium">
                      ধারণক্ষমতা: {pkg.guestCapacityBn}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="py-6 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      প্যাকেজের প্রধান সুবিধাসমূহ:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="rounded-full p-0.5 bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-amber-500/20'
                        : 'bg-[#1e2235] hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/40 hover:border-transparent'
                    }`}
                  >
                    <span>প্যাকেজটি নির্বাচন করুন (Select Package)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
