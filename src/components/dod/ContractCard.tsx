import React, { useState } from "react";

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
  award_text: string;
};

interface ContractCardProps {
  contract: Contract;
}

export default function ContractCard({ contract }: ContractCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-300 rounded-lg shadow-lg p-4 mb-4">
      {/* Amount and agency */}
      <p>
        <strong>Contract Date:</strong> {contract.contract_date}
      </p>
      <p className="mb-1">
        <strong>Amount:</strong>{" "}
        {contract.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p className="mb-4">
        <strong>Agency:</strong> {contract.contracting_agency.name}
      </p>

      {/* Contractors list */}
      <div>
        <strong>Contractors:</strong>
        <ul className="list-disc list-inside">
          {contract.contractors.map((c, i) => (
            <li key={c.id?.toString() ?? `contractor-${i}`}>
              <span className="font-medium">{c.name}</span>
              {c.location && (
                <span className="text-gray-600"> – {c.location}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p className="pt-4">
        <strong>Purpose:</strong>
      </p>
      <h2 className="text-lg mb-2">{contract.purpose}</h2>

      {/* Award text expander */}
      <div className="mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:underline"
        >
          {expanded ? "Hide Full Announcement" : "Show Full Announcement"}
        </button>

        {expanded && (
          <div className="mt-2 p-3 bg-slate-50 border rounded-md text-sm whitespace-pre-line">
            {contract.award_text}
          </div>
        )}
      </div>
    </div>
  );
}
