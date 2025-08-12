// // components/dod/ContractCard.tsx
// import React from "react";

// export default function ContractCard({ contract }) {
//   return (
//     <div className="border rounded-lg shadow-sm p-4 mb-4">
//       <h2 className="text-lg font-bold">{contract.contractors.name}</h2>
//       <p><strong>Contractor: {contract.contractors.name}</strong></p>
//       <p><strong>Award Date:</strong> {contract.contract_date}</p>
//       <p><strong>Purpose:</strong> {contract.purpose}</p>
//       <p><strong>Amount:</strong> ${contract.amount}</p>
//       <p><strong>Agency:</strong> {contract.contracting_agency.name}</p>
//     </div>
//   );
// }

// components/dod/ContractCard.tsx
import React from "react";

export default function ContractCard({ contract }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 mb-4">

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
          {contract.contractors.map((c) => (
            <li key={c.id}>
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

