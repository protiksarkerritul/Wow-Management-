import React, { useState } from 'react';
import { BusinessConfig, calculateInvoiceDue, formatBDT, generateVoucherId } from '../utils/calculator';
import { StoredInvoice } from '../data/wowData';
import { VoucherModalData } from './VoucherModal';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Settings,
  Receipt,
  Printer,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Calendar,
  Phone,
  User,
  ExternalLink,
} from 'lucide-react';

interface AdminPanelProps {
  config: BusinessConfig;
  onUpdateConfig: (newConfig: BusinessConfig) => void;
  onGenerateInvoice: (modalData: VoucherModalData) => void;
  invoices: StoredInvoice[];
  onSaveInvoice: (inv: StoredInvoice) => void;
  onDeleteInvoice: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  config,
  onUpdateConfig,
  onGenerateInvoice,
  invoices,
  onSaveInvoice,
  onDeleteInvoice,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Business Config Form State
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [address, setAddress] = useState(config.address);
  const [driveUrl, setDriveUrl] = useState(config.driveUrl);
  const [adminPin, setAdminPin] = useState(config.adminPin);
  const [configSavedNotice, setConfigSavedNotice] = useState(false);

  // Invoice Generator Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [desc, setDesc] = useState('');
  const [totalBill, setTotalBill] = useState<number | ''>('');
  const [paidAmount, setPaidAmount] = useState<number | ''>('');
  const [invoiceErrors, setInvoiceErrors] = useState<Record<string, string>>({});

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === config.adminPin) {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('ভুল পিন কোড! সঠিক পিন দিন (ডিফল্ট: 1234)');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BusinessConfig = {
      ...config,
      whatsapp: whatsapp.trim() || '8801700000000',
      address: address.trim() || 'গাইবান্ধা সদর, গাইবান্ধা, বাংলাদেশ',
      driveUrl: driveUrl.trim() || 'https://drive.google.com',
      adminPin: adminPin.trim() || '1234',
    };
    onUpdateConfig(updated);
    setConfigSavedNotice(true);
    setTimeout(() => setConfigSavedNotice(false), 3000);
  };

  const numTotal = Number(totalBill) || 0;
  const numPaid = Number(paidAmount) || 0;
  const dueInfo = calculateInvoiceDue(numTotal, numPaid);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'ক্লায়েন্টের নাম আবশ্যক';
    if (!clientPhone.trim()) errs.clientPhone = 'মোবাইল নাম্বার আবশ্যক';
    if (numTotal <= 0) errs.totalBill = 'মোট চুক্তিবদ্ধ বিল প্রদান করুন';

    if (Object.keys(errs).length > 0) {
      setInvoiceErrors(errs);
      return;
    }
    setInvoiceErrors({});

    const invNo = generateVoucherId('WES');
    const invoiceRecord: StoredInvoice = {
      id: invNo,
      invNo,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      eventDate: eventDate || 'নভেম্বর ২০২৬',
      description: desc.trim() || 'ইভেন্ট ম্যানেজমেন্ট ও ফটোগ্রাফি সার্ভিস',
      total: numTotal,
      paid: numPaid,
      due: dueInfo.due,
      status: dueInfo.status,
      createdAt: new Date().toISOString(),
    };

    onSaveInvoice(invoiceRecord);

    const modalData: VoucherModalData = {
      type: 'invoice',
      invNo,
      clientName: invoiceRecord.clientName,
      clientPhone: invoiceRecord.clientPhone,
      eventDate: invoiceRecord.eventDate,
      eventVenue: 'অফিসিয়াল মানি রিসিট',
      items: [{ name: invoiceRecord.description, price: numTotal }],
      total: numTotal,
      paid: numPaid,
      due: dueInfo.due,
      dateStr: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    onGenerateInvoice(modalData);
  };

  const handleReprintStoredInvoice = (inv: StoredInvoice) => {
    const modalData: VoucherModalData = {
      type: 'invoice',
      invNo: inv.invNo,
      clientName: inv.clientName,
      clientPhone: inv.clientPhone,
      eventDate: inv.eventDate,
      eventVenue: 'অফিসিয়াল মানি রিসিট',
      items: [{ name: inv.description, price: inv.total }],
      total: inv.total,
      paid: inv.paid,
      due: inv.due,
      dateStr: new Date(inv.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    onGenerateInvoice(modalData);
  };

  // If locked, render PIN screen
  if (!isUnlocked) {
    return (
      <div className="card-glass p-8 rounded-2xl max-w-md mx-auto text-center space-y-6 animate-fade-in border border-amber-500/30">
        <div className="w-16 h-16 rounded-2xl gold-gradient mx-auto flex items-center justify-center text-gray-950 text-2xl shadow-lg shadow-amber-500/20">
          <ShieldCheck className="w-8 h-8 text-gray-950" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">অ্যাডমিন প্যানেল লক করা আছে</h3>
          <p className="text-xs text-gray-400 mt-1">
            শুধুমাত্র "{config.brandNameEn}" কর্তৃপক্ষের ব্যবহারের জন্য (ডিফল্ট পিন: <strong>1234</strong>)
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              placeholder="পিন কোড লিখুন"
              maxLength={8}
              autoFocus
              className="w-full bg-gray-900 border border-gray-700 focus:border-amber-400 rounded-xl p-3.5 text-center text-xl tracking-widest text-amber-300 focus:outline-none"
            />
          </div>

          {pinError && (
            <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{pinError}</span>
            </p>
          )}

          <button
            type="submit"
            className="w-full gold-gradient text-gray-950 font-bold py-3 rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>আনলক করুন (Unlock Admin)</span>
          </button>
        </form>
      </div>
    );
  }

  // Unlocked Admin Dashboard
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Admin Header */}
      <div className="card-glass p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>অ্যাডমিন ম্যানেজমেন্ট ড্যাশবোর্ড</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                ACTIVE
              </span>
            </h2>
            <p className="text-xs text-gray-400">{config.brandNameEn} • কন্ট্রোল প্যানেল</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsUnlocked(false);
            setPinInput('');
          }}
          className="px-3.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>লক করুন (Lock)</span>
        </button>
      </div>

      {/* 1. Business Config Settings */}
      <div className="card-glass p-6 rounded-2xl space-y-4 border border-amber-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>১. প্রতিষ্ঠানের তথ্য ও সেটিংস (ব্রাউজারে সেভ থাকবে)</span>
          </h3>
          {configSavedNotice && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>সেভ করা হয়েছে!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-xs text-gray-400 block mb-1">হোয়াটসঅ্যাপ হটলাইন (880 সহ)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="যেমন: 8801700000000"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">অ্যাডমিন পিন কোড</label>
              <input
                type="text"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="ডিফল্ট: 1234"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 block mb-1">অফিসের ঠিকানা</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="যেমন: গাইবান্ধা সদর, গাইবান্ধা, বাংলাদেশ"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 block mb-1">ক্লায়েন্ট ফটো ডেলিভারি গুগল ড্রাইভ লিংক</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
                />
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2.5 bg-gray-800 hover:bg-gray-700 text-amber-400 rounded-lg flex items-center justify-center shrink-0"
                  title="টেস্ট করুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow transition"
            >
              <Save className="w-4 h-4" />
              <span>সেটিংস সেভ করুন (Save Settings)</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Official Money Receipt / Invoice Generator */}
      <div className="card-glass p-6 rounded-2xl space-y-4 border-2 border-amber-500/40 shadow-xl">
        <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          <span>২. ইনস্ট্যান্ট মানি রিসিট ও পাকা ভাউচার তৈরি (Money Receipt Maker)</span>
        </h3>
        <p className="text-xs text-gray-400">
          ক্লায়েন্টের পেমেন্ট গ্রহণ করে পাকা ক্যাশ মেমো / মানি রিসিট তৈরি করুন। মোট বিল ও জমার হিসাব থেকে স্বয়ংক্রিয়ভাবে বকেয়া হিসাব হয়ে যাবে।
        </p>

        <form onSubmit={handleCreateInvoice} className="space-y-4 pt-2">
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <label className="text-xs text-gray-400 block mb-1">ক্লায়েন্টের নাম *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className={`w-full bg-gray-900 border rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none ${
                  invoiceErrors.clientName ? 'border-rose-500' : 'border-gray-700 focus:border-amber-400'
                }`}
              />
              {invoiceErrors.clientName && (
                <p className="text-[11px] text-rose-400 mt-0.5">{invoiceErrors.clientName}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">মোবাইল নাম্বার *</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="যেমন: 01712345678"
                className={`w-full bg-gray-900 border rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none ${
                  invoiceErrors.clientPhone ? 'border-rose-500' : 'border-gray-700 focus:border-amber-400'
                }`}
              />
              {invoiceErrors.clientPhone && (
                <p className="text-[11px] text-rose-400 mt-0.5">{invoiceErrors.clientPhone}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">ইভেন্টের তারিখ</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">সার্ভিসের বিবরণ</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="যেমন: প্রিমিয়াম ওয়েডিং স্টেজ ও ২ জন ফটোগ্রাফার"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">মোট চুক্তিবদ্ধ বিল (Total BDT) *</label>
              <input
                type="number"
                min={0}
                value={totalBill}
                onChange={(e) => setTotalBill(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="যেমন: 28000"
                className={`w-full bg-gray-900 border rounded-lg p-2.5 text-sm font-bold text-amber-300 focus:outline-none ${
                  invoiceErrors.totalBill ? 'border-rose-500' : 'border-gray-700 focus:border-amber-400'
                }`}
              />
              {invoiceErrors.totalBill && (
                <p className="text-[11px] text-rose-400 mt-0.5">{invoiceErrors.totalBill}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">জমা / অগ্রিম গ্রহণ (Paid Amount)</label>
              <input
                type="number"
                min={0}
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="যেমন: 10000"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm font-bold text-emerald-400 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Live Due Calculator preview strip */}
          <div className="bg-[#141724] p-4 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-gray-400">মোট বিল: </span>
              <strong className="text-white font-mono text-sm">৳ {formatBDT(numTotal)}</strong>
            </div>
            <div>
              <span className="text-gray-400">পরিশোধ: </span>
              <strong className="text-emerald-400 font-mono text-sm">৳ {formatBDT(numPaid)}</strong>
            </div>
            <div>
              <span className="text-gray-400">বকেয়া (Due): </span>
              <strong className="text-rose-400 font-mono text-sm">৳ {formatBDT(dueInfo.due)}</strong>
            </div>
            <div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  dueInfo.status === 'paid'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : dueInfo.status === 'partial'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {dueInfo.status === 'paid' ? 'সম্পূর্ণ পরিশোধিত' : dueInfo.status === 'partial' ? 'আংশিক বকেয়া' : 'বকেয়া'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full gold-gradient text-gray-950 font-bold py-3.5 rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Printer className="w-5 h-5 text-gray-950" />
            <span>অফিসিয়াল মানি রিসিট তৈরি ও প্রিন্ট করুন</span>
          </button>
        </form>
      </div>

      {/* 3. Recent Invoices / Receipts Table */}
      <div className="card-glass p-6 rounded-2xl space-y-4 border border-amber-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>৩. পূর্ববর্তী মানি রিসিট ও ভাউচার হিস্ট্রি ({invoices.length}টি)</span>
          </h3>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-500">
            এখনো কোনো মানি রিসিট সেভ করা হয়নি। উপরের ফর্ম পূরণ করে তৈরি করুন।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">ভাউচার নং</th>
                  <th className="py-2.5 px-3">ক্লায়েন্ট ও মোবাইল</th>
                  <th className="py-2.5 px-3">তারিখ</th>
                  <th className="py-2.5 px-3 text-right">মোট (৳)</th>
                  <th className="py-2.5 px-3 text-right">জমা (৳)</th>
                  <th className="py-2.5 px-3 text-right">বকেয়া (৳)</th>
                  <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
                  <th className="py-2.5 px-3 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 font-sans">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-900/40 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-300">#{inv.invNo}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white">{inv.clientName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{inv.clientPhone}</div>
                    </td>
                    <td className="py-2.5 px-3 text-gray-400">{inv.eventDate}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-white">৳ {formatBDT(inv.total)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-400">৳ {formatBDT(inv.paid)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-400">৳ {formatBDT(inv.due)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : inv.status === 'partial'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {inv.status === 'paid' ? 'পরিশোধিত' : inv.status === 'partial' ? 'আংশিক' : 'বকেয়া'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleReprintStoredInvoice(inv)}
                          className="p-1 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black transition"
                          title="পুনরায় প্রিন্ট করুন"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteInvoice(inv.id)}
                          className="p-1 rounded bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-black transition"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
