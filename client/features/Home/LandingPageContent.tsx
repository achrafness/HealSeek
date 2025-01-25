// Remove the import statement for HeroSection
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { BookingSection } from "./BookingSection";
import { TestimonialsSection } from "./TestimonialsSection";
export default function LandingPageContent() {
  return (
    <div className="bg-[#F2F7FF]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BookingSection />
      <TestimonialsSection />
    </div>
  );
}
