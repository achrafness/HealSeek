'use client'
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import LandingPageContent from "@/features/Home/LandingPageContent";
import { useLanguageStore } from "@/store/store";

export default function Home() {
  // Only use the language store, not the auth store
  const { language } = useLanguageStore(state => state);
  
  return (
    <div className="min-h-screen bg-[#F2F7FF] font-[family-name:var(--font-poppins)]">
      <Navbar />
      <LandingPageContent />
      <Footer />
    </div>
  );
}
