/**
 * Core business calculation and formatting utilities for Wow Event Solution
 */

export interface ServiceItem {
  name: string;
  price: number;
  category?: string;
}

export interface WowBudgetCalculationInput {
  eventType: string;
  photoPrice: number;
  photoName: string;
  stagePrice: number;
  stageName: string;
  addons: Array<{ name: string; price: number; selected: boolean }>;
  guestCount: number;
  plateRate: number;
}

export interface WowBudgetResult {
  total: number;
  advance: number;
  cateringTotal: number;
  items: ServiceItem[];
}

export function calculateWowBudget(input: WowBudgetCalculationInput): WowBudgetResult {
  const items: ServiceItem[] = [];
  let total = 0;

  if (input.photoPrice > 0) {
    items.push({ name: input.photoName, price: input.photoPrice, category: 'ফটোগ্রাফি' });
    total += input.photoPrice;
  }

  if (input.stagePrice > 0) {
    items.push({ name: input.stageName, price: input.stagePrice, category: 'স্টেজ ও ডেকোরেশন' });
    total += input.stagePrice;
  }

  input.addons.forEach((addon) => {
    if (addon.selected && addon.price > 0) {
      items.push({ name: addon.name, price: addon.price, category: 'অতিরিক্ত সার্ভিস' });
      total += addon.price;
    }
  });

  const guestCount = Math.max(0, Math.floor(input.guestCount || 0));
  const plateRate = Math.max(0, Math.floor(input.plateRate || 0));
  const cateringTotal = guestCount > 0 && plateRate > 0 ? guestCount * plateRate : 0;

  if (cateringTotal > 0) {
    items.push({
      name: `ক্যাটারিং সার্ভিস (${guestCount} জন × ৳${plateRate})`,
      price: cateringTotal,
      category: 'খাবার ও ক্যাটারিং',
    });
    total += cateringTotal;
  }

  const advance = Math.round(total * 0.3);

  return {
    total,
    advance,
    cateringTotal,
    items,
  };
}

export function calculateInvoiceDue(total: number, paid: number): { due: number; status: 'paid' | 'partial' | 'unpaid' } {
  const safeTotal = Math.max(0, Math.floor(total || 0));
  const safePaid = Math.max(0, Math.floor(paid || 0));
  const due = Math.max(0, safeTotal - safePaid);

  let status: 'paid' | 'partial' | 'unpaid' = 'unpaid';
  if (safePaid >= safeTotal && safeTotal > 0) {
    status = 'paid';
  } else if (safePaid > 0) {
    status = 'partial';
  }

  return { due, status };
}

export function formatBDT(amount: number): string {
  return Math.round(amount || 0).toLocaleString('en-IN');
}

export function generateVoucherId(prefix: string = 'WES'): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${rand}`;
}

export interface BusinessConfig {
  brandNameEn: string;
  brandNameBn: string;
  tagline: string;
  subTitle: string;
  whatsapp: string;
  address: string;
  driveUrl: string;
  adminPin: string;
}

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  brandNameEn: 'Wow Event Solution',
  brandNameBn: 'ওয়াও ইভেন্ট সলিউশন',
  tagline: 'আপনার স্বপ্নের আয়োজন, আমাদের নিখুঁত ব্যবস্থাপনা',
  subTitle: 'ওয়াও ইভেন্ট সলিউশন • প্রিমিয়াম ইভেন্ট ও ফটোগ্রাফি',
  whatsapp: '8801700000000',
  address: 'গাইবান্ধা সদর, গাইবান্ধা, বাংলাদেশ',
  driveUrl: 'https://drive.google.com',
  adminPin: '1234',
};

export function buildWhatsAppBookingMessage(
  booking: {
    clientName: string;
    phone: string;
    eventType: string;
    date: string;
    venue: string;
    items: ServiceItem[];
    total: number;
    advance: number;
  },
  brandName: string = 'Wow Event Solution'
): string {
  const serviceList = booking.items.map((i) => `• ${i.name}: ৳${formatBDT(i.price)}`).join('\n');
  const lines = [
    `*✨ নতুন ইভেন্ট বুকিং - ${brandName}*`,
    `---------------------------`,
    `*ক্লায়েন্টের নাম:* ${booking.clientName || 'সম্মানিত ক্লায়েন্ট'}`,
    `*মোবাইল নাম্বার:* ${booking.phone || 'দেওয়া হয়নি'}`,
    `*ইভেন্টের ধরন:* ${booking.eventType}`,
    `*তারিখ:* ${booking.date || 'শীঘ্রই নির্ধারিত হবে'}`,
    `*ভেন্যু:* ${booking.venue || 'দেওয়া হয়নি'}`,
    `---------------------------`,
    `*নির্বাচিত সার্ভিসসমূহ:*`,
    serviceList || '• কাস্টম প্যাকেজ',
    `---------------------------`,
    `*মোট প্রাক্কলিত বিল:* ৳ ${formatBDT(booking.total)}`,
    `*বুকিং অগ্রিম (৩০%):* ৳ ${formatBDT(booking.advance)}`,
    `---------------------------`,
    `ধন্যবাদ, ${brandName}`,
  ];

  return encodeURIComponent(lines.join('\n'));
}
