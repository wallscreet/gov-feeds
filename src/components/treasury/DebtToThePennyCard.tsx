import React from "react";
import fs from "fs";
import path from "path";

export default async function DebtToThePennyCard() {
  const filePath = path.join(process.cwd(), "public/data/debt_data.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContents);

  const latest = json[0]; // Most recent entry

  // Currency formatter for USD
  const formatUSD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <section className="pr-14 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Treasury Debt to the Penny
      </h2>
      <p>
      <strong>As of:</strong> {latest.date}
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-700">
        <li className="flex justify-between">
          <strong>Debt Held by the Public:</strong>
          <span className="ml-4 text-right tabular-nums w-40">
            {formatUSD(latest.public_debt)}
          </span>
        </li>
        <li className="flex justify-between">
          <strong>Intragovernmental Holdings:</strong>
          <span className="ml-4 text-right tabular-nums w-40">
            {formatUSD(latest.intragovernmental)}
          </span>
        </li>
        <li className="flex justify-between">
          <strong>Total Public Debt Outstanding:</strong>
          <span className="ml-4 text-right tabular-nums w-40">
            {formatUSD(latest.total_debt)}
          </span>
        </li>
      </ul>

    </section>
  );
}



