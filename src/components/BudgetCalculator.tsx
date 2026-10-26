import React, { useState, useMemo } from 'react';
import {
  calculateEventBudget,
  formatBDT,
  toBengaliNumerals,
  BudgetCalculatorInput,
  STAGE_PRICING,
  PHOTO_PRICING,
  SOUND_PRICING,
  CATERING_PRICING,
  ADDON_PRICING,
} from '../utils/calculator';
import {
  Calculator,
  Users,
  Sparkles,
  Camera,
  Music,
  UtensilsCrossed,
  PlusCircle,
  ArrowRight,
  RefreshCw,
  Check,
  TrendingUp,
} from 'lucide-react';

interface BudgetCalculatorProps {
  onApplyToBooking: (data: {
    eventType: string;
    guestCount: number;
    estimatedBudget: number;
    selectedServices: string[];
    breakdownSummary: string;
  }) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onApplyToBooking }) => {
  const [eventType, setEventType] = useState('বিয়ে ও রিসেপশন (Wedding & Reception)');
  const [guestCount, setGuestCount] = useState<number>(250);
  const [stageTier, setStageTier] = useState<'basic' | 'premium' | 'royal'>('premium');
  const [photoPackage, setPhotoPackage] = useState<'none' | 'photo_only' | 'photo_cinema' | 'drone_vip'>('photo_cinema');
  const [soundTier, setSoundTier] = useState<'none' | 'standard' | 'premium' | 'concert_royal'>('premium');
  const [cateringTier, setCateringTier] = useState<'none' | 'kacchi_traditional' | 'wedding_banquet' | 'royal_deluxe'>('kacchi_traditional');
  
  const [addons, setAddons] = useState<{
    entryGate: boolean;
    bridalPyro: boolean;
    djMusic: boolean;
    coordinatorHost: boolean;
    customTheme: boolean;
  }>({
    entryGate: true,
    bridalPyro: true,
    djMusic: false,
    coordinatorHost: true,
    customTheme: false,
  });

  const [useBengaliNumerals, setUseBengaliNumerals] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const budgetResult = useMemo(() => {
    return calculateEventBudget({
      eventType,
      guestCount,
      stageTier,
      photoPackage,
      soundTier,
      cateringTier,
      addons,
    });
  }, [eventType, guestCount, stageTier, photoPackage, soundTier, cateringTier, addons]);

  const toggleAddon = (key: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetCalculator = () => {
    setEventType('বিয়ে ও রিসেপশন (Wedding & Reception)');
    setGuestCount(250);
    setStageTier('premium');
    setPhotoPackage('photo_cinema');
    setSoundTier('premium');
    setCateringTier('kacchi_traditional');
    setAddons({
      entryGate: true,
      bridalPyro: true,
      djMusic: false,
      coordinatorHost: true,
      customTheme: false,
    });
  };

  const handleApplyToBooking = () => {
    const servicesList: string[] = [
      STAGE_PRICING[stageTier]?.bn || 'স্টেজ ডেকোরেশন',
    ];
    if (photoPackage !== 'none') servicesList.push(PHOTO_PRICING[photoPackage]?.bn);
    if (soundTier !== 'none') servicesList.push(SOUND_PRICING[soundTier]?.bn);
    if (cateringTier !== 'none') servicesList.push(CATERING_PRICING[cateringTier]?.bn);
    if (addons.entryGate) servicesList.push('গ্র্যান্ড এন্ট্রি গেট');
    if (addons.bridalPyro) servicesList.push('ব্রাইডাল পাইরো ও ফগ');
    if (addons.djMusic) servicesList.push('ডিজে মিউজিক');
    if (addons.coordinatorHost) servicesList.push('ইভেন্ট কোঅর্ডিনেটর');
    if (addons.customTheme) servicesList.push('কাস্টম ফটো বুথ');

    const summary = `ইভেন্ট: ${eventType} | অতিথি: ${guestCount} জন | স্টেজ: ${STAGE_PRICING[stageTier]?.bn} | ক্যাটারিং: ${CATERING_PRICING[cateringTier]?.bn}`;

    onApplyToBooking({
      eventType,
      guestCount,
      estimatedBudget: budgetResult.totalCost,
      selectedServices: servicesList,
      breakdownSummary: summary,
    });

    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  const guestCountPresets = [100, 200, 250, 350, 500, 800, 1000];

  return (
    <section id="calculator" className="py-20 bg-[#0a0b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>স্মার্ট বাজেট প্রাক্কলন (Smart Budget Estimator)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            কাস্টম <span className="gold-gradient-text">বাজেট ক্যালকুলেটর</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            আপনার পছন্দের ইভেন্টের ধরন, মেহমানের সংখ্যা, স্টেজ, ফটোগ্রাফি ও খাবার নির্বাচন করুন। রিয়েল-টাইমে মোট সম্ভাব্য খরচ হিসাব করুন।
          </p>
        </div>

        {/* Main Grid: Inputs on Left, Real-time Bill on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#12141f] border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* 1. Event Type */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-2 flex items-center justify-between">
                <span>১. ইভেন্টের ধরন নির্বাচন করুন (Select Event Type)</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#1b1e2c] border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none transition"
              >
                <option value="বিয়ে ও রিসেপশন (Wedding & Reception)">বিয়ে ও রিসেপশন (Wedding & Reception)</option>
                <option value="গায়ে হলুদ ও মেহেদি সন্ধ্যা (Holud & Mehendi)">গায়ে হলুদ ও মেহেদি সন্ধ্যা (Holud & Mehendi)</option>
                <option value="এনগেজমেন্ট ও আংটি বদল (Engagement Ceremony)">এনগেজমেন্ট ও আংটি বদল (Engagement Ceremony)</option>
                <option value="জন্মদিন ও ঘরোয়া পার্টি (Birthday & Family Party)">জন্মদিন ও ঘরোয়া পার্টি (Birthday & Family Party)</option>
                <option value="কর্পোরেট ইভেন্ট ও সেমিনার (Corporate Event)">কর্পোরেট ইভেন্ট ও সেমিনার (Corporate Event)</option>
                <option value="বিবাহবার্ষিকী ও পুনর্মিলনী (Anniversary & Reunion)">বিবাহবার্ষিকী ও পুনর্মিলনী (Anniversary & Reunion)</option>
              </select>
            </div>

            {/* 2. Guest Count Slider & Quick Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>২. অতিথির সংখ্যা (Guest Count)</span>
                </label>
                <div className="flex items-center gap-1.5 bg-[#1b1e2c] border border-amber-500/30 px-3 py-1 rounded-lg">
                  <span className="text-lg font-bold text-amber-300">
                    {useBengaliNumerals ? toBengaliNumerals(guestCount) : guestCount}
                  </span>
                  <span className="text-xs text-slate-400">জন</span>
                </div>
              </div>

              <input
                type="range"
                min={30}
                max={1500}
                step={10}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 mr-1">কুইক সিলেক্ট:</span>
                {guestCountPresets.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setGuestCount(count)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                      guestCount === count
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-[#1b1e2c] text-slate-300 border-slate-700 hover:border-amber-400/50'
                    }`}
                  >
                    {useBengaliNumerals ? toBengaliNumerals(count) : count}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Stage Decoration Tier */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>৩. স্টেজ ডেকোরেশন টিয়ার (Stage Decoration)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(STAGE_PRICING) as Array<keyof typeof STAGE_PRICING>).map((tierKey) => {
                  const item = STAGE_PRICING[tierKey];
                  const isSelected = stageTier === tierKey;
                  return (
                    <button
                      key={tierKey}
                      type="button"
                      onClick={() => setStageTier(tierKey as any)}
                      className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-500/20 to-transparent border-amber-400 shadow-md shadow-amber-500/10'
                          : 'bg-[#181b28] border-slate-700 hover:border-amber-500/40 text-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                      <div>
                        <div className="text-xs font-bold text-white mb-1">{item.bn}</div>
                        <div className="text-[10px] text-slate-400 mb-2">{item.en}</div>
                      </div>
                      <div className="text-sm font-extrabold text-amber-300">
                        {formatBDT(item.cost, { bengaliDigits: useBengaliNumerals })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Photography Package */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>৪. ফটোগ্রাফি ও সিনেমাটোগ্রাফি প্যাকেজ (Photography & Cinema)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(PHOTO_PRICING) as Array<keyof typeof PHOTO_PRICING>).map((key) => {
                  const item = PHOTO_PRICING[key];
                  const isSelected = photoPackage === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPhotoPackage(key as any)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400'
                          : 'bg-[#181b28] border-slate-700 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-white">{item.bn}</div>
                        <div className="text-[10px] text-slate-400">{item.en}</div>
                      </div>
                      <div className="text-xs font-bold text-amber-300 shrink-0">
                        {item.cost === 0 ? '৳ ০' : formatBDT(item.cost, { bengaliDigits: useBengaliNumerals })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Sound & Lighting */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span>৫. সাউন্ড ও থিমেটিক লাইটিং (Sound & Lighting)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(SOUND_PRICING) as Array<keyof typeof SOUND_PRICING>).map((key) => {
                  const item = SOUND_PRICING[key];
                  const isSelected = soundTier === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSoundTier(key as any)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400'
                          : 'bg-[#181b28] border-slate-700 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-white">{item.bn}</div>
                        <div className="text-[10px] text-slate-400">{item.en}</div>
                      </div>
                      <div className="text-xs font-bold text-amber-300 shrink-0">
                        {item.cost === 0 ? '৳ ০' : formatBDT(item.cost, { bengaliDigits: useBengaliNumerals })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Catering (খাবার প্যাকেজ - পার প্লেট) */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>৬. ক্যাটারিং ও ব্যাঙ্কোয়েট মেনু (Catering per Plate)</span>
              </label>
              <div className="space-y-2.5">
                {(Object.keys(CATERING_PRICING) as Array<keyof typeof CATERING_PRICING>).map((key) => {
                  const item = CATERING_PRICING[key];
                  const isSelected = cateringTier === key;
                  const estimatedTotal = item.perPlate * guestCount;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCateringTier(key as any)}
                      className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400'
                          : 'bg-[#181b28] border-slate-700 hover:border-amber-500/30'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{item.bn}</div>
                        <div className="text-[11px] text-slate-400">{item.en}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-amber-300">
                          {item.perPlate > 0 ? `৳ ${item.perPlate}/প্লেট` : 'প্রযোজ্য নয়'}
                        </div>
                        {item.perPlate > 0 && (
                          <div className="text-[10px] text-slate-400">
                            মোট: {formatBDT(estimatedTotal, { bengaliDigits: useBengaliNumerals })}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Special Add-ons */}
            <div>
              <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>৭. অতিরিক্ত এক্সক্লুসিভ অ্যাড-অন (Optional Add-ons)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(ADDON_PRICING) as Array<keyof typeof ADDON_PRICING>).map((key) => {
                  const item = ADDON_PRICING[key];
                  const isChecked = !!addons[key as keyof typeof addons];
                  return (
                    <label
                      key={key}
                      onClick={() => toggleAddon(key as any)}
                      className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between transition select-none ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-400 text-amber-200'
                          : 'bg-[#181b28] border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent label click
                          className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                        />
                        <span>{item.bn}</span>
                      </div>
                      <span className="font-bold text-amber-300 ml-2">
                        +{formatBDT(item.cost, { bengaliDigits: useBengaliNumerals })}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={resetCalculator}
                className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ক্যালকুলেটর রিসেট করুন (Reset All)</span>
              </button>
            </div>

          </div>

          {/* Real-time Result Bill Column (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-gradient-to-b from-[#181a28] to-[#12131d] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              
              {/* Luxury Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600" />

              {/* Header & Numeral Switch */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-6">
                <div>
                  <h3 className="font-royal text-lg font-bold text-amber-300">
                    আনুমানিক বাজেট সামারি
                  </h3>
                  <p className="text-xs text-slate-400">Estimated Cost Summary</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUseBengaliNumerals(!useBengaliNumerals)}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#202334] text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-black transition font-mono"
                  title="সংখ্যা বাংলা/ইংরেজিতে পরিবর্তন করুন"
                >
                  {useBengaliNumerals ? 'English Digits' : 'বাংলা সংখ্যা'}
                </button>
              </div>

              {/* Big Grand Total Display */}
              <div className="bg-[#0b0c13] rounded-2xl p-5 border border-amber-500/30 text-center mb-6 shadow-inner">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  সর্বমোট আনুমানিক খরচ (Total Estimated BDT)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-royal tracking-tight">
                  {formatBDT(budgetResult.totalCost, { bengaliDigits: useBengaliNumerals })}
                </div>
                <div className="mt-2 text-xs text-amber-400/90 font-medium flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>
                    জনপ্রতি প্রায় {formatBDT(budgetResult.perGuestCost, { bengaliDigits: useBengaliNumerals })}
                  </span>
                  <span className="text-slate-500">
                    ({useBengaliNumerals ? toBengaliNumerals(guestCount) : guestCount} জন অতিথি)
                  </span>
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-semibold text-amber-300/80 uppercase tracking-wider mb-2">
                  খরচের খাতসমূহ (Cost Breakdown)
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {budgetResult.breakdown.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/80 text-slate-300"
                    >
                      <div className="pr-2">
                        <div className="font-medium text-slate-200">{item.nameBn}</div>
                        <div className="text-[10px] text-slate-500">{item.detailsBn}</div>
                      </div>
                      <div className="font-semibold text-amber-300 shrink-0 font-mono">
                        {formatBDT(item.cost, { bengaliDigits: useBengaliNumerals })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply to Booking Form CTA Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleApplyToBooking}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition"
                >
                  {appliedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950 font-extrabold" />
                      <span>বুকিং ফর্মে যুক্ত হয়েছে! (Applied to Form)</span>
                    </>
                  ) : (
                    <>
                      <span>এই বাজেট বুকিং ফর্মে যুক্ত করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-normal">
                  * এটি একটি প্রাক্কলিত বাজেট। ভেন্যু লোকেশন ও ফাইনাল কাস্টমাইজেশনের ভিত্তিতে চূড়ান্ত বাজেট সামান্য কম বা বেশি হতে পারে।
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
