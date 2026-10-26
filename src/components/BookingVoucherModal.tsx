import React from 'react';
import { BookingFormSubmission, formatBDT, generateWhatsAppLink } from '../utils/calculator';
import { X, Printer, MessageCircle, Crown, CheckCircle2, Calendar, MapPin, Phone, User, FileText, Download } from 'lucide-react';

interface BookingVoucherModalProps {
  booking: BookingFormSubmission;
  businessPhone: string;
  onClose: () => void;
}

export const BookingVoucherModal: React.FC<BookingVoucherModalProps> = ({
  booking,
  businessPhone,
  onClose,
}) => {
  const whatsappUrl = generateWhatsAppLink(businessPhone, booking);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-4 sm:my-8 bg-[#12141f] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print bg-[#181a28] px-5 py-3.5 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>বুকিং প্রাক্কলন ও ভাউচার সফলভাবে প্রস্তুত হয়েছে</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF ভাউচার</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে পাঠান</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Voucher Document Area */}
        <div id="printable-voucher" className="p-8 sm:p-10 bg-[#0d0e15] text-slate-100 relative">
          
          {/* Subtle watermark background emblem */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Crown className="w-96 h-96 text-amber-400" />
          </div>

          {/* Luxury Frame Border */}
          <div className="border border-amber-500/30 rounded-2xl p-6 sm:p-8 relative">
            
            {/* Header: Brand & Voucher No */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-amber-500/40 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-royal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                    {booking.brandName || 'স্বর্ণালী ইভেন্ট ম্যানেজমেন্ট'}
                  </h2>
                  <p className="text-[11px] text-amber-400/80 font-mono tracking-wider">
                    ROYAL EVENT MANAGEMENT & WEDDING PLANNING VOUCHER
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="inline-block bg-amber-500/20 border border-amber-500/50 text-amber-300 px-3 py-1 rounded text-xs font-mono font-bold">
                  {booking.voucherId}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  ইস্যু তারিখ: {new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  স্ট্যাটাস: প্রাথমিক বুকিং কনফার্মড
                </div>
              </div>
            </div>

            {/* Client & Event Info 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-[#141622] border border-amber-500/20 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-amber-300 uppercase tracking-wider text-xs mb-2">
                  গ্রাহকের তথ্য (Client Details):
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">{booking.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{booking.venue || 'ভেন্যু এখনো নির্ধারিত হয়নি'}</span>
                </div>
              </div>

              <div className="space-y-2 sm:border-l sm:border-slate-800 sm:pl-6">
                <div className="font-semibold text-amber-300 uppercase tracking-wider text-xs mb-2">
                  ইভেন্টের বিবরণ (Event Schedule):
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>তারিখ: <strong className="text-amber-200">{booking.eventDate || 'শীঘ্রই জানানো হবে'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ধরন: {booking.eventType}</span>
                </div>
                <div className="text-slate-300">
                  অতিথির সংখ্যা: <strong className="text-amber-200">{booking.guestCount} জন</strong>
                </div>
              </div>
            </div>

            {/* Selected Services List */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                নির্বাচিত সার্ভিস ও সুবিধাসমূহ (Selected Services):
              </div>
              <div className="flex flex-wrap gap-2">
                {booking.selectedServices.length > 0 ? (
                  booking.selectedServices.map((service, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1c1f2e] border border-amber-500/30 text-amber-200 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">স্ট্যান্ডার্ড ফুল ইভেন্ট সার্ভিসেস</span>
                )}
              </div>
            </div>

            {/* Special Notes if any */}
            {booking.specialNotes && (
              <div className="mb-6 p-3 rounded-lg bg-[#141624] border border-slate-800 text-xs">
                <span className="text-amber-400 font-medium">বিশেষ নির্দেশনাবলী: </span>
                <span className="text-slate-300">{booking.specialNotes}</span>
              </div>
            )}

            {/* Pricing Summary Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171a29] to-[#12141f] border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">প্রাক্কলিত মোট বাজেট (Estimated Total)</span>
                <span className="text-2xl sm:text-3xl font-extrabold gold-gradient-text font-royal">
                  {formatBDT(booking.estimatedBudget)}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  (অগ্রিম ২৫-৩০% প্রদান সাপেক্ষে চূড়ান্ত ভেন্যু বুকিং ও ডেট লক করা হবে)
                </span>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 text-xs text-slate-400">
                <div>হটলাইন: <span className="text-amber-300 font-mono">+880 1712-345678</span></div>
                <div>ইমেইল: <span className="text-amber-300">contact@royaleventsbd.com</span></div>
                <div>অফিস: গুলশান / ধানমন্ডি, ঢাকা</div>
              </div>
            </div>

            {/* Official Footer Note & Signatures */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-end justify-between text-[11px] text-slate-400">
              <div className="max-w-md">
                <p>
                  * এই ভাউচারটি একটি কম্পিউটার জেনারেটেড প্রাথমিক বুকিং সামারি। আমাদের এক্সিকিউটিভ আপনার সাথে যোগাযোগ করে চূড়ান্ত চুক্তি সম্পন্ন করবেন।
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-amber-500/40 mb-1" />
                <span className="text-amber-300 font-royal font-bold">অনুমোদিত স্বাক্ষর</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Footer with CTA Buttons (hidden in print) */}
        <div className="no-print bg-[#161824] px-6 py-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            ভাউচারটি আপনার ফোনে সেভ করতে প্রিন্ট ক্লিক করে 'Save as PDF' নির্বাচন করুন।
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>ডাউনলোড বা প্রিন্ট</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
