import {it, expect, describe} from 'vitest';
import {formatMoney} from './money.js';

describe('formatMoney', () => {
it('formats money correctly', () => {
  expect(formatMoney(12345)).toBe('$123.45');
  console.log(formatMoney(12345)); // Expected output: $123.45
});

it('displays 2 decimals', () => {
  expect(formatMoney(1090)).toBe('$10.90');
  console.log(formatMoney(1090)); // Expected output: $0.00
  console.log(formatMoney(100)); // Expected output: $10.00
});
});
