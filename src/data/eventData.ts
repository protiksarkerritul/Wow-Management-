export interface EventService {
  id: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  descriptionBn: string;
  startingPrice: number;
  image: string;
  badge: string;
  features: string[];
}

export const EVENT_SERVICES: EventService[] = [
  {
    id: 'wedding-reception',
    titleBn: 'বিয়ে ও রিসেপশন',
    titleEn: 'Wedding & Reception',
    subtitleBn: 'রাজকীয় সাজে জীবনের শ্রেষ্ঠ মুহূর্তের আয়োজন',
    descriptionBn: 'প্রিমিয়াম স্টেজ, এলিগ্যান্ট ফ্লোরাল আর্ট, ব্যাকড্রপ ও লাইটিং ডিজাইনের মাধ্যমে আপনার বিয়ে ও রিসেপশনকে আমরা করে তুলি রাজকীয় ও স্মরণীয়।',
    startingPrice: 65000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'সেরা আকর্ষণ',
    features: [
      'এক্সক্লুসিভ থিমেটিক ব্রাইডাল ও গ্রুম স্টেজ',
      'তাজা ও ইম্পোর্টেড ফুলের নিখুঁত কম্বিনেশন',
      'ভিআইপি ডাইনিং ও সোফা সিটিং অ্যারেঞ্জমেন্ট',
      'গ্র্যান্ড এন্ট্রি ওয়াকওয়ে ও রেড কার্পেট',
    ],
  },
  {
    id: 'holud-mehendi',
    titleBn: 'গায়ে হলুদ ও মেহেদি সন্ধ্যা',
    titleEn: 'Holud & Mehendi',
    subtitleBn: 'রঙিন ঐতিহ্য আর প্রাণবন্ত উৎসবের মিলনমেলা',
    descriptionBn: 'ঐতিহ্যবাহী কাঁচা গাঁদা ফুল, ড্র্যাপারি ও কালারফুল দেশীয় মোটিফে সাজানো গায়ে হলুদ ও মেহেদি সন্ধ্যার প্রাণবন্ত আবহ।',
    startingPrice: 35000,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    badge: 'জনপ্রিয় উৎসব',
    features: [
      'কালারফুল ড্র্যাপারি ও গাঁদা ফুলের ক্লাসিক সেটআপ',
      'ডালাভর্তি মিষ্টি ও হলুদ সামগ্রীর প্রেজেন্টেশন',
      'স্পেশাল ফটো বুথ ও মেহেদি কর্নার',
      'উচ্ছল নাচ-গানের জন্য অপটিমাইজড স্টেজ স্পেস',
    ],
  },
  {
    id: 'birthday-party',
    titleBn: 'জন্মদিন ও ঘরোয়া পার্টি',
    titleEn: 'Birthday & Family Party',
    subtitleBn: 'প্রিয়জনের হাসিমুখের জন্য সেরা সারপ্রাইজ ডেকোরেশন',
    descriptionBn: 'শিশুদের প্রিয় কার্টুন থিম থেকে শুরু করে বড়দের প্রিমিয়াম গোল্ডেন থিম বার্থডে ও অ্যানিভার্সারি পার্টির নিখুঁত আয়োজন।',
    startingPrice: 20000,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    badge: 'কাস্টম থিম',
    features: [
      'বেলুন আর্চ, নিয়ন সাইন ও এলইডি নাম্বার স্ট্যান্ড',
      'কাস্টম কেক টেবিল ও ব্যাকড্রপ ডিজাইন',
      'পার্টি মিউজিক, লাইটিং ও বেলুন বাবল স্প্রে',
      'বাচ্চাদের জন্য ম্যাজিক ও এন্টারটেইনমেন্ট সেটআপ',
    ],
  },
  {
    id: 'corporate-event',
    titleBn: 'কর্পোরেট ইভেন্ট ও সেমিনার',
    titleEn: 'Corporate Event & Seminar',
    subtitleBn: 'আন্তর্জাতিক মানের মার্জিত ও প্রফেশনাল আয়োজন',
    descriptionBn: 'এজিএম, প্রডাক্ট লঞ্চিং, কনফারেন্স এবং গালা নাইটের জন্য হাই-টেক সাউন্ড, ক্রিস্টাল ক্লিয়ার এলইডি ডিসপ্লে ও ভিআইপি প্রটোকল।',
    startingPrice: 85000,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    badge: 'প্রফেশনাল এক্সিলেন্স',
    features: [
      'হাই রেজোলিউশন P2.9/P3 এলইডি স্ক্রিন ও প্রজেকশন',
      'পোডিয়াম, ডায়াস ও ডিজিটাল অডিও মাইক্রোফোন সিস্টেম',
      'রেজিস্ট্রেশন বুথ, ব্যাজ ও সিটিং নেভিগেশন',
      'গালা ডিনার ও ব্রান্ডিং স্টলে নিখুঁত ফিনিশিং',
    ],
  },
  {
    id: 'photography-cinema',
    titleBn: 'প্রফেশনাল ফটোগ্রাফি ও সিনেমাটোগ্রাফি',
    titleEn: 'Photography & Cinematography',
    subtitleBn: 'মুহূর্তগুলো হারিয়ে যাবে না, বেঁচে থাকবে ফ্রেমে',
    descriptionBn: 'অভিজ্ঞ টপ-টিয়ার সিনেমাটোগ্রাফারদের ক্যামেরা লেন্সে আপনার প্রতিটি আনন্দঘন ও আবেগঘন মুহূর্তের সিনেমাটিক রূপ।',
    startingPrice: 30000,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    badge: '4K সিনেমাটিক',
    features: [
      'ফুল ফ্রেম সনি/ক্যানন সিনেমা ক্যামেরা ও প্রাইম লেন্স',
      'ড্রোন এরিয়াল শট ও জিম্বল স্মুথ স্টেবিলাইজেশন',
      'সিনেমাটিক হাইলাইটস টিজার ও ট্রেলার এডিটিং',
      'প্রিমিয়াম লেদার বাউন্ড লাক্সারি ফটো অ্যালবাম',
    ],
  },
  {
    id: 'stage-sound-lighting',
    titleBn: 'স্টেজ ডেকোরেশন, সাউন্ড ও লাইটিং',
    titleEn: 'Stage, Sound & Lighting',
    subtitleBn: 'আলো ও সুরের মায়াজালে জাদুকরী পরিবেশ সৃষ্টি',
    descriptionBn: 'শার্পি, মুভিং হেডস, ওয়ার্ম অ্যাম্বিয়েন্ট ও কনসার্ট লেভেল জেবিএল অডিও সেটআপে পুরো ভেন্যুর রূপ বদলে দেওয়া জাদুকরী আবহ।',
    startingPrice: 45000,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    badge: 'ম্যাজিকাল লাইটিং',
    features: [
      'স্মার্ট ডিএমএক্স প্রোগ্রামড লাইটিং ও ট্রাস স্ট্রাকচার',
      'প্রফেশনাল লাইন অ্যারে সাউন্ড ও স্টুডিও মনিটর',
      'ড্রাই আইস ফগ, কোল্ড পাইরো ও স্টেজ স্পার্কলার্স',
      'সাউন্ডপ্রুফ জেনারেটর ব্যাকআপ ও দক্ষ টেকনিশিয়ান',
    ],
  },
];

