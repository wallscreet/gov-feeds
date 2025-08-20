import { NextResponse } from "next/server";

interface RawAffordabilityData {
  Year: number;
  "HOI PPI": number;
  "Est HOI Premium": number;
  CPI: number;
  "Scaled Premium": number;
  "Median Sales Price": number;
  "Median Family Income": number;
  "30yr Mtg Rate": number;
  "Avg Loan Amount": number;
  "Mtg PI Monthly": number;
  "Mtg PI Annual": number;
  "Mtg PII Annual": number;
  "Mtg PII Monthly": number;
  "Mtg Ratio": number;
}

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

export async function GET() {
  try {
    const res = await fetch(
      "https://gov-data-production.up.railway.app/home-affordability"
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch affordability data" },
        { status: res.status }
      );
    }

    const raw: RawAffordabilityData[] = await res.json();

    const data: AffordabilityData[] = raw.map((item) => ({
      year: item.Year,
      hoiPpi: item["HOI PPI"],
      estHoiPremium: item["Est HOI Premium"],
      cpi: item.CPI,
      scaledPremium: item["Scaled Premium"],
      medianHomePrice: item["Median Sales Price"],
      medianIncome: item["Median Family Income"],
      mortgageRate: item["30yr Mtg Rate"],
      avgLoanAmount: item["Avg Loan Amount"],
      monthlyPi: item["Mtg PI Monthly"],
      annualPi: item["Mtg PI Annual"],
      annualPii: item["Mtg PII Annual"],
      monthlyPii: item["Mtg PII Monthly"],
      mortgageRatio: item["Mtg Ratio"],
    }));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
