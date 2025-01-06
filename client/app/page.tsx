import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPageContent from "./components/LandingPageContent";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="min-h-screen bg-[#F2F7FF] font-[family-name:var(--font-poppins)]">
      <Navbar />
      <LandingPageContent />
      <Footer />
    </div>
  );
}