export interface ReadyPackage {
  id: string;
  nameBn: string;
  nameEn: string;
  tier: 'silver' | 'gold' | 'royal';
  priceBDT: number;
  badge?: string;
  popular?: boolean;
  idealForBn: string;
  guestCapacityBn: string;
  features: string[];
}

export const READY_PACKAGES: ReadyPackage[] = [
  {
    id: 'pkg-silver',
    nameBn: 'সিলভার প্যাকেজ',
    nameEn: 'Silver Package',
    tier: 'silver',
    priceBDT: 150000,
    badge: 'সাশ্রয়ী ও মার্জিত',
    idealForBn: 'ছোট পারিবারিক অনুষ্ঠান, এঙ্গেজমেন্ট বা ঘরোয়া মেহেন্দি',
    guestCapacityBn: '১০০ - ২০০ জন অতিথি',
    features: [
      'ক্লাসিক ফ্লোরাল স্টেজ (২০×১০ ফিট)',
      'স্ট্যান্ডার্ড এম্বিয়েন্স লাইটিং ও স্পটলাইট',
      '২ জন সিনিয়র ফটোগ্রাফার (আনলিমিটেড ছবি)',
      'ডিজিটাল ব্যাকগ্রাউন্ড সাউন্ড সিস্টেম',
      'বেসিক এন্ট্রি তোরণ ও সাইনবোর্ড',
      'সফট কপি এডিটেড ফটো পেনড্রাইভে ডেলিভারি',
    ],
  },
  {
    id: 'pkg-gold',
    nameBn: 'গোল্ড প্যাকেজ',
    nameEn: 'Gold Package',
    tier: 'gold',
    priceBDT: 350000,
    badge: 'সবচেয়ে জনপ্রিয়',
    popular: true,
    idealForBn: 'বিয়ে ও রিসেপশনের পূর্ণাঙ্গ প্রিমিয়াম আয়োজন',
    guestCapacityBn: '২৫০ - ৫০০ জন অতিথি',
    features: [
      'প্রিমিয়াম ডিজাইনার স্টেজ (৩০×১২ ফিট)',
      'শার্পি, মুভিং হেড ও থিমেটিক ওয়ার্ম লাইটিং',
      '২ জন ফটোগ্রাফার + ২ জন সিনেমাটোগ্রাফার',
      '৩-৫ মিনিটের সিনেমাটিক হাইলাইটস টিজার ও ফুল ভিডিও',
      '১টি এক্সক্লুসিভ লাক্সারি ফটো বুক অ্যালবাম',
      'গ্র্যান্ড এন্ট্রি প্যাসেজ ও ব্রাইডাল ওয়াকওয়ে ডেকোর',
      'ব্রাইডাল এন্ট্রিতে কোল্ড ফায়ার পাইরো ও ড্রাই আইস ফগ',
      'ইভেন্ট ডে কোঅর্ডিনেটর সাপোর্ট',
    ],
  },
  {
    id: 'pkg-royal',
    nameBn: 'রয়্যাল / ভিআইপি প্যাকেজ',
    nameEn: 'VIP / Royal Package',
    tier: 'royal',
    priceBDT: 750000,
    badge: 'রাজকীয় লাক্সারি',
    idealForBn: 'অভিজাত ও গ্র্যান্ড স্কেল আন্তর্জাতিক মানের ইভেন্ট',
    guestCapacityBn: '৫০০ - ১৫০০+ জন অতিথি',
    features: [
      'কাস্টম আর্কিটেকচারাল রয়্যাল স্টেজ (৪০×১৫ ফিট+)',
      'আমদানিকৃত অর্কিড ও এক্সোটিক ফুলের সম্পূর্ণ সাজসজ্জা',
      'হাই রেজোলিউশন P2.9 বিশাল LED ওয়াল ও লাইভ স্ট্রিমিং',
      '৪ জন টপ-ক্লাস ফটোগ্রাফার + ৩ জন সিনেমাটোগ্রাফার',
      '4K এরিয়াল ড্রোন কভারেজ ও ৩৬০ ডিগ্রি ভিডিও বুথ',
      '২টি লেদার প্রিমিয়াম ফটো অ্যালবাম + মেমেন্টো বক্স',
      'গ্র্যান্ড এন্ট্রি টানেল, ক্রিস্টাল ঝাড়বাতি ও ভিআইপি লাউঞ্জ',
      'ব্রাইডাল স্পেশাল স্পার্কলার্স, পাইরো ও ফগ শো',
      'ফুল ডেডিকেটেড ম্যানেজমেন্ট টিম ও প্রফেশনাল হোস্ট',
    ],
  },
];

