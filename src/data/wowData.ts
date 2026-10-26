export interface WowService {
  id: string;
  icon: string;
  titleBn: string;
  subtitleBn: string;
  priceStartBn: string;
  detailsBn: string;
}

export const WOW_SERVICES: WowService[] = [
  {
    id: 'photo',
    icon: 'camera',
    titleBn: 'ওয়েডিং ফটোগ্রাফি',
    subtitleBn: 'প্রফেশনাল পোর্ট্রেট ও ক্যান্ডিড শট',
    priceStartBn: '৳ ৬,০০০ থেকে শুরু',
    detailsBn: 'ফুল ফ্রেম সিনেমা ক্যামেরা, প্রাইম লেন্স ও অভিজ্ঞ পোর্ট্রেট ফটোগ্রাফারদের সমন্বয়ে প্রতিটি আবেগময় মুহূর্তের নিখুঁত ক্যাপচার।',
  },
  {
    id: 'cinema',
    icon: 'video',
    titleBn: 'সিনেমাটোগ্রাফি ও ড্রোন',
    subtitleBn: '4K সিনেম্যাটিক ট্রেলার ও ফুল ভিডিও',
    priceStartBn: '৳ ১৪,০০০ থেকে শুরু',
    detailsBn: 'সিনেমাটিক হাইলাইটস টিজার, ড্রোন এরিয়াল ভিউ, জিমি জিব এবং প্রফেশনাল কালার গ্রেডেড এডিটিং।',
  },
  {
    id: 'stage',
    icon: 'couch',
    titleBn: 'ভিআইপি স্টেজ ডেকোরেশন',
    subtitleBn: 'তাজা ফুল, এন্ট্রি গেট ও ফটোবুথ',
    priceStartBn: '৳ ৭,০০০ থেকে শুরু',
    detailsBn: 'তাজা ও ইম্পোর্টেড ফুলের ক্লাসিক কম্বিনেশন, থিমেটিক লাইটিং ও অভিজাত এন্ট্রি ওয়াকওয়ে।',
  },
  {
    id: 'sound',
    icon: 'lightbulb',
    titleBn: 'অ্যাম্বিয়েন্ট লাইটিং ও সাউন্ড',
    subtitleBn: 'ডিজে, প্রজেকশন ও কনসার্ট সাউন্ড',
    priceStartBn: '৳ ৪,০০০ থেকে শুরু',
    detailsBn: 'শার্পি, মুভিং হেডস, স্মোক ও ড্রাই আইস ফগ, হাই কোয়ালিটি লাইন অ্যারে সাউন্ড সেটআপ।',
  },
  {
    id: 'holud',
    icon: 'cake',
    titleBn: 'গায়ে হলুদ ও জন্মদিন',
    subtitleBn: 'থিম বেসড কাস্টম ডেকোরেশন',
    priceStartBn: '৳ ৭,০০০ থেকে শুরু',
    detailsBn: 'ঐতিহ্যবাহী দেশীয় মোটিফ, হলুদ ডালা-কুলা সাজসজ্জা এবং কিডস বার্থডে কার্টুন থিম ডেকোর।',
  },
  {
    id: 'catering',
    icon: 'utensils',
    titleBn: 'রয়েল ক্যাটারিং সার্ভিস',
    subtitleBn: 'অভিজ্ঞ শেফ ও ভিআইপি ওয়েটার',
    priceStartBn: '৳ ৩৫০/প্লেট থেকে শুরু',
    detailsBn: 'ঐতিহ্যবাহী কাচ্চি বিরিয়ানি, জাফরানি মোরগ পোলাও, রোস্ট, বোরহানি ও রাজকীয় ডেজার্ট আইটেম।',
  },
];

