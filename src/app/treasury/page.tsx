
import Link from "next/link";

const rssLinks = [
  { label: "Debt to the Penny", href: "/treasury/usdebt" },
];

export default function DodHome() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-12 px-4">
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mt-12 mb-8 font-semibold">
          US Department of the Treasury
        </h1>

        <div className="grid grid-cols-1 max-w-xl mx-auto sm:grid-cols-1 md:grid-cols-1 gap-4">
          {rssLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-[#355e93] text-white font-semibold text-center py-6 rounded-xl cursor-pointer hover:bg-slate-800 transition">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}