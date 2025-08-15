import Link from "next/link";

const rssLinks = [
  { label: "Congressional Bills", href: "/congress/bills" },
  { label: "Congressional Bills - Enrolled", href: "/congress/bills-enrolled" },
  { label: "Congressional Documents", href: "/congress/congress-docs" },
  { label: "Congressional Hearings", href: "/congress/congress-hearings" },  
];

export default function Congress() {
  
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-24 px-4">
        <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-8 font-semibold">
          United States Congress
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
