import Link from "next/link";

const rssLinks = [
  { label: "All Working Papers", href: "/frb/research-papers/all-working" },
  { label: "Finance and Economics Discussion Series", href: "/frb/research-papers/fin-econ-discussion" },
  { label: "International Finance Discussion Papers", href: "/frb/research-papers/ifd-papers" },
  { label: "FEDS Notes", href: "/frb/research-papers/feds-notes" },
];

export default function SpeechesHome() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto py-8 px-4 pt-24">
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-2">
          Board of Governors of the Federal Reserve System
        </h1>
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-10">
          Speeches & Testimony
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