'use server';
import { cookies } from 'next/headers';

export const setCookieLanguage = (language: string) => {
  const cookieStore = cookies();
  cookieStore.set('language', language);
};

export const cookieLanguage = () => {
  const cookieStore = cookies();
  return cookieStore.get('language');
};