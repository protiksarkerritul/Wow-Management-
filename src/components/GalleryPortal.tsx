import React, { useState } from 'react';
import { SAMPLE_CLIENT_GALLERIES, ClientGalleryItem } from '../data/wowData';
import { BusinessConfig } from '../utils/calculator';
import {
  CloudDownload,
  Search,
  ExternalLink,
  FolderOpen,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

interface GalleryPortalProps {
  config: BusinessConfig;
}

export const GalleryPortal: React.FC<GalleryPortalProps> = ({ config }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState<ClientGalleryItem | null>(null);

  const filteredGalleries = SAMPLE_CLIENT_GALLERIES.filter((g) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      g.eventCode.toLowerCase().includes(q) ||
      g.titleBn.toLowerCase().includes(q) ||
      g.categoryBn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="card-glass p-6 sm:p-8 rounded-2xl text-center space-y-4 border border-amber-500/30">
        <div className="w-16 h-16 rounded-2xl gold-gradient mx-auto flex items-center justify-center text-gray-950 text-3xl shadow-lg shadow-amber-500/20">
          <CloudDownload className="w-8 h-8 text-gray-950" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold gold-text">
            ক্লায়েন্ট ফটো ও ভিডিও ডেলিভারি জোন
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mt-2 leading-relaxed">
            "{config.brandNameEn}"-এর মাধ্যমে কভার করা আপনার ইভেন্টের সকল অরিজিনাল ছবি, এডিটেড পোর্ট্রেট এবং সিনেম্যাটিক ভিডিও সম্পূর্ণ এইচডি কোয়ালিটিতে সহজে ডাউনলোড করুন।
          </p>
        </div>

        {/* Search & Google Drive CTA */}
        <div className="max-w-md mx-auto bg-gray-900/90 p-4 rounded-2xl border border-gray-800 space-y-3 shadow-inner">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="আপনার ইভেন্ট কোড বা নাম লিখুন (যেমন: WES-2026-101)..."
              className="w-full bg-gray-950 border border-gray-700 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-gray-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <a
            href={config.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full gold-gradient text-gray-950 font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm hover:opacity-95 transition"
          >
            <FolderOpen className="w-4 h-4 text-gray-950" />
            <span>গুগল ড্রাইভ ফোল্ডার ওপেন করুন</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        <p className="text-[11px] text-gray-400">
          * ফোল্ডার অ্যাক্সেস লিংক পেতে বা মেমোরি ড্রাইভ কুরিয়ার ডেলিভারির জন্য আমাদের হটলাইনে (+{config.whatsapp}) যোগাযোগ করুন।
        </p>
      </div>

      {/* Delivered Client Albums Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>সাম্প্রতিক ডেলিভারিকৃত অ্যালবামসমূহ (Recent Delivered Albums)</span>
          </h3>
          <span className="text-xs text-gray-500">
            {filteredGalleries.length}টি অ্যালবাম প্রদর্শিত
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGalleries.map((item) => (
            <div
              key={item.id}
              className="card-glass rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-400/50 transition flex flex-col justify-between group shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-gray-950/90 text-amber-300 border border-amber-500/40">
                    {item.eventCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>ডেলিভার্ড</span>
                  </span>
                </div>

                <button
                  onClick={() => setPreviewItem(item)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-black text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>প্রিভিউ</span>
                </button>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.titleBn}
                </h4>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>{item.categoryBn}</span>
                  <span className="text-amber-400 font-semibold">{item.photoCount}</span>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-500">{item.dateBn}</span>
                  <a
                    href={config.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>ড্রাইভ ফাইল খুলুন</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#121420] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full border border-white/20 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={previewItem.coverImage}
              alt={previewItem.titleBn}
              className="w-full h-80 object-cover"
            />

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-400 font-mono font-bold block mb-1">
                  {previewItem.eventCode} • {previewItem.categoryBn}
                </span>
                <h3 className="text-base font-bold text-white">
                  {previewItem.titleBn}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  ডেলিভারি ফাইল: {previewItem.photoCount}
                </p>
              </div>

              <a
                href={config.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl gold-gradient text-gray-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow"
              >
                <FolderOpen className="w-4 h-4" />
                <span>ড্রাইভ ডাউনলোড</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
