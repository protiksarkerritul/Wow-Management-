import React, { useState } from 'react';
import { EVENT_SERVICES, EventService } from '../data/eventData';
import { Sparkles, CheckCircle2, ArrowRight, Eye, X, Shield, CalendarCheck } from 'lucide-react';
import { formatBDT } from '../utils/calculator';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeModalService, setActiveModalService] = useState<EventService | null>(null);

  return (
    <section id="services" className="py-20 bg-[#0e1017] relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>আমাদের প্রিমিয়াম সেবা সমূহ (Our Premium Services)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            অভিজাত প্রতিটি আয়োজনে <span className="gold-gradient-text">পরিপূর্ণ সমাধান</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            আপনার বিশেষ দিনটিকে স্মরণীয় করে তুলতে আমরা অফার করছি অভিজ্ঞ ইভেন্ট প্ল্যানার, ক্রিয়েটিভ ডেকোরেটর ও টেকনিক্যাল টিমের সমন্বিত সার্ভিস।
          </p>
        </div>

        {/* 6 Event Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#13151f] rounded-2xl border border-amber-500/20 hover:border-amber-400/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              {/* Image & Badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 bg-[#0d0e15]/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs px-3 py-1 rounded-full font-medium">
                  {service.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500/90 text-black font-bold text-xs px-2.5 py-1 rounded-md shadow">
                  {formatBDT(service.startingPrice)} থেকে শুরু
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {service.titleBn}
                    </h3>
                  </div>
                  <div className="text-xs text-amber-400/80 font-medium mb-3">
                    {service.titleEn}
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                    {service.descriptionBn}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1c1f2e] hover:bg-[#262a3e] text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>বিস্তারিত (Details)</span>
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.titleBn)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 active:scale-95 transition"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>বুক করুন (Book)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141622] border border-amber-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <div className="relative h-64 sm:h-72">
              <img
                src={activeModalService.image}
                alt={activeModalService.titleBn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141622] via-[#141622]/40 to-transparent" />
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/20 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeModalService.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {activeModalService.titleBn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 font-mono">
                  {activeModalService.titleEn}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  সার্ভিসের বিবরণ (Description)
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {activeModalService.descriptionBn}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                  এই সার্ভিসে যা যা অন্তর্ভুক্ত (What's Included)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-[#1c1f2e] p-2.5 rounded-xl border border-amber-500/10">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">প্রারম্ভিক বাজেট (Starting from)</div>
                  <div className="text-xl font-bold text-amber-300">
                    {formatBDT(activeModalService.startingPrice)}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    বন্ধ করুন (Close)
                  </button>
                  <button
                    onClick={() => {
                      const title = activeModalService.titleBn;
                      setActiveModalService(null);
                      onSelectServiceForBooking(title);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs font-bold shadow-lg shadow-amber-500/20 transition active:scale-95"
                  >
                    এই সেবার জন্য বুকিং ফর্ম খুলুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
