import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import LandingPageContent from "../features/Home/LandingPageContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F7FF] font-[family-name:var(--font-poppins)]">
      <Navbar />
      <LandingPageContent />
      <Footer />
    </div>
  );
}
