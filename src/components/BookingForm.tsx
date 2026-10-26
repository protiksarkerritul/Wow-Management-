import React, { useState, useEffect } from 'react';
import { BookingFormSubmission, generateVoucherId, formatBDT, generateWhatsAppLink } from '../utils/calculator';
import {
  Calendar,
  User,
  Phone,
  MapPin,
  FileText,
  Sparkles,
  MessageCircle,
  Download,
  AlertCircle,
  CheckCircle2,
  Tag,
} from 'lucide-react';

interface BookingFormProps {
  brandName: string;
  businessPhone: string;
  initialData?: {
    eventType?: string;
    guestCount?: number;
    estimatedBudget?: number;
    selectedServices?: string[];
  };
  onGenerateVoucher: (submission: BookingFormSubmission) => void;
}

const ALL_AVAILABLE_SERVICES = [
  'বিয়ে ও রিসেপশন স্টেজ ডেকোরেশন',
  'গায়ে হলুদ ও মেহেদি ডেকোর',
  'প্রফেশনাল ফটোগ্রাফি (২ জন)',
  '4K সিনেমাটোগ্রাফি ও ট্রেলার',
  'ড্রোন এরিয়াল কভারেজ',
  'কনসার্ট গ্রেড সাউন্ড ও লাইটিং',
  'LED ডিসপ্লে ওয়াল সেটআপ',
  'ট্রেডিশনাল কাচ্চি বিরিয়ানি ক্যাটারিং',
  'রয়্যাল ব্যাঙ্কোয়েট ডিলাক্স বুফে',
  'ব্রাইডাল এন্ট্রি পাইরো ও কোল্ড ফগ',
  'গ্র্যান্ড এন্ট্রি তোরণ ও ফ্লাওয়ার প্যাসেজ',
  'প্রফেশনাল ডিজে ও ইভেন্ট হোস্ট',
];

export const BookingForm: React.FC<BookingFormProps> = ({
  brandName,
  businessPhone,
  initialData,
  onGenerateVoucher,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [eventType, setEventType] = useState('বিয়ে ও রিসেপশন');
  const [guestCount, setGuestCount] = useState<number>(250);
  const [estimatedBudget, setEstimatedBudget] = useState<number>(150000);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'বিয়ে ও রিসেপশন স্টেজ ডেকোরেশন',
    'প্রফেশনাল ফটোগ্রাফি (২ জন)',
    'কনসার্ট গ্রেড সাউন্ড ও লাইটিং',
  ]);
  const [specialNotes, setSpecialNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialData if updated from Calculator or Packages
  useEffect(() => {
    if (initialData) {
      if (initialData.eventType) setEventType(initialData.eventType);
      if (initialData.guestCount) setGuestCount(initialData.guestCount);
      if (initialData.estimatedBudget) setEstimatedBudget(initialData.estimatedBudget);
      if (initialData.selectedServices && initialData.selectedServices.length > 0) {
        setSelectedServices(initialData.selectedServices);
      }
    }
  }, [initialData]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) {
      errs.clientName = 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন';
    }
    if (!phone.trim()) {
      errs.phone = 'মোবাইল নাম্বার প্রদান আবশ্যক';
    } else if (!/^(?:\+88|88)?01[3-9]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'সঠিক বাংলাদেশী মোবাইল নাম্বার লিখুন (যেমন: 01712345678)';
    }
    if (!eventDate) {
      errs.eventDate = 'ইভেন্টের আনুমানিক তারিখ সিলেক্ট করুন';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const submission: BookingFormSubmission = {
      clientName: clientName.trim(),
      phone: phone.trim(),
      eventDate,
      venue: venue.trim() || 'ভেন্যু এখনো চূড়ান্ত হয়নি',
      eventType,
      guestCount,
      selectedServices,
      estimatedBudget,
      specialNotes: specialNotes.trim(),
      voucherId: generateVoucherId(),
      createdAt: new Date().toISOString(),
      brandName,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onGenerateVoucher(submission);
    }, 400);
  };

  const handleQuickWhatsApp = () => {
    if (!validate()) return;
    const submission: BookingFormSubmission = {
      clientName: clientName.trim(),
      phone: phone.trim(),
      eventDate,
      venue: venue.trim() || 'ভেন্যু এখনো চূড়ান্ত হয়নি',
      eventType,
      guestCount,
      selectedServices,
      estimatedBudget,
      specialNotes: specialNotes.trim(),
      voucherId: generateVoucherId(),
      createdAt: new Date().toISOString(),
      brandName,
    };
    const waLink = generateWhatsAppLink(businessPhone, submission);
    window.open(waLink, '_blank');
  };

  return (
    <section id="booking" className="py-20 bg-[#0c0d14] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>অনলাইন বুকিং ও ভাউচার জেনারেটর (Online Booking & Voucher)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            আপনার ইভেন্টটি <span className="gold-gradient-text">কনফার্ম করুন</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            তথ্যগুলো পূরণ করে এক ক্লিকে ইনস্ট্যান্ট বুকিং সামারি ভাউচার তৈরি ও প্রিন্ট করুন অথবা সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপে পাঠিয়ে দিন।
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="bg-[#121420] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* 1. Client Name */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>ক্লায়েন্টের নাম (Client Name) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.clientName) setErrors((prev) => ({ ...prev, clientName: '' }));
                  }}
                  placeholder="যেমন: মো: আরিফুল ইসলাম"
                  className={`w-full bg-[#191c2b] border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    errors.clientName ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.clientName && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.clientName}</span>
                  </p>
                )}
              </div>

              {/* 2. Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>মোবাইল নাম্বার (Phone Number) *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="যেমন: 01712345678"
                  className={`w-full bg-[#191c2b] border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    errors.phone ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* 3. Event Date */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>ইভেন্টের তারিখ (Event Date) *</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                    if (errors.eventDate) setErrors((prev) => ({ ...prev, eventDate: '' }));
                  }}
                  className={`w-full bg-[#191c2b] border rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition ${
                    errors.eventDate ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.eventDate && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.eventDate}</span>
                  </p>
                )}
              </div>

              {/* 4. Event Venue / Location */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ভেন্যু বা ঠিকানা (Venue / Location)</span>
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="যেমন: সেনা মালঞ্চ / গুলশান লেডিস ক্লাব / বাসা"
                  className="w-full bg-[#191c2b] border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition"
                />
              </div>

              {/* 5. Event Type */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  ইভেন্টের ধরন (Event Category)
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#191c2b] border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition"
                >
                  <option value="বিয়ে ও রিসেপশন">বিয়ে ও রিসেপশন (Wedding & Reception)</option>
                  <option value="গায়ে হলুদ ও মেহেদি">গায়ে হলুদ ও মেহেদি (Holud & Mehendi)</option>
                  <option value="জন্মদিন ও ঘরোয়া পার্টি">জন্মদিন ও ঘরোয়া পার্টি (Birthday & Family Party)</option>
                  <option value="কর্পোরেট ইভেন্ট ও সেমিনার">কর্পোরেট ইভেন্ট ও সেমিনার (Corporate Event)</option>
                  <option value="এনগেজমেন্ট ও আংটি বদল">এনগেজমেন্ট ও আংটি বদল (Engagement)</option>
                  <option value="অন্যান্য কাস্টম আয়োজন">অন্যান্য কাস্টম আয়োজন (Other Custom Event)</option>
                </select>
              </div>

              {/* 6. Guest Count & Estimated Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                    অতিথি সংখ্যা
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={5000}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#191c2b] border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-3 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                    আনুমানিক বাজেট
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                    className="w-full bg-[#191c2b] border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-3 text-sm text-amber-300 font-bold focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* 7. Selected Services Chips / Multi-select */}
            <div>
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>প্রয়োজনীয় সার্ভিসসমূহ নির্বাচন করুন (Selected Services)</span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({selectedServices.length}টি নির্বাচিত)
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {ALL_AVAILABLE_SERVICES.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-amber-500/20 border border-amber-400 text-amber-200'
                          : 'bg-[#181a27] border border-slate-700/80 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isChecked ? 'text-amber-400' : 'text-slate-600'}`}
                      />
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8. Special Notes / Custom Requirements */}
            <div>
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>বিশেষ নোট বা নির্দেশনা (Special Notes / Requirements)</span>
              </label>
              <textarea
                rows={3}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="যেমন: কোনো নির্দিষ্ট কালার থিম, প্রিয় ফুলের ধরন বা স্টেজ সাইজ সংক্রান্ত কোনো তথ্য থাকলে লিখুন..."
                className="w-full bg-[#191c2b] border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none"
              />
            </div>

            {/* Action Buttons: Confirm & Generate Voucher + WhatsApp */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="text-xs text-slate-400 text-center sm:text-left">
                আনুমানিক প্রাক্কলন: <strong className="text-amber-300 font-bold">{formatBDT(estimatedBudget)}</strong>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>হোয়াটসঅ্যাপে বুকিং পাঠান</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'প্রস্তুত হচ্ছে...' : 'বুকিং কনফার্ম ও ভাউচার ডাউনলোড করুন'}</span>
                </button>
              </div>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
