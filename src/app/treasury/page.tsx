
import Link from "next/link";

const rssLinks = [
  { label: "Debt to the Penny", href: "/treasury/usdebt" },
];

export default function DodHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-center text-xl tracking-widest text-gray-700 uppercase mb-8">
          US Department of the Treasury
        </h1>

        <div className="grid grid-cols-1 max-w-xl mx-auto sm:grid-cols-1 md:grid-cols-1 gap-4">
          {rssLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-blue-700 text-white font-semibold text-center py-6 rounded cursor-pointer hover:bg-blue-800 transition">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}