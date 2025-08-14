import Link from "next/link";

const rssLinks = [
  { label: "News Releases", href: "/dol/releases" },
  { label: "Economic Indicators", href: "/dol/indicators" },
];

export default function FRBHome() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-12">
          U.S. Department of Labor
        </h1>

        <div className="grid grid-cols-1 max-w-xl mx-auto sm:grid-cols-1 md:grid-cols-1 gap-4">
          {rssLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-[#355e93] text-white font-semibold text-center py-6 rounded cursor-pointer hover:bg-blue-800 transition">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}