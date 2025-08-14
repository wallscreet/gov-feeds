import React from "react";
import fs from "fs";
import path from "path";

interface DebtRecord {
  date: string;
  public_debt: number;
  intragovernmental: number;
  total_debt: number;
}

export default async function DebtToThePennyCard() {
  const filePath = path.join(process.cwd(), "public/data/debt_data.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContents) as DebtRecord[];

  // Sort by date (newest first)
  const sorted = json.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Currency formatter for USD
  const formatUSD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="space-y-6">
      {sorted.map((record, index) => (
        <section
          key={index}
          className="pr-14 p-6 bg-white rounded-lg shadow-md border border-slate-200 shadow-xl"
        >
          <h2 className="text-xl font-bold mb-4 text-[#355e93]">
            U.S. Debt to the Penny As Of: <span className="text-blue-500">{record.date}</span>
          </h2>

          <ul className="list-disc list-inside space-y-1 text-[#355e93]">
            <li className="flex justify-between">
              <strong>Debt Held by the Public:</strong>
              <span className="ml-4 text-right tabular-nums w-40">
                {formatUSD(record.public_debt)}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Intragovernmental Holdings:</strong>
              <span className="ml-4 text-right tabular-nums w-40">
                {formatUSD(record.intragovernmental)}
              </span>
            </li>
            <li className="flex justify-between">
              <strong>Total Public Debt Outstanding:</strong>
              <span className="ml-4 text-right tabular-nums w-40">
                {formatUSD(record.total_debt)}
              </span>
            </li>
          </ul>
        </section>
      ))}
    </div>
  );
}


