import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formattedDate(dateString: string) {
  const date = new Date(dateString);

  const months = [
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

  const month = months[date.getMonth()];

  let day: any = date.getDate();

  // Mengonversi tanggal ke bentuk ordinal (e.g., 1st, 2nd, 3rd, 4th)
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const relevantDigits = day < 30 ? day % 20 : day % 30;
  const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
  day += suffix;

  // Mendapatkan tahun
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
