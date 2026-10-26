import React from 'react';
import { BusinessConfig } from '../utils/calculator';
import { Crown, PhoneCall, Home, Calculator, CloudDownload, ShieldCheck } from 'lucide-react';

interface HeaderNavbarProps {
  config: BusinessConfig;
  activeTab: 'home' | 'calculator' | 'gallery' | 'admin';
  onSwitchTab: (tab: 'home' | 'calculator' | 'gallery' | 'admin') => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  config,
  activeTab,
  onSwitchTab,
}) => {
  const tabs = [
    { id: 'home' as const, labelBn: 'হোম ও প্যাকেজ', icon: Home },
    { id: 'calculator' as const, labelBn: 'বাজেট ও বুকিং', icon: Calculator },
    { id: 'gallery' as const, labelBn: 'ছবি ডেলিভারি', icon: CloudDownload },
    { id: 'admin' as const, labelBn: 'অ্যাডমিন ইনভয়েস', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 transition">
      <div className="max-w-4xl mx-auto flex justify-between items-center gap-2">
        
        {/* Brand */}
        <div
          onClick={() => onSwitchTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl gold-gradient flex items-center justify-center text-gray-950 font-bold text-lg sm:text-xl shadow-lg shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6 text-gray-950" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold tracking-wide gold-text truncate">
              {config.brandNameEn}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">
              {config.subTitle}
            </p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex items-center space-x-1 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSwitchTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-amber-500 text-gray-950 shadow'
                    : 'text-gray-300 hover:text-amber-300 hover:bg-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.labelBn}</span>
              </button>
            );
          })}
        </nav>

        {/* Hotline Call CTA */}
        <a
          href={`tel:+${config.whatsapp}`}
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-amber-500 hover:text-gray-950 transition shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">কল করুন</span>
          <span className="sm:hidden font-mono text-[11px]">কল</span>
        </a>

      </div>
    </header>
  );
};
