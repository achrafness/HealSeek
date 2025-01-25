"use client"
import Image from "next/image";
import Link from "next/link";
import { IoCalendar } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import { HiMiniChartPie } from "react-icons/hi2";
import { FiSearch, FiBell } from "react-icons/fi";
import { Sidebar } from "../Dashboard/page";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const DoctorNavbar = () => {
  const t = useTranslations("adminSettingsPage");
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="relative w-96">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-4 py-2 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiBell className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="/user.svg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">Dr. Issam</span>
        </div>
      </div>
    </header>
  );
};

const SettingsContent = () => {
  const t = useTranslations("adminSettingsPage");
  return (
    <div className="p-6 grid lg:grid-cols-[320px,1fr] gap-6">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
          <div className="mb-4 flex justify-center">
            <Image
              src="/user.svg"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h2 className="text-primary font-semibold text-xl">John Doe</h2>
          <p className="text-gray-500">Johndoe@gmail.com</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-xl mb-4">{t('information')}</h3>
          <dl className="space-y-3">
            {[
              { label: t('name'), value: "John Doe" },
              { label: t('email'), value: "user@gmail.com" },
              { label: t('tel'), value: "0777777777" },
              { label: t('plan'), value: t('free') },
            ].map((item, index) => (
              <div key={index}>
                <dt className="font-medium text-gray-600">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-8">{t('userSettings')}</h2>

        <form className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">{t('personalDetails')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('firstName')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder={t('lastName')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                placeholder={t('email')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="tel"
                placeholder={t('phoneNumber')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors">
              {t('saveChanges')}
            </button>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">{t('changePassword')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder={t('currentPassword')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="password"
                placeholder={t('confirmCurrentPassword')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="password"
                placeholder={t('newPassword')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="password"
                placeholder={t('confirmNewPassword')}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                {t('updatePassword')}
              </button>
              <Link
                href="/forgot-password"
                className="text-gray-500 hover:text-primary"
              >
                {t('forgotPassword')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AdminSettingsPage() {
  const { locale } = useRouter();
  return (
    <div className="flex min-h-screen bg-[#F2F7FF]">
      <Sidebar />
      <main className="flex-1">
        <DoctorNavbar />
        <SettingsContent />
      </main>
    </div>
  );
}