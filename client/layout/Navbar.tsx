'use client'
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/app/[locale]/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/store";
import { useTranslations } from "next-intl";
import Flag from 'react-world-flags';
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const flagMapping = {
    en: 'gb',
    fr: 'fr',
    ar: 'sa',
  };

  const { language, setLanguage } = useLanguageStore((state) => state) as { language: keyof typeof flagMapping, setLanguage: (lng: keyof typeof flagMapping) => void };
  const changeLanguage = (lng: string) => {
    setLanguage(lng as keyof typeof flagMapping);
    const currentPath = pathname;
    const newPath = currentPath.replace(/^\/(argo|en|fr|ar)/, `/${lng}`);
    if (currentPath !== newPath) {
      router.push(newPath);
    } else {
      router.refresh();
    }
  };

  return (
    <div className={`bg-[#F2F7FF] w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href={`/${language}/`}>
              <Image
                src="/primaryLogo.svg"
                width={100}
                height={100}
                alt="HealSeak"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex">
            <ul className="flex gap-6 lg:gap-10">
              <li>
                <Link
                  href={`/${language}/`}
                  className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/doctor`}
                  className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
                >
                  {t("doctors")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/contact`}
                  className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <div className='flex w-fit justify-between border-l-2 ml-4 lg:ml-9 border-r-2 pl-2 pr-8 lg:pr-16'>
                  <div className='flex items-center'>
                    <Flag code={flagMapping[language]} className='opacity-100 h-4 w-6 mx-1' />
                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className='opacity-50 border-none outline-none bg-transparent'
                    >
                      <option value="en">{t("english")}</option>
                      <option value="fr">{t("french")}</option>
                      <option value="ar">{t("arabic")}</option>
                    </select>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Book Now Button - Desktop */}
          <div className="hidden md:block">
            <Link href={`/${language}/auth/login`}>
              <CustomButton className="rounded-[100px] h-10 px-5 py-2 flex items-center gap-2 bg-[#3A8EF6] text-white hover:bg-[#2C6DBF] transition-colors duration-200">
                <FiMessageCircle className="text-lg" />
                <span>{t("login")}</span>
              </CustomButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3A8EF6] p-2 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={`/${language}/`}
              className="block px-3 py-2 text-base font-medium text-[#6C87AE] hover:text-[#3A8EF6]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href={`/${language}/doctor`}
              className="block px-3 py-2 text-base font-medium text-[#6C87AE] hover:text-[#3A8EF6]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("doctors")}
            </Link>
            <Link
              href={`/${language}/contact`}
              className="block px-3 py-2 text-base font-medium text-[#6C87AE] hover:text-[#3A8EF6]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
            
            <div className="px-3 py-2 border-t border-gray-200 mt-4">
              <div className="flex items-center mb-3">
                <Flag code={flagMapping[language]} className="h-4 w-6 mx-1" />
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="opacity-50 border-none outline-none bg-transparent"
                >
                  <option value="en">{t("english")}</option>
                  <option value="fr">{t("french")}</option>
                  <option value="ar">{t("arabic")}</option>
                </select>
              </div>
              
              <Link href={`/${language}/auth/login`} onClick={() => setIsMenuOpen(false)}>
                <CustomButton className="w-full rounded-[100px] h-10 px-5 py-2 flex items-center justify-center gap-2 bg-[#3A8EF6] text-white">
                  <FiMessageCircle className="text-lg" />
                  <span>{t("login")}</span>
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}