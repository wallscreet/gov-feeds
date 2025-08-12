// app/contracts/ContractList.tsx
import React from "react";
import ContractCard from "@/components/dod/ContractCard";
import fs from "fs";
import path from "path";

export default function ContractList() {
  const filePath = path.join(
    process.cwd(),
    "public/data/dod_awards_json/dod_awards_master.json"
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileContents);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {json.map((contract: unknown, index: React.Key | null | undefined) => (
        <ContractCard key={index} contract={contract} />
      ))}
    </div>
  );
}


