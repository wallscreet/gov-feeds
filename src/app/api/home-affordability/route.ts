import { NextResponse } from "next/server";

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

    const raw = await res.json();

    const data = raw.map((item: any) => ({
      year: item["Year"],
      hoiPpi: item["HOI PPI"],
      estHoiPremium: item["Est HOI Premium"],
      cpi: item["CPI"],
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
