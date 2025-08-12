import React from "react";
import ContractCard from "@/components/dod/ContractCard";
import fs from "fs";
import path from "path";


interface Contract {
  contractors: { name: string; id: string; location: string }[];
  purpose: string;
  amount: number;
  contract_date: string;
  contracting_agency: { name: string };
}


export default function ContractList() {
  const filePath = path.join(
    process.cwd(),
    "public/data/dod_awards_json/dod_awards_master.json"
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContents) as Contract[];

  const sortedContracts = json.sort((a, b) => {
    return new Date(b.contract_date).getTime() - new Date(a.contract_date).getTime();
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      {sortedContracts.map((contract, index) => (
        <ContractCard key={index} contract={contract} />
      ))}
    </div>
  );
}