export interface WowComboPackage {
  id: string;
  nameBn: string;
  nameEn: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export const WOW_COMBO_PACKAGES: WowComboPackage[] = [
  {
    id: 'pkg-silver',
    nameBn: 'হলুদ / জন্মদিন স্পেশাল',
    nameEn: 'Silver Combo',
    price: 12000,
    features: [
      'গর্জিয়াস হলুদ/বার্থডে স্টেজ ডেকোরেশন (১৫×৮ ফিট)',
      '১ জন সিনিয়র ফটোগ্রাফার (আনলিমিটেড ছবি)',
      'স্ট্যান্ডার্ড ইভেন্ট অ্যাম্বিয়েন্ট লাইটিং',
      '৫০ কপি স্পেশাল কালার গ্রেডেড ছবি পেনড্রাইভে',
      'ডিজিটাল গুগল ড্রাইভ ক্লাউড ডেলিভারি',
    ],
  },
  {
    id: 'pkg-gold',
    nameBn: 'প্রিমিয়াম ওয়েডিং কম্বো',
    nameEn: 'Gold Wedding',
    price: 28000,
    badge: 'সবচেয়ে জনপ্রিয়',
    isPopular: true,
    features: [
      'প্রিমিয়াম ফ্লাওয়ার ওয়েডিং স্টেজ ও এন্ট্রি গেট',
      '১ জন ফটোগ্রাফার + ১ জন সিনেমাটোগ্রাফার',
      'সিনেম্যাটিক ওয়েডিং ট্রেলার ও ফুল HD ভিডিও',
      'ফুল ভেন্যু অ্যাম্বিয়েন্ট লাইটিং ও সাউন্ড সিস্টেম',
      '১০০ কপি স্পেশাল এডিটেড ছবি ও ড্রাইভ লিংক',
    ],
  },
  {
    id: 'pkg-royal',
    nameBn: 'রয়েল সিগনেচার ইভেন্ট',
    nameEn: 'Royal VIP',
    price: 55000,
    badge: 'রয়েল সিগনেচার',
    features: [
      'লাক্সারি থিম স্টেজ, ভিআইপি গেট ও ফটোবুথ',
      '২ ফটোগ্রাফার + ২ সিনেমাটোগ্রাফার + 4K ড্রোন শট',
      'প্রিমিয়াম লেদার ফটোবুক অ্যালবাম ও এলইডি প্রজেকশন',
      'কনসার্ট গ্রেড সাউন্ড ও মুভিং হেড লাইটিং',
      'ব্রাইডাল এন্ট্রিতে কোল্ড ফায়ার পাইরো ও ড্রাই আইস ফগ',
    ],
  },
];

export interface ClientGalleryItem {
  id: string;
  eventCode: string;
  titleBn: string;
  categoryBn: string;
  dateBn: string;
  photoCount: string;
  coverImage: string;
  driveFolderUrl?: string;
}

export const SAMPLE_CLIENT_GALLERIES: ClientGalleryItem[] = [
  {
    id: 'g1',
    eventCode: 'WES-2026-101',
    titleBn: 'রাকিব ও সুমাইয়া গ্র্যান্ড ওয়েডিং রিসেপশন',
    categoryBn: 'ওয়েডিং ফটোগ্রাফি ও সিনেমা',
    dateBn: '১৫ জানুয়ারি ২০২৬',
    photoCount: '৭৫০+ ছবি ও 4K ভিডিও',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g2',
    eventCode: 'WES-2026-102',
    titleBn: 'আফরিনের ঐতিহ্যবাহী হলুদ ও মেহেন্দি সন্ধ্যা',
    categoryBn: 'গায়ে হলুদ উৎসব',
    dateBn: '২৮ জানুয়ারি ২০২৬',
    photoCount: '৪৫০+ ছবি ও রিলস টিজার',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g3',
    eventCode: 'WES-2026-103',
    titleBn: 'সানজিদা ও তানভীরের প্রিমিয়াম এনগেজমেন্ট',
    categoryBn: 'এনগেজমেন্ট সিরিমনি',
    dateBn: '১০ ফেব্রুয়ারি ২০২৬',
    photoCount: '৩০০+ ক্যান্ডিড শট',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g4',
    eventCode: 'WES-2026-104',
    titleBn: 'নর্থ টেক কর্পোরেট অ্যানুয়াল কনফারেন্স',
    categoryBn: 'কর্পোরেট ইভেন্ট',
    dateBn: '২০ ফেব্রুয়ারি ২০২৬',
    photoCount: '৫০০+ ছবি ও কি-নোট ভিডিও',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
];

export interface StoredInvoice {
  id: string;
  invNo: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  description: string;
  total: number;
  paid: number;
  due: number;
  status: 'paid' | 'partial' | 'unpaid';
  createdAt: string;
}
