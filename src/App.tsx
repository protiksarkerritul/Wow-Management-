/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeSection } from './components/HomeSection';
import { BudgetCalculatorSection } from './components/BudgetCalculatorSection';
import { GalleryPortal } from './components/GalleryPortal';
import { AdminPanel } from './components/AdminPanel';
import { VoucherModal, VoucherModalData } from './components/VoucherModal';
import { BusinessConfig, DEFAULT_BUSINESS_CONFIG } from './utils/calculator';
import { WowComboPackage, StoredInvoice } from './data/wowData';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calculator' | 'gallery' | 'admin'>('home');
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('wow_config');
      if (saved) return JSON.parse(saved);
      // Fallback check individual keys from legacy HTML if present
      const wa = localStorage.getItem('wow_wa');
      const addr = localStorage.getItem('wow_addr');
      const drive = localStorage.getItem('wow_drive');
      if (wa || addr || drive) {
        return {
          ...DEFAULT_BUSINESS_CONFIG,
          whatsapp: wa || DEFAULT_BUSINESS_CONFIG.whatsapp,
          address: addr || DEFAULT_BUSINESS_CONFIG.address,
          driveUrl: drive || DEFAULT_BUSINESS_CONFIG.driveUrl,
        };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_BUSINESS_CONFIG;
  });

  const [invoices, setInvoices] = useState<StoredInvoice[]>(() => {
    try {
      const saved = localStorage.getItem('wow_invoices');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [preloadedPackage, setPreloadedPackage] = useState<{ name: string; price: number } | null>(null);
  const [voucherModalData, setVoucherModalData] = useState<VoucherModalData | null>(null);

  // Sync config to localStorage
  const handleUpdateConfig = (newConfig: BusinessConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wow_config', JSON.stringify(newConfig));
      localStorage.setItem('wow_wa', newConfig.whatsapp);
      localStorage.setItem('wow_addr', newConfig.address);
      localStorage.setItem('wow_drive', newConfig.driveUrl);
    } catch (e) {
      console.error(e);
    }
  };

  // Sync invoices to localStorage
  const handleSaveInvoice = (inv: StoredInvoice) => {
    const updated = [inv, ...invoices];
    setInvoices(updated);
    try {
      localStorage.setItem('wow_invoices', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInvoice = (id: string) => {
    const updated = invoices.filter((inv) => inv.id !== id);
    setInvoices(updated);
    try {
      localStorage.setItem('wow_invoices', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectComboPackage = (pkg: WowComboPackage) => {
    setPreloadedPackage({ name: pkg.nameBn, price: pkg.price });
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchTab = (tab: 'home' | 'calculator' | 'gallery' | 'admin') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f3f4f6] flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950 pb-20 md:pb-12">
      
      {/* Top Header Navbar */}
      <HeaderNavbar
        config={config}
        activeTab={activeTab}
        onSwitchTab={handleSwitchTab}
      />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 w-full flex-1">
        {activeTab === 'home' && (
          <HomeSection
            config={config}
            onSwitchTab={handleSwitchTab}
            onSelectComboPackage={handleSelectComboPackage}
          />
        )}

        {activeTab === 'calculator' && (
          <BudgetCalculatorSection
            config={config}
            preloadedPackage={preloadedPackage}
            onGenerateVoucher={(data) => setVoucherModalData(data)}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPortal config={config} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onGenerateInvoice={(data) => setVoucherModalData(data)}
            invoices={invoices}
            onSaveInvoice={handleSaveInvoice}
            onDeleteInvoice={handleDeleteInvoice}
          />
        )}
      </main>

      {/* Footer Branding info */}
      <footer className="max-w-4xl mx-auto px-4 py-6 border-t border-gray-800/80 text-center text-xs text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} {config.brandNameEn} ({config.brandNameBn}). সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-[11px] text-gray-600">
          {config.address} • হটলাইন: +{config.whatsapp}
        </p>
      </footer>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onSwitchTab={handleSwitchTab}
      />

      {/* Printable Voucher & Money Receipt Modal */}
      {voucherModalData && (
        <VoucherModal
          data={voucherModalData}
          config={config}
          onClose={() => setVoucherModalData(null)}
        />
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 no-print flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
            `হ্যালো ${config.brandNameEn}, আমি আপনাদের ইভেন্ট ম্যানেজমেন্ট ও ফটোগ্রাফি সার্ভিস সম্পর্কে জানতে চাই।`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white p-3 sm:px-4 sm:py-2.5 rounded-full shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 text-xs font-bold"
          aria-label="WhatsApp Contact"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">হোয়াটসঅ্যাপে কথা বলুন</span>
        </a>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-amber-500/30 text-amber-300 flex items-center justify-center transition shadow"
          title="উপরে যান"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
