'use client'
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/app/[locale]/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/store";
import { useTranslations } from "next-intl";
import Flag from 'react-world-flags';

export default function Navbar() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
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
    <div className="bg-[#F2F7FF] flex justify-around items-center h-20">
      {/* Logo Section */}
      <div>
        <Image
          src="/primaryLogo.svg"
          width={100}
          height={100}
          alt="HealSeak"
          className="object-contain"
        />
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex gap-10">
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
            <div className='flex w-fit justify-between border-l-2 ml-9 border-r-2 pl-2 pr-16 max-md:pr-4'>
              <div className='flex items-center'>
                <Flag code={flagMapping[language]} className='opacity-100 h-4 w-6 mx-1 max-md:h-3 max-md:w-2' />
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className='opacity-50 max-md:text-xs  border-none outline-none'
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

      {/* Book Now Button */}
      <div>
        <Link href={`/${language}/auth/login`}>
          <CustomButton className="rounded-[100px] h-10 px-5 py-2 flex items-center gap-2 bg-[#3A8EF6] text-white hover:bg-[#2C6DBF] transition-colors duration-200">
            <FiMessageCircle className="text-lg" />
            <span>{t("login")}</span>
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}