"use client"
import Image from "next/image";
import Link from "next/link";
import { IoCalendar } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import { HiMiniChartPie } from "react-icons/hi2";
import { FiSearch, FiBell } from "react-icons/fi";

const Sidebar = () => (
  <aside className="w-80 bg-[#F2F2F0] min-h-screen h-fit max-lg:hidden p-6">
    <div className="bg-primary p-4 rounded-xl text-white flex gap-4 mb-8">
      <Image
        src="/doctorDashboard.svg"
        width={80}
        height={80}
        alt="doctor"
        className="rounded-lg"
      />
      <div>
        <h2 className="font-bold text-2xl">Dr. Issam</h2>
        <p className="text-gray-100">JohnDie@gmail.com</p>
        <p className="text-gray-100">Public Health Doctor</p>
      </div>
    </div>

    <nav className="space-y-2 mb-8">
      {[
        { icon: <BiSolidCategoryAlt />, text: "Overview", active: false },
        { icon: <IoCalendar />, text: "Calendar", active: false },
        { icon: <HiMiniChartPie />, text: "Appointments", active: false },
        { icon: <MdOutlineShowChart />, text: "Patients", active: false },
      ].map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-lg transition-colors ${
            item.active ? "bg-primary text-white" : "hover:bg-primary/10"
          }`}
        >
          {item.icon}
          <span>{item.text}</span>
        </button>
      ))}
    </nav>

    <button className="w-full border-2 border-primary text-primary font-medium rounded-xl px-6 py-2 hover:bg-primary hover:text-white transition-colors">
      Logout
    </button>
  </aside>
);

const DoctorNavbar = () => (
  <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search..."
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

const SettingsContent = () => (
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
        <h3 className="font-semibold text-xl mb-4">Information</h3>
        <dl className="space-y-3">
          {[
            { label: "Name", value: "John Doe" },
            { label: "Email", value: "user@gmail.com" },
            { label: "Tel", value: "0777777777" },
            { label: "Plan", value: "Free" },
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
      <h2 className="text-2xl font-semibold mb-8">User Settings</h2>

      <form className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="Confirm Current Password"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors">
              Update Password
            </button>
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default function AdminSettingsPage() {
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
