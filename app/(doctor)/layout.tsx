'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from '@/layouts/MainLayout.module.css';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <div className={styles.mainContentWrapper}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
