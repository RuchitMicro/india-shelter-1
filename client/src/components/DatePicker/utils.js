import { getYear } from 'date-fns';

export function getYearRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    return start + index;
  });
}

export const years = getYearRange(1990, getYear(new Date()) + 1, 1);

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
