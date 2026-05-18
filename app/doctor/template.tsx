'use client';
import PageTransition from '@/components/PageTransition';
export default function DoctorTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
