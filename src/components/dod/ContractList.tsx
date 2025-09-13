// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import ContractCard from "@/components/dod/ContractCard";
// import Fuse from "fuse.js";

// interface Contract {
//   contractors: { name: string; id: string; location: string }[];
//   purpose: string;
//   amount: number;
//   contract_date: string;
//   contracting_agency: { name: string };
//   award_text: string;
// }

// export default function ContractList() {
//   const [contracts, setContracts] = useState<Contract[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/data/dod_awards_json/dod_awards_master.json");
//         const data = await res.json();
//         setContracts(data);
//       } catch (err) {
//         console.error("Error loading contracts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const sortedContracts = useMemo(() => {
//     return [...contracts].sort(
//       (a, b) =>
//         new Date(b.contract_date).getTime() -
//         new Date(a.contract_date).getTime()
//     );
//   }, [contracts]);

//   const fuse = useMemo(() => {
//     return new Fuse(sortedContracts, {
//       keys: ["contractors.name", "contracting_agency.name", "purpose", "award_text"],
//       threshold: 0.3,
//       ignoreLocation: true,
//     });
//   }, [sortedContracts]);

//   const filteredContracts = useMemo(() => {
//     if (!searchTerm.trim()) return sortedContracts;
//     return fuse.search(searchTerm).map((result) => result.item);
//   }, [searchTerm, fuse, sortedContracts]);

//   if (loading) {
//     return <p className="text-gray-500">Loading contracts...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <input
//         type="text"
//         placeholder="Search by contractor, agency, or purpose..."
//         className="w-full mb-4 p-2 border rounded"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredContracts.length === 0 ? (
//         <p className="text-gray-500">No results found.</p>
//       ) : (
//         filteredContracts.map((contract, index) => (
//           <ContractCard key={index} contract={contract} />
//         ))
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState, useMemo, useEffect } from "react";
import ContractCard from "@/components/dod/ContractCard";
import Fuse from "fuse.js";

interface Contractor {
  name: string;
  id: string;
  location: string;
}

interface Contract {
  contractors: Contractor[];
  purpose: string;
  amount: number;
  contract_date: string;
  contracting_agency: { name: string };
  award_text: string;
}

export default function ContractList() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/dod_awards_json/dod_awards_master.json");
        const data = await res.json();
        setContracts(data);
      } catch (err) {
        console.error("Error loading contracts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedContracts = useMemo(() => {
    return [...contracts].sort(
      (a, b) =>
        new Date(b.contract_date).getTime() -
        new Date(a.contract_date).getTime()
    );
  }, [contracts]);

  const fuse = useMemo(() => {
    return new Fuse(sortedContracts, {
      keys: ["contractors.name", "contracting_agency.name", "purpose", "award_text"],
      threshold: 0.3,
      ignoreLocation: true,
    });
  }, [sortedContracts]);

  const filteredContracts = useMemo(() => {
    if (!searchTerm.trim()) return sortedContracts;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse, sortedContracts]);

  // Contractor summary
  const contractorSummary = useMemo(() => {
    const summary: Record<string, { count: number; totalAmount: number }> = {};

    filteredContracts.forEach((contract) => {
      contract.contractors.forEach((contractor) => {
        if (!summary[contractor.name]) {
          summary[contractor.name] = { count: 0, totalAmount: 0 };
        }
        summary[contractor.name].count += 1;
        summary[contractor.name].totalAmount += contract.amount || 0;
      });
    });

    return Object.entries(summary)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        totalAmount: stats.totalAmount,
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }, [filteredContracts]);

  if (loading) {
    return <p className="text-gray-500">Loading contracts...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search by contractor, agency, or purpose..."
        className="w-full mb-4 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Collapsible contractor summary */}
      <div className="mb-6 border rounded">
        <button
          onClick={() => setShowSummary((prev) => !prev)}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
        >
          Contractor Summary
          <span>{showSummary ? "▲" : "▼"}</span>
        </button>

        {showSummary && (
          <div className="p-4">
            {contractorSummary.length === 0 ? (
              <p className="text-gray-500">No contractors found.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr>
                      <th className="p-2 border">Contractor</th>
                      <th className="p-2 border"># of Awards</th>
                      <th className="p-2 border">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractorSummary.map((c) => (
                      <tr key={c.name}>
                        <td className="p-2 border">{c.name}</td>
                        <td className="p-2 border">{c.count}</td>
                        <td className="p-2 border">
                          {c.totalAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contract list */}
      {filteredContracts.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        filteredContracts.map((contract, index) => (
          <ContractCard key={index} contract={contract} />
        ))
      )}
    </div>
  );
}
