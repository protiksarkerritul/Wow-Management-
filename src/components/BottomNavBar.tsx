import React from 'react';
import { Home, Calculator, CloudDownload, ShieldCheck } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'home' | 'calculator' | 'gallery' | 'admin';
  onSwitchTab: (tab: 'home' | 'calculator' | 'gallery' | 'admin') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/98 backdrop-blur-md border-t border-amber-500/25 px-2 py-1.5 no-print md:hidden shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center text-[10px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-${tab.id}`}
              onClick={() => {
                onSwitchTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-1.5 flex flex-col items-center gap-1 transition rounded-lg ${
                isActive
                  ? 'text-amber-400 font-bold bg-amber-500/10'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span className="leading-tight">{tab.labelBn}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
