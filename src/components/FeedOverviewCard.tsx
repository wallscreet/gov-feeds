// import React from "react";
// import Link from "next/link";

// export default function FeedOverview() {
//   return (
//     <section className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-4xl">
//       <h2 className="text-3xl font-bold mb-4 text-slate-600">Our Data Sources</h2>
//       <ul className="list-disc list-inside space-y-2 text-gray-700">
//         <li>
//             <Link href="/frb" className="hover:text-blue-600 transition-colors">
//               Federal Reserve Board
//             </Link>
//         </li>
//         <li>
//             <Link href="/treasury" className="hover:text-blue-600 transition-colors">
//               Treasury Direct
//             </Link>
//         </li>
//         <li>
//             <Link href="/dod" className="hover:text-blue-600 transition-colors">
//               Department of Defense
//             </Link>
//         </li>
//         <li>
//             <Link href="/dod" className="hover:text-blue-600 transition-colors">
//               US Congress
//             </Link>
//         </li>
//       </ul>
//     </section>
//   );
// }

import Link from 'next/link';

export default function FeedOverview() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-4 text-slate-600">Our Data Sources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <Link href="/congress" className="hover:text-blue-600 transition-colors">
              US Congress
            </Link>
          </li>
          <li>
            <Link href="/frb" className="hover:text-blue-600 transition-colors">
              Federal Reserve Board
            </Link>
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <Link href="/dod" className="hover:text-blue-600 transition-colors">
              Department of Defense
            </Link>
          </li>
          <li>
            <Link href="/treasury" className="hover:text-blue-600 transition-colors">
              Treasury Direct
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}