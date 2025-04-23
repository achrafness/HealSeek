'use client'
import { FiSettings, FiPieChart } from "react-icons/fi";
import RequireAuth from "@/HOC/RequireAuth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavButton = ({ icon: Icon, text, path }) => {
  const { locale } = useRouter();
  return (
    <Link
      href={`/${locale}${path}`}
      className="flex items-center gap-3 px-8 py-4 rounded-full text-white text-lg font-medium transition-all duration-300 hover:scale-105"
      style={{
        background: "linear-gradient(96.14deg, #3A8EF6 -10.84%, #6F3AFA 196.74%)",
        boxShadow: "0px 8px 23px 0px #4184F73D",
      }}
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </Link>
  );
};

export default function AdminPage() {
  const t = useTranslations("adminPage");
  return (
    <div className="min-h-screen bg-[#F2F7FF]">
      <div className="container mx-auto py-12">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
          <h1 className="text-[#00BFA5] text-2xl font-medium mb-2">
            {t('adminPortal')}
          </h1>
          <h2 className="text-4xl font-bold mb-8">
            {t('welcome')}
          </h2>
          <p className="text-[#6C87AE] text-base mb-12">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NavButton icon={FiPieChart} text={t('dashboard')} path="/dashboard/admin/Dashboard" />
            <NavButton icon={FiSettings} text={t('settings')} path="/dashboard/admin/Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}