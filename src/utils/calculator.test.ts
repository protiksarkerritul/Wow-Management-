import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWowBudget,
  calculateInvoiceDue,
  formatBDT,
  generateVoucherId,
  buildWhatsAppBookingMessage,
  DEFAULT_BUSINESS_CONFIG,
} from './calculator';

test('calculateWowBudget: computes items, total, and 30% advance', () => {
  const result = calculateWowBudget({
    eventType: 'বিয়ে ও রিসেপশন',
    photoPrice: 14000,
    photoName: 'ফটোগ্রাফি + সিনেমাটোগ্রাফি কম্বো',
    stagePrice: 18000,
    stageName: 'প্রিমিয়াম ফ্লাওয়ার স্টেজ + এন্ট্রি গেট',
    addons: [
      { name: 'প্রফেশনাল সাউন্ড সিস্টেম', price: 4000, selected: true },
      { name: 'ভেন্যু অ্যাম্বিয়েন্ট লাইটিং', price: 5000, selected: false },
    ],
    guestCount: 200,
    plateRate: 500,
  });

  // Photo (14000) + Stage (18000) + Addon (4000) + Catering (200 * 500 = 100000) = 136000
  assert.equal(result.total, 136000);
  assert.equal(result.advance, Math.round(136000 * 0.3)); // 40800
  assert.equal(result.cateringTotal, 100000);
  assert.equal(result.items.length, 4);
});

test('calculateInvoiceDue: handles paid, partial and unpaid correctly', () => {
  const unpaid = calculateInvoiceDue(50000, 0);
  assert.equal(unpaid.due, 50000);
  assert.equal(unpaid.status, 'unpaid');

  const partial = calculateInvoiceDue(50000, 20000);
  assert.equal(partial.due, 30000);
  assert.equal(partial.status, 'partial');

  const full = calculateInvoiceDue(50000, 50000);
  assert.equal(full.due, 0);
  assert.equal(full.status, 'paid');
});

test('formatBDT: returns Indian comma formatted number', () => {
  assert.equal(formatBDT(123456), '1,23,456');
});

test('generateVoucherId: format prefix-year-XXXX', () => {
  const id = generateVoucherId('WES');
  const year = new Date().getFullYear();
  assert.match(id, new RegExp(`^WES-${year}-\\d{4}$`));
});

test('buildWhatsAppBookingMessage: properly formats and encodes', () => {
  const encoded = buildWhatsAppBookingMessage({
    clientName: 'তানভীর আহমেদ',
    phone: '01712345678',
    eventType: 'বিয়ে ও রিসেপশন',
    date: '2026-11-20',
    venue: 'কমিউনিটি সেন্টার',
    items: [{ name: 'গোল্ড কম্বো', price: 28000 }],
    total: 28000,
    advance: 8400,
  });

  const decoded = decodeURIComponent(encoded);
  assert.ok(decoded.includes('Wow Event Solution'));
  assert.ok(decoded.includes('তানভীর আহমেদ'));
  assert.ok(decoded.includes('01712345678'));
  assert.ok(decoded.includes('28,000'));
});
