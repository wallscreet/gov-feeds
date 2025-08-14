import Link from "next/link";

const rssLinks = [
  { label: "All Speeches & Testimony", href: "/frb/speeches/all-speeches" },
  { label: "Chair Jerome H. Powell", href: "/frb/speeches/powell-j" },
  { label: "Vice Chair Philip N. Jefferson", href: "/frb/speeches/jefferson-p" },
  { label: "Vice Chair for Supervision Michelle W. Bowman", href: "/frb/speeches/bowman-m" },
  { label: "Governor Michael S. Barr", href: "/frb/speeches/barr-m" },
  { label: "Governor Lisa D. Cook", href: "/frb/speeches/cook-l" },
  { label: "Governor Adriana D. Kugler", href: "/frb/speeches/kugler-a" },
  { label: "Governor Christopher J. Waller", href: "/frb/speeches/waller-c" },
];

export default function SpeechesHome() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-2">
          Board of Governors of the Federal Reserve System
        </h1>
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-10">
          Speeches & Testimony
        </h1>

        <div className="grid grid-cols-1 max-w-xl mx-auto sm:grid-cols-1 md:grid-cols-1 gap-4">
          {rssLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-[#355e93] text-white font-semibold text-center py-4 rounded cursor-pointer hover:bg-blue-800 transition">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}