import React, { useState } from 'react';
import { Crown, Phone, Calendar, Menu, X, Edit3, Check } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  onUpdateBrandName: (name: string) => void;
  onNavigateToBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName,
  onUpdateBrandName,
  onNavigateToBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [tempBrandName, setTempBrandName] = useState(brandName);

  const handleSaveBrand = () => {
    if (tempBrandName.trim()) {
      onUpdateBrandName(tempBrandName.trim());
    }
    setIsEditingBrand(false);
  };

  const navLinks = [
    { labelBn: 'হোম', labelEn: 'Home', href: '#hero' },
    { labelBn: 'সেবা সমূহ', labelEn: 'Services', href: '#services' },
    { labelBn: 'বাজেট ক্যালকুলেটর', labelEn: 'Calculator', href: '#calculator' },
    { labelBn: 'রেডিমেড প্যাকেজ', labelEn: 'Packages', href: '#packages' },
    { labelBn: 'পোর্টফোলিও', labelEn: 'Portfolio', href: '#portfolio' },
    { labelBn: 'বুকিং ফর্ম', labelEn: 'Booking', href: '#booking' },
    { labelBn: 'যোগাযোগ', labelEn: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d12]/90 backdrop-blur-md border-b border-amber-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-[1.5px] flex items-center justify-center shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#0d0e15] rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              {isEditingBrand ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempBrandName}
                    onChange={(e) => setTempBrandName(e.target.value)}
                    className="bg-[#171924] text-amber-200 border border-amber-400/50 rounded px-2 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 max-w-[160px] sm:max-w-xs"
                    placeholder="প্রতিষ্ঠানের নাম..."
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveBrand()}
                  />
                  <button
                    onClick={handleSaveBrand}
                    className="p-1 bg-amber-500 hover:bg-amber-400 text-black rounded text-xs"
                    title="সংরক্ষণ করুন"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 group max-w-[180px] sm:max-w-md">
                  <span className="font-royal text-base sm:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 truncate">
                    {brandName}
                  </span>
                  <button
                    onClick={() => {
                      setTempBrandName(brandName);
                      setIsEditingBrand(true);
                    }}
                    className="opacity-70 group-hover:opacity-100 text-amber-400 hover:text-amber-200 p-1 rounded transition text-xs flex items-center shrink-0"
                    title="প্রতিষ্ঠানের নাম পরিবর্তন করুন"
                    aria-label="Edit Brand Name"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              )}
              <span className="text-[10px] sm:text-[11px] text-amber-400/70 tracking-widest font-medium uppercase truncate max-w-[160px] sm:max-w-none">
                Royal Event Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex flex-col items-center group font-medium"
              >
                <span>{link.labelBn}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-amber-300/70 transition-colors">
                  {link.labelEn}
                </span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Hotline */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+8801712345678"
              className="flex items-center gap-2 text-xs text-amber-300/90 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+880 1712-345678</span>
            </a>

            <button
              onClick={onNavigateToBooking}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 group-hover:from-amber-600 group-hover:to-yellow-500 text-black shadow-lg shadow-amber-500/20 active:scale-95 transition"
            >
              <span className="px-4 py-2 transition-all ease-in duration-75 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>বুকিং করুন (Book Now)</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onNavigateToBooking}
              className="bg-amber-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              বুকিং
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-amber-400 hover:text-white p-2 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d12]/98 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-amber-500/20">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#141620] hover:bg-amber-500/10 hover:border-amber-500/30 border border-transparent transition text-left"
              >
                <div className="text-amber-200 text-sm font-medium">{link.labelBn}</div>
                <div className="text-slate-500 text-[11px]">{link.labelEn}</div>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="tel:+8801712345678"
              className="flex items-center gap-2 text-xs text-amber-300 bg-[#161824] border border-amber-500/30 px-3 py-2 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+880 1712-345678</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBooking();
              }}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              বুকিং ফর্ম খুলুন
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
