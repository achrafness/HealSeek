'use client'
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import LandingPageContent from "@/features/Home/LandingPageContent";
import { useAuthStore, useLanguageStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { accessToken, role } = useAuthStore(state => state);
  const { language } = useLanguageStore(state => state);
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect them based on their role
    if (accessToken) {
      if (role === 'admin') {
        router.push(`/${language}/dashboard/admin`);
      } else if (role === 'doctor') {
        router.push(`/${language}/dashboard/doctor`);
      } else if (role === 'patient') {
        router.push(`/${language}/doctor`);
      }
    }
  }, [accessToken, role, language, router]);

  return (
    <div className="min-h-screen bg-[#F2F7FF] font-[family-name:var(--font-poppins)]">
      <Navbar />
      <LandingPageContent />
      <Footer />
    </div>
  );
}