export interface PortfolioItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'all' | 'wedding' | 'holud' | 'corporate' | 'lighting';
  categoryLabelBn: string;
  locationBn: string;
  image: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    titleBn: 'রায়ান ও সুমাইয়ার গ্র্যান্ড ওয়েডিং রিসেপশন',
    titleEn: 'Rayan & Sumaiya Grand Wedding Reception',
    category: 'wedding',
    categoryLabelBn: 'বিয়ে ও রিসেপশন',
    locationBn: 'সেনামালঞ্চ, ঢাকা',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    titleBn: 'ঐতিহ্যবাহী হলুদ মেলা ও মেহেন্দি সন্ধ্যা',
    titleEn: 'Traditional Holud Mela & Mehendi Night',
    category: 'holud',
    categoryLabelBn: 'গায়ে হলুদ',
    locationBn: 'গুলশান লেকভিউ ভেন্যু',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    titleBn: 'লাক্সারি ক্রিস্টাল অ্যান্ড ফ্লোরাল স্টেজ',
    titleEn: 'Luxury Crystal & Floral Stage Setup',
    category: 'wedding',
    categoryLabelBn: 'বিয়ে ও রিসেপশন',
    locationBn: 'র‌্যাডিসন ব্লু ওয়াটার গার্ডেন',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    titleBn: 'টপ করপোরেট অ্যানুয়াল কনফারেন্স ও গালা নাইট',
    titleEn: 'Top Corporate Annual Conference & Gala',
    category: 'corporate',
    categoryLabelBn: 'কর্পোরেট ইভেন্ট',
    locationBn: 'বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র (BICC)',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p5',
    titleBn: 'সিম্ফনি অব লাইটস ও কনসার্ট স্টেজ শো',
    titleEn: 'Symphony of Lights & Concert Stage',
    category: 'lighting',
    categoryLabelBn: 'সাউন্ড ও লাইটিং',
    locationBn: 'ইন্টারকন্টিনেন্টাল ঢাকা',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    titleBn: 'প্রাণবন্ত দেশীয় গাঁদা ও রিকশা পেইন্ট হলুদের স্টেজ',
    titleEn: 'Vibrant Deshi Floral & Rickshaw Art Holud',
    category: 'holud',
    categoryLabelBn: 'গায়ে হলুদ',
    locationBn: 'ধানমন্ডি পার্টি সেন্টার',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
  },
];

export interface ClientReview {
  id: string;
  nameBn: string;
  eventBn: string;
  dateBn: string;
  commentBn: string;
  stars: number;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'r1',
    nameBn: 'ইশতিয়াক আহমেদ ও সাদিয়া ইসলাম',
    eventBn: 'ওয়েডিং রিসেপশন (সেনামালঞ্চ)',
    dateBn: 'জানুয়ারি ২০২৬',
    commentBn: 'আমাদের বিয়ের স্টেজের ডিজাইন দেখে উপস্থিত সকল মেহমান মুগ্ধ হয়েছিলেন। সময়মতো সব প্রস্তুত ছিল এবং পুরো টিম খুবই বিনয়ী ও দায়িত্বশীল।',
    stars: 5,
  },
  {
    id: 'r2',
    nameBn: 'তানভীর হোসেন',
    eventBn: 'কর্পোরেট অ্যানুয়াল গালা (র‌্যাডিসন)',
    dateBn: 'ফেব্রুয়ারি ২০২৬',
    commentBn: 'সাউন্ড কোয়ালিটি ও এলইডি স্ক্রিনের ভিডিও ক্ল্যারিটি এক কথায় অসাধারণ ছিল। আমাদের ৫০০ জন ক্লায়েন্টের সামনে অত্যন্ত মার্জিতভাবে অনুষ্ঠান সম্পন্ন হয়েছে।',
    stars: 5,
  },
  {
    id: 'r3',
    nameBn: 'নাজমুন নাহার স্বর্ণা',
    eventBn: 'গায়ে হলুদ ও মেহেন্দি (গুলশান)',
    dateBn: 'মার্চ ২০২৬',
    commentBn: 'হলুদের ঐতিহ্যবাহী ডেকোরেশন ও ব্রাইডাল এন্ট্রি এফেক্ট পুরো স্বপ্নের মতো লেগেছে। ড্রোন এবং ফটোগ্রাফি ডেলিভারিও পেয়েছি চোখের পলকে। অনেক ধন্যবাদ!',
    stars: 5,
  },
];

export const FAQS = [
  {
    qBn: 'বুকিং কনফার্ম করতে কতদিন পূর্বে যোগাযোগ করা উচিত?',
    qEn: 'How early should we book an event?',
    aBn: 'জনপ্রিয় ওয়েডিং সিজনে (বিশেষত নভেম্বর থেকে ফেব্রুয়ারি) ভেন্যু ও কাঙ্ক্ষিত তারিখ নিশ্চিতের জন্য অন্তত ১ থেকে ৩ মাস পূর্বে বুকিং করা উত্তম। তবে জরুরি প্রয়োজনে সংক্ষিপ্ত সময়েও আমরা কাস্টম টিম ম্যানেজ করতে পারি।',
  },
  {
    qBn: 'বুকিং মানি বা অগ্রিম পেমেন্টের নিয়ম কী?',
    qEn: 'What is the advance payment policy?',
    aBn: 'বুকিং চূড়ান্তকরণের সময় সাধারণত ২৫% থেকে ৩০% অগ্রিম গ্রহণ করা হয়, ইভেন্টের ৩ দিন আগে ৫০% এবং ইভেন্ট সম্পন্ন হওয়ার দিন বাকি অংশ পরিশোধযোগ্য।',
  },
  {
    qBn: 'আমি কি নিজের পছন্দমতো থিম বা স্টেজ ডিজাইন কাস্টমাইজ করতে পারব?',
    qEn: 'Can I customize the theme or stage design?',
    aBn: 'হ্যাঁ, অবশ্যই! আমাদের নিজস্ব ৩D ডিজাইনার টিম রয়েছে। আপনি পিন্টারেস্ট বা ইনস্টাগ্রামের কোনো রেফারেন্স দিলে আমরা হুবহু বা তার চেয়েও আকর্ষণীয় করে আপনার ভেন্যুর মাপে সাজিয়ে দেব।',
  },
  {
    qBn: 'ঢাকার বাইরে কি আপনারা ইভেন্ট সার্ভিস প্রদান করেন?',
    qEn: 'Do you provide services outside Dhaka?',
    aBn: 'হ্যাঁ, চট্টগ্রাম, সিলেট, কক্সবাজার, রাজশাহী সহ পুরো বাংলাদেশের যেকোনো জেলায় আমাদের টিম ইকুইপমেন্ট ও ম্যানপাওয়ার নিয়ে কাজ করতে সক্ষম (যাতায়াত ও লজিস্টিক ফি প্রযোজ্য)।',
  },
];
