"use client";

import React, { useState, useMemo, useEffect } from "react";
import ContractCard from "@/components/dod/ContractCard";
import Fuse from "fuse.js";

interface Contract {
  contractors: { name: string; id: string; location: string }[];
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

  if (loading) {
    return <p className="text-gray-500">Loading contracts...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search by contractor, agency, or purpose..."
        className="w-full mb-4 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
