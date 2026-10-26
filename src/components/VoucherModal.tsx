import React from 'react';
import { formatBDT, BusinessConfig, ServiceItem } from '../utils/calculator';
import { Printer, MessageCircle, X, Crown, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export interface VoucherModalData {
  type: 'estimate' | 'invoice';
  invNo: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventVenue?: string;
  items: ServiceItem[];
  total: number;
  paid: number;
  due: number;
  dateStr: string;
}

interface VoucherModalProps {
  data: VoucherModalData;
  config: BusinessConfig;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ data, config, onClose }) => {
  const isEstimate = data.type === 'estimate';

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsApp = () => {
    const lines = [
      `*${isEstimate ? '📄 ডিজিটাল কোটেশন' : '🧾 অফিসিয়াল মানি রিসিট'} - ${config.brandNameEn}*`,
      `ভাউচার নং: #${data.invNo}`,
      `তারিখ: ${data.dateStr}`,
      `---------------------------`,
      `ক্লায়েন্টের নাম: ${data.clientName || 'সম্মানিত ক্লায়েন্ট'}`,
      `মোবাইল: ${data.clientPhone || '-'}`,
      `ইভেন্টের তারিখ: ${data.eventDate || '-'}`,
      data.eventVenue ? `ভেন্যু: ${data.eventVenue}` : '',
      `---------------------------`,
      `মোট বিল: ৳ ${formatBDT(data.total)}`,
      !isEstimate ? `জমা / পেইড: ৳ ${formatBDT(data.paid)}` : `প্রস্তাবিত ৩০% অগ্রিম: ৳ ${formatBDT(data.paid)}`,
      !isEstimate ? `বকেয়া: ৳ ${formatBDT(data.due)}` : '',
      `---------------------------`,
      `প্রতিষ্ঠান: ${config.brandNameBn}`,
      `হটলাইন: +${config.whatsapp}`,
    ].filter(Boolean);

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-4 sm:my-8 bg-[#11131f] border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top Control Bar (Hidden when printed) */}
        <div className="no-print bg-[#181a28] px-4 sm:px-6 py-3 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isEstimate ? 'ডিজিটাল কোটেশন প্রস্তুত' : 'অফিসিয়াল মানি রিসিট প্রস্তুত'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
            <button
              onClick={shareWhatsApp}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>হোয়াটসঅ্যাপ</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div id="printableArea" className="p-6 sm:p-8 bg-white text-slate-900 text-xs sm:text-sm space-y-4 relative">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-amber-600 pb-3 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                  {config.brandNameEn.toUpperCase()}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-700 mt-0.5">
                {config.subTitle}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                ঠিকানা: {config.address}
              </p>
              <p className="text-[11px] text-slate-600">
                হটলাইন: +{config.whatsapp}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`inline-block px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                  isEstimate
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {isEstimate ? 'ESTIMATE / QUOTATION' : 'OFFICIAL MONEY RECEIPT'}
              </span>
              <p className="text-[11px] text-slate-500 mt-2">
                তারিখ: <strong>{data.dateStr}</strong>
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                ভাউচার নং: <strong>#{data.invNo}</strong>
              </p>
            </div>
          </div>

          {/* Client Details Box */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">ক্লায়েন্টের নাম:</span>
              <strong className="text-slate-800 text-sm">{data.clientName || 'সম্মানিত ক্লায়েন্ট'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">মোবাইল নাম্বার:</span>
              <strong className="text-slate-800 font-mono text-sm">{data.clientPhone || '-'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">ইভেন্টের তারিখ:</span>
              <strong className="text-slate-800">{data.eventDate || '-'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">ভেন্যু বা বিবরণ:</span>
              <strong className="text-slate-800">{data.eventVenue || 'অফিসিয়াল বুকিং'}</strong>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-2.5 border border-slate-700">ক্রম</th>
                  <th className="p-2.5 border border-slate-700">সার্ভিসের বিবরণ</th>
                  <th className="p-2.5 border border-slate-700 text-right">পরিমাণ (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.items.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="p-2.5 border border-slate-200 text-slate-500 w-12 text-center">{idx + 1}</td>
                    <td className="p-2.5 border border-slate-200 font-medium text-slate-800">{item.name}</td>
                    <td className="p-2.5 border border-slate-200 text-right font-mono font-semibold text-slate-900">
                      ৳ {formatBDT(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary */}
          <div className="border-t-2 border-slate-900 pt-3 text-right space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between sm:justify-end gap-6">
              <span className="text-slate-600">মোট বিল (Total):</span>
              <strong className="font-mono text-base text-slate-900">৳ {formatBDT(data.total)}</strong>
            </div>

            <div className="flex justify-between sm:justify-end gap-6 text-emerald-700 font-medium">
              <span>{isEstimate ? 'প্রস্তাবিত ৩০% অগ্রিম (Advance):' : 'জমা / পরিশোধ (Paid Amount):'}</span>
              <strong className="font-mono">৳ {formatBDT(data.paid)}</strong>
            </div>

            {!isEstimate && (
              <div className="flex justify-between sm:justify-end gap-6 text-rose-600 font-bold text-sm sm:text-base pt-1 border-t border-slate-200">
                <span>বকেয়া (Due Balance):</span>
                <span className="font-mono">৳ {formatBDT(data.due)}</span>
              </div>
            )}
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 flex justify-between items-end text-xs text-slate-500 border-t border-dashed mt-6">
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1" />
              <span>ক্লায়েন্টের স্বাক্ষর</span>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-600/40 text-amber-700 flex flex-col items-center justify-center p-1 text-[9px] uppercase font-bold leading-none rotate-[-6deg] mb-1">
                <Crown className="w-3.5 h-3.5 text-amber-600 mb-0.5" />
                <span>SEAL OF</span>
                <span className="text-[8px] text-slate-800 font-black">APPROVAL</span>
              </div>
              <div className="w-36 border-b border-slate-400 mb-1" />
              <span className="font-semibold text-slate-700">{config.brandNameEn} কর্তৃপক্ষ</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Controls (Hidden when printed) */}
        <div className="no-print bg-[#161824] px-4 sm:px-6 py-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            * প্রিন্ট বাটনে ক্লিক করে সরাসরি প্রিন্ট করতে পারেন অথবা 'Save as PDF' অপশন দিয়ে সেভ করতে পারেন।
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF সেভ</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
