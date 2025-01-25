import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FiYoutube } from "react-icons/fi";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <div className='bg-[#1678F2] w-full h-fit relative top-full text-white'>
            <div className='flex justify-around items-center py-10'>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Image src={'secondaryLogo.svg'} height={100} width={140} alt='healseek' />
                    </div>
                    <div className='max-w-80 text-wrap text-base italic font-light'>
                        {t("address1")}
                        <br />
                        {t("address2")}
                    </div>
                    <div className='flex gap-10 items-center'>
                        <Link href='https://www.youtube.com/'>
                            <FiYoutube className='text-3xl' />
                        </Link>
                        <Link href='https://www.youtube.com/'>
                            <LiaFacebookSquare className='text-3xl' />
                        </Link>
                        <Link href='https://www.youtube.com/'>
                            <FaWhatsapp className='text-3xl' />
                        </Link>
                    </div>
                </div>
                <div className='flex gap-10 text-base font-light'>
                    <ul>
                        <li className='text-xl font-semibold'>
                            {t("companyInfo")}
                        </li>
                        <li>
                            {t("about")}
                        </li>
                        <li>
                            {t("services")}
                        </li>
                        <li>
                            {t("blog")}
                        </li>
                    </ul>
                    <ul>
                        <li className='text-xl font-semibold'>
                            {t("bookNow")}
                        </li>
                        <li>
                            {t("appointment")}
                        </li>
                    </ul>
                    <ul>
                        <li className='text-xl font-semibold'>
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
            <div className='text-white text-center py-4'>
                {t("rightsReserved")}
            </div>
        </div>
    );
}