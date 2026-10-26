import React, { useState, useMemo, useEffect } from 'react';
import {
  calculateWowBudget,
  formatBDT,
  buildWhatsAppBookingMessage,
  generateVoucherId,
  BusinessConfig,
} from '../utils/calculator';
import { VoucherModalData } from './VoucherModal';
import {
  Sliders,
  Camera,
  Armchair,
  PlusCircle,
  UtensilsCrossed,
  DollarSign,
  MessageCircle,
  FileText,
  Check,
  AlertCircle,
  Calendar,
  User,
  Phone,
  MapPin,
  TrendingUp,
} from 'lucide-react';

interface BudgetCalculatorSectionProps {
  config: BusinessConfig;
  preloadedPackage?: { name: string; price: number } | null;
  onGenerateVoucher: (data: VoucherModalData) => void;
}

export const BudgetCalculatorSection: React.FC<BudgetCalculatorSectionProps> = ({
  config,
  preloadedPackage,
  onGenerateVoucher,
}) => {
  const [eventType, setEventType] = useState('বিয়ে ও রিসেপশন (Wedding & Reception)');
  const [photoVal, setPhotoVal] = useState<number>(6000);
  const [photoName, setPhotoName] = useState<string>('বেসিক ফটোগ্রাফি (১ জন সিনিয়র ফটোগ্রাফার)');
  const [stageVal, setStageVal] = useState<number>(7000);
  const [stageName, setStageName] = useState<string>('স্ট্যান্ডার্ড হলুদ/বার্থডে স্টেজ');

  const [addons, setAddons] = useState<Array<{ id: string; name: string; price: number; selected: boolean }>>([
    { id: 'sound', name: 'প্রফেশনাল সাউন্ড সিস্টেম', price: 4000, selected: false },
    { id: 'lighting', name: 'ভেন্যু অ্যাম্বিয়েন্ট লাইটিং', price: 5000, selected: false },
    { id: 'drone', name: '4K ড্রোন এরিয়াল শট', price: 3500, selected: false },
    { id: 'album', name: 'প্রিমিয়াম ওয়েডিং ফটোবুক', price: 4500, selected: false },
    { id: 'pyro', name: 'ব্রাইডাল কোল্ড ফায়ার পাইরো ও ফগ', price: 3000, selected: false },
  ]);

  const [guestCount, setGuestCount] = useState<number>(0);
  const [plateRate, setPlateRate] = useState<number>(0);

  // Client Details Form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync if preset package is passed
  useEffect(() => {
    if (preloadedPackage) {
      setEventVenue(`${preloadedPackage.name} (স্পেশাল কম্বো)`);
    }
  }, [preloadedPackage]);

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  const budgetResult = useMemo(() => {
    return calculateWowBudget({
      eventType,
      photoPrice: photoVal,
      photoName,
      stagePrice: stageVal,
      stageName,
      addons,
      guestCount,
      plateRate,
    });
  }, [eventType, photoVal, photoName, stageVal, stageName, addons, guestCount, plateRate]);

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'আপনার নাম লিখুন';
    if (!clientPhone.trim()) errs.clientPhone = 'মোবাইল নাম্বার দিন';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    const msg = buildWhatsAppBookingMessage(
      {
        clientName: clientName.trim(),
        phone: clientPhone.trim(),
        eventType,
        date: eventDate,
        venue: eventVenue.trim() || 'ভেন্যু এখনো চূড়ান্ত হয়নি',
        items: budgetResult.items,
        total: budgetResult.total,
        advance: budgetResult.advance,
      },
      config.brandNameEn
    );

    window.open(`https://wa.me/${config.whatsapp}?text=${msg}`, '_blank');
  };

  const handleGenerateVoucher = () => {
    if (!validateForm()) return;
    const invNo = Math.floor(1000 + Math.random() * 9000).toString();
    const modalData: VoucherModalData = {
      type: 'estimate',
      invNo,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      eventDate: eventDate || 'শীঘ্রই নির্ধারিত হবে',
      eventVenue: eventVenue.trim() || eventType,
      items: budgetResult.items.length > 0 ? budgetResult.items : [{ name: 'কাস্টম ইভেন্ট প্যাকেজ', price: budgetResult.total }],
      total: budgetResult.total,
      paid: budgetResult.advance,
      due: budgetResult.total - budgetResult.advance,
      dateStr: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    onGenerateVoucher(modalData);
  };

  return (
    <div className="card-glass p-5 sm:p-7 rounded-2xl border border-amber-500/30 animate-fade-in space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold gold-text flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <span>কাস্টম ইভেন্ট বাজেট ক্যালকুলেটর ও বুকিং</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          আপনার পছন্দমতো সার্ভিস সিলেক্ট করুন, রিয়েল-টাইমে মোট সম্ভাব্য খরচ ও বুকিং অগ্রিম হিসাব হয়ে যাবে।
        </p>
      </div>

      <div className="space-y-5">
        
        {/* 1. Event Type */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-1.5">
            ১. ইভেন্টের ধরন নির্বাচন করুন
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
          >
            <option value="বিয়ে ও রিসেপশন (Wedding & Reception)">বিয়ে ও রিসেপশন (Wedding & Reception)</option>
            <option value="গায়ে হলুদ ও মেহেদি সন্ধ্যা (Holud Night)">গায়ে হলুদ ও মেহেদি সন্ধ্যা (Holud Night)</option>
            <option value="জন্মদিন ও ফ্যামিলি পার্টি (Birthday Party)">জন্মদিন ও ফ্যামিলি পার্টি (Birthday Party)</option>
            <option value="কর্পোরেট প্রোগ্রাম (Corporate Event)">কর্পোরেট প্রোগ্রাম (Corporate Event)</option>
          </select>
        </div>

        {/* 2. Photography Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-1.5 flex items-center gap-1.5">
            <Camera className="w-4 h-4" />
            <span>২. ফটোগ্রাফি ও সিনেমাটোগ্রাফি প্যাকেজ</span>
          </label>
          <select
            value={photoVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPhotoVal(val);
              const selectedOpt = e.target.selectedOptions[0];
              setPhotoName(selectedOpt.getAttribute('data-name') || '');
            }}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
          >
            <option value={0} data-name="ফটোগ্রাফি প্রয়োজন নেই">
              কোনো ফটোগ্রাফি প্রয়োজন নেই (৳ ০)
            </option>
            <option value={6000} data-name="বেসিক ফটোগ্রাফি (১ জন সিনিয়র ফটোগ্রাফার)">
              বেসিক ফটোগ্রাফি - ১ জন সিনিয়র ফটোগ্রাফার (৳ ৬,০০০)
            </option>
            <option value={14000} data-name="ফটোগ্রাফি + সিনেমাটোগ্রাফি কম্বো">
              ফটোগ্রাফি + সিনেমাটোগ্রাফি কম্বো (৳ ১৪,০০০)
            </option>
            <option value={24000} data-name="রয়েল টিম (২ ফটো + ২ সিনেমাটো + ড্রোন শট)">
              রয়েল টিম: ২ ফটো + ২ সিনেমাটো + ড্রোন শট (৳ ২৪,০০০)
            </option>
          </select>
        </div>

        {/* 3. Stage Decoration Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-1.5 flex items-center gap-1.5">
            <Armchair className="w-4 h-4" />
            <span>৩. স্টেজ ডেকোরেশন ও ভেন্যু সাজসজ্জা</span>
          </label>
          <select
            value={stageVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setStageVal(val);
              const selectedOpt = e.target.selectedOptions[0];
              setStageName(selectedOpt.getAttribute('data-name') || '');
            }}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
          >
            <option value={0} data-name="স্টেজ ডেকোরেশন প্রয়োজন নেই">
              স্টেজ ডেকোরেশন প্রয়োজন নেই (৳ ০)
            </option>
            <option value={7000} data-name="স্ট্যান্ডার্ড হলুদ/বার্থডে স্টেজ">
              স্ট্যান্ডার্ড হলুদ বা বার্থডে স্টেজ (৳ ৭,০০০)
            </option>
            <option value={18000} data-name="প্রিমিয়াম ফ্লাওয়ার স্টেজ + এন্ট্রি গেট">
              প্রিমিয়াম ফ্লাওয়ার স্টেজ + এন্ট্রি গেট (৳ ১৮,০০০)
            </option>
            <option value={35000} data-name="রয়েল ভিআইপি ওয়েডিং স্টেজ + গেট + ফটোবুথ">
              রয়েল ভিআইপি ওয়েডিং স্টেজ + গেট + ফটোবুথ (৳ ৩৫,০০০)
            </option>
          </select>
        </div>

        {/* 4. Add-ons Checkboxes */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4" />
            <span>৪. অতিরিক্ত সার্ভিস (Add-ons)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {addons.map((addon) => (
              <label
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition select-none text-xs sm:text-sm ${
                  addon.selected
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                    : 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addon.selected}
                    onChange={() => {}} // handled by parent
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>{addon.name}</span>
                </div>
                <span className="font-semibold text-amber-400 font-mono">
                  +৳ {formatBDT(addon.price)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. Catering Calculator */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-1.5 flex items-center gap-1.5">
            <UtensilsCrossed className="w-4 h-4" />
            <span>৫. ক্যাটারিং ও খাবার খরচ (ঐচ্ছিক)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">অতিথির সংখ্যা</label>
              <input
                type="number"
                min={0}
                value={guestCount === 0 ? '' : guestCount}
                onChange={(e) => setGuestCount(Math.max(0, Number(e.target.value) || 0))}
                placeholder="যেমন: 200"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">প্রতি প্লেট খাবার রেট</label>
              <select
                value={plateRate}
                onChange={(e) => setPlateRate(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              >
                <option value={0}>ক্যাটারিং লাগবে না (৳ ০)</option>
                <option value={350}>স্ট্যান্ডার্ড মেনু (৳ ৩৫০/প্লেট)</option>
                <option value={500}>স্পেশাল কাচ্চি/পোলাও মেনু (৳ ৫০০/প্লেট)</option>
                <option value={750}>রয়েল ভিআইপি মেনু (৳ ৭৫০/প্লেট)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Price Summary Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-700/15 to-amber-950/40 border border-amber-500/40 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-amber-300 font-medium uppercase tracking-wider">
              মোট আনুমানিক বাজেট (Estimated Total)
            </p>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 font-mono">
              ৳ {formatBDT(budgetResult.total)}
            </h3>
            <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>বুকিং কনফার্মেশন অগ্রিম (৩০%): </span>
              <strong className="text-amber-300 font-mono">৳ {formatBDT(budgetResult.advance)}</strong>
            </p>
          </div>

          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7 text-amber-400" />
          </div>
        </div>

        {/* Client Details Form */}
        <div className="border-t border-gray-800 pt-5 space-y-4">
          <h4 className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>আপনার বুকিং তথ্য দিন (Client Details):</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <input
                type="text"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (formErrors.clientName) setFormErrors((prev) => ({ ...prev, clientName: '' }));
                }}
                placeholder="আপনার পূর্ণ নাম *"
                className={`w-full bg-gray-900 border rounded-xl p-3 text-slate-100 placeholder-gray-500 focus:outline-none ${
                  formErrors.clientName ? 'border-rose-500' : 'border-gray-700 focus:border-amber-400'
                }`}
              />
              {formErrors.clientName && (
                <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.clientName}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (formErrors.clientPhone) setFormErrors((prev) => ({ ...prev, clientPhone: '' }));
                }}
                placeholder="মোবাইল নাম্বার *"
                className={`w-full bg-gray-900 border rounded-xl p-3 text-slate-100 placeholder-gray-500 focus:outline-none ${
                  formErrors.clientPhone ? 'border-rose-500' : 'border-gray-700 focus:border-amber-400'
                }`}
              />
              {formErrors.clientPhone && (
                <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.clientPhone}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-300 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                placeholder="ইভেন্ট ভেন্যু / পূর্ণ ঠিকানা"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-slate-100 placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="flex-1 gold-gradient text-gray-950 font-bold py-3 px-4 rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-gray-950" />
              <span>হোয়াটসঅ্যাপে বুকিং পাঠান</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateVoucher}
              className="flex-1 bg-gray-800 hover:bg-gray-700 border border-amber-500/40 text-amber-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition active:scale-95"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>ডিজিটাল কোটেশন ডাউনলোড</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
