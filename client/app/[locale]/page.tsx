'use client'
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import LandingPageContent from "@/features/Home/LandingPageContent";
import { useAuthStore, useLanguageStore } from "@/store/store";

export default function Home() {
  // We still access auth store to check login status, but we don't redirect
  const { accessToken, role } = useAuthStore(state => state);
  const { language } = useLanguageStore(state => state);
  
  // No redirection logic - allow all users to access home page

  return (
    <div className="min-h-screen bg-[#F2F7FF] font-[family-name:var(--font-poppins)]">
      <Navbar />
      <LandingPageContent />
      <Footer />
    </div>
  );
}
