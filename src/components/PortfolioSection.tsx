import React, { useState } from 'react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/eventData';
import { Sparkles, MapPin, ZoomIn, X, Image as ImageIcon } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'wedding' | 'holud' | 'corporate' | 'lighting'>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const filterTabs: Array<{ id: typeof activeFilter; labelBn: string; labelEn: string }> = [
    { id: 'all', labelBn: 'সবগুলো', labelEn: 'All Events' },
    { id: 'wedding', labelBn: 'বিয়ে ও রিসেপশন', labelEn: 'Wedding' },
    { id: 'holud', labelBn: 'গায়ে হলুদ', labelEn: 'Holud' },
    { id: 'corporate', labelBn: 'কর্পোরেট', labelEn: 'Corporate' },
    { id: 'lighting', labelBn: 'স্টেজ ও লাইটিং', labelEn: 'Stage & Light' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-[#0e1017] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>আমাদের কাজের ঝলক (Recent Event Portfolio)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            অভিজ্ঞতার আলোয় <span className="gold-gradient-text">সফল আয়োজনসমূহ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            আমাদের দক্ষ টিম দ্বারা বাস্তবায়িত বাংলাদেশের সেরা ভেন্যুগুলোর চমৎকার কিছু ডেকোরেশন ও ইভেন্টের চিত্র।
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#181a27] text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30'
              }`}
            >
              <span>{tab.labelBn}</span>
              <span className="text-[10px] opacity-75">({tab.labelEn})</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#131520] border border-slate-800 hover:border-amber-400/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/50"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#0f111a]/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.categoryLabelBn}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {item.titleBn}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.locationBn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#121420] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full border border-white/20 transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.titleBn}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            <div className="p-5 flex items-center justify-between border-t border-slate-800">
              <div>
                <span className="text-xs text-amber-400 font-mono block">
                  {lightboxItem.categoryLabelBn}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {lightboxItem.titleBn}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {lightboxItem.locationBn}
                </p>
              </div>

              <button
                onClick={() => setLightboxItem(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
