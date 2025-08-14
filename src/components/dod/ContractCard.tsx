import React from "react";

type Contractor = {
  id: string | number;
  name: string;
  location?: string;
};

type Contract = {
  contract_date: string;
  amount: number;
  purpose: string;
  contracting_agency: {
    name: string;
  };
  contractors: Contractor[];
};

interface ContractCardProps {
  contract: Contract;
}

export default function ContractCard({ contract }: ContractCardProps) {
  return (
    <div className="border border-slate-300 rounded-lg shadow-lg p-4 mb-4">

      {/* Amount and agency */}
      <p><strong>Contract Date:</strong> {contract.contract_date}</p>
      <p className="mb-1">
        <strong>Amount:</strong>{"       "}
        {contract.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>
      <p className="mb-4"><strong>Agency:</strong> {contract.contracting_agency.name}</p>
    
      {/* Contractors list */}
      <div>
        <strong>Contractors:</strong>
        <ul className="list-disc list-inside">
          {contract.contractors.map((c, i) => (
            <li key={c.id?.toString() ?? `contractor-${i}`}>
              <span className="font-medium">{c.name}</span>
              {c.location && <span className="text-gray-600"> – {c.location}</span>}
            </li>
          ))}
        </ul>

      </div>
      <p className="pt-4"><strong>Purpose:</strong></p>
      <h2 className="text-lg mb-2">{contract.purpose}</h2>
    </div>
  );
}

