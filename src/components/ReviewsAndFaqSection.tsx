import React, { useState } from 'react';
import { CLIENT_REVIEWS, FAQS } from '../data/eventData';
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, Sparkles } from 'lucide-react';

export const ReviewsAndFaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0b10] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Testimonials / Client Reviews */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>গ্রাহকদের মূল্যবান মতামত (Client Reviews)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ক্লায়েন্টদের সন্তুষ্টিই আমাদের <span className="gold-gradient-text">প্রকৃত অর্জন</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-[#121420] border border-amber-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{review.commentBn}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-amber-200">{review.nameBn}</div>
                    <div className="text-[11px] text-slate-400">{review.eventBn}</div>
                  </div>
                  <span className="text-[10px] text-slate-500">{review.dateBn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>সচরাচর জিজ্ঞাসা (Frequently Asked Questions)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              আপনার যা জানা <span className="gold-gradient-text">প্রয়োজন</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#121420] border border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-slate-100 hover:text-amber-300 transition"
                  >
                    <span className="text-sm font-semibold pr-4">
                      {faq.qBn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-[#161826]">
                      <p className="mb-2">{faq.aBn}</p>
                      <p className="text-[11px] text-amber-300/70 font-mono">EN: {faq.qEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
