'use client'
import { useState } from 'react'
import Image from 'next/image'
import { IoMdSettings } from "react-icons/io";
///import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import Link from 'next/link';
import Flag from 'react-world-flags';
import { FiMessageCircle } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/store";
import { useTranslations } from "next-intl";
import useLogout from '@/hooks/useLogout';
import CustomButton from '@/app/[locale]/components/CustomButton';
export default function PublicNavbar() {
    const [selected, setSelected] = useState<boolean>(false)
    const t = useTranslations('Navbar')
    const router = useRouter();
    const pathname = usePathname();
    const logout = useLogout()
    const flagMapping = {
        en: 'gb',
        fr: 'fr',
        ar: 'sa',
    };

    const { language, setLanguage } = useLanguageStore((state) => state) as { language: keyof typeof flagMapping, setLanguage: (lng: keyof typeof flagMapping) => void };
    const changeLanguage = (lng: string) => {
        setLanguage(lng as keyof typeof flagMapping);
        const currentPath = pathname;
        const newPath = currentPath.replace(/^\/(en|fr|ar)/, `/${lng}`);
        if (currentPath !== newPath) {
            router.push(newPath);
        } else {
            router.refresh();
        }
    };
    const signout = async () => {
        await logout()
        router.push(`/${language}`)
    }

    return (
        <div className='bg-white flex justify-around items-center h-20' style={{ backdropFilter: 'blur(27.056367874145508px)', boxShadow: '-4.51px 5.64px 31.57px 0px #1B1B1B29' }}>
            <div>
                <Image src='/primaryLogo.svg' width={100} height={100} alt='HealSeak' />

            </div>
            <div className='flex justify-around items-center w-1/3 max-md:w-fit'>

                <div>
                    <ul className='flex gap-10'>

                        <Link href={`/${language}/dashboard/patient`}><li className={`font-normal text-base opacity-80 ${selected ? 'text-[#3A8EF6]' : 'text-[#6C87AE]'} `}>History</li></Link>
                        <Link href={`/${language}/doctor`}><li className='font-normal text-base opacity-80 text-[#6C87AE]'>Doctors</li></Link>
                    </ul>
                </div>

                <div className='text-black flex  gap-2 mx-2'>
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
                    <div className='mx-4 flex items-center justify-center'>
                        <Link href={`/${language}/dashboard/patient/Settings`} className='text-2xl max-md:text-lg'>
                            <IoMdSettings />
                        </Link>
                        <CustomButton onClick={signout}>
                            Logout
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
