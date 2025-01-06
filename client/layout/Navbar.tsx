import Link from "next/link";
import Image from "next/image";
import CustomButton from "../app/components/CustomButton";
import { FiMessageCircle } from "react-icons/fi";

export default function NavbarServer() {
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
              href="/"
              className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="font-normal text-base opacity-80 text-[#6C87AE] hover:text-[#3A8EF6] transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Book Now Button */}
      <div>
        <Link href="/auth/login">
          {" "}
          <CustomButton className="rounded-[100px] h-10 px-5 py-2 flex items-center gap-2 bg-[#3A8EF6] text-white hover:bg-[#2C6DBF] transition-colors duration-200">
            <FiMessageCircle className="text-lg" />
            <span>Book Now</span>
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
