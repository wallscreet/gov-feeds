"use client";

import React, { useState, useEffect } from "react";

interface AffordabilityData {
  year: number;
  hoiPpi: number;
  estHoiPremium: number;
  cpi: number;
  scaledPremium: number;
  medianHomePrice: number;
  medianIncome: number;
  mortgageRate: number;
  avgLoanAmount: number;
  monthlyPi: number;
  annualPi: number;
  annualPii: number;
  monthlyPii: number;
  mortgageRatio: number;
}

export default function HomeAffordabilityCard() {
  const [year, setYear] = useState<number>(2023);
  const [allData, setAllData] = useState<AffordabilityData[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch once
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/home-affordability");
        const json = await res.json();
        setAllData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // filter
  const data = allData.find((d) => d.year === year);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Year Selector */}
      <div className="flex gap-2">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded p-2 w-28"
        />
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => setYear((prev) => prev - 1)}
        >
          ◀ Prev
        </button>
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => setYear((prev) => prev + 1)}
        >
          Next ▶
        </button>
      </div>

      {/* Data Card */}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            Home Affordability in {data.year}
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Median Home Price:</strong> $
              {data.medianHomePrice.toLocaleString()}
            </li>
            <li>
              <strong>Median Income:</strong> $
              {data.medianIncome.toLocaleString()}
            </li>
            <li>
              <strong>Mortgage Rate:</strong> {data.mortgageRate.toFixed(2)}%
            </li>
            <li>
              <strong>Monthly PI Payment:</strong> $
              {data.monthlyPi.toLocaleString()}
            </li>
            <li>
              <strong>Monthly PII Payment:</strong> $
              {data.monthlyPii.toLocaleString()}
            </li>
            <li>
              <strong>Mortgage Ratio:</strong>{" "}
              {(data.mortgageRatio * 100).toFixed(1)}%
            </li>
            <li>
              <strong>Monthly HOI Premium:</strong> $
              {(data.estHoiPremium / 12).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
