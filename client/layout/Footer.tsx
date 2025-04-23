import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FiYoutube } from "react-icons/fi";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { useLanguageStore } from "@/store/store";

export default function Footer() {
    const t = useTranslations("Footer");
    const { language } = useLanguageStore((state) => state);

    return (
        <div className='bg-[#1678F2] w-full h-fit relative text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='py-10 flex flex-col md:flex-row md:justify-between gap-10'>
                    {/* Logo, address and social media section */}
                    <div className='flex flex-col gap-6 md:gap-8 max-w-xs'>
                        <div>
                            <Link href={`/${language}/`}>
                                <Image src={'/secondaryLogo.svg'} height={100} width={140} alt='HealSeek Logo' className='h-auto' />
                            </Link>
                        </div>
                        <div className='text-sm md:text-base italic font-light'>
                            {t("address1")}
                            <br />
                            {t("address2")}
                        </div>
                        <div className='flex gap-6 md:gap-8 items-center'>
                            <Link href='https://www.youtube.com/' aria-label="YouTube" className='hover:opacity-80 transition-opacity'>
                                <FiYoutube className='text-2xl md:text-3xl' />
                            </Link>
                            <Link href='https://www.facebook.com/' aria-label="Facebook" className='hover:opacity-80 transition-opacity'>
                                <LiaFacebookSquare className='text-2xl md:text-3xl' />
                            </Link>
                            <Link href='https://www.whatsapp.com/' aria-label="WhatsApp" className='hover:opacity-80 transition-opacity'>
                                <FaWhatsapp className='text-2xl md:text-3xl' />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation links section */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-sm md:text-base font-light'>
                        {/* Company Info Links */}
                        <ul className='space-y-2'>
                            <li className='text-base md:text-xl font-semibold mb-3'>
                                {t("companyInfo")}
                            </li>
                            <li className='hover:underline'>
                                <Link href={`/${language}/about`}>{t("about")}</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href={`/${language}/services`}>{t("services")}</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href={`/${language}/blog`}>{t("blog")}</Link>
                            </li>
                        </ul>

                        {/* Book Now Links */}
                        <ul className='space-y-2'>
                            <li className='text-base md:text-xl font-semibold mb-3'>
                                {t("bookNow")}
                            </li>
                            <li className='hover:underline'>
                                <Link href={`/${language}/doctor`}>{t("appointment")}</Link>
                            </li>
                        </ul>

                        {/* Contact Links */}
                        <ul className='space-y-2'>
                            <li className='text-base md:text-xl font-semibold mb-3'>
                                {t("contact")}
                            </li>
                            <li>
                                {t("phone")}
                            </li>
                            <li>
                                {t("email")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright section */}
            <div className='border-t border-white/20'>
                <div className='max-w-7xl mx-auto px-4 py-4'>
                    <p className='text-white text-center text-sm'>
                        {t("rightsReserved")}
                    </p>
                </div>
            </div>
        </div>
    );
}