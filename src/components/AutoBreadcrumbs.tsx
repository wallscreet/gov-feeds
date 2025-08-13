"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AutoBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const label = decodeURIComponent(segment.replace(/-/g, " "));

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {idx === segments.length - 1 ? (
                <span>{label}</span>
              ) : (
                <Link href={href} className="hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
