'use client';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
    return fuse.search(searchTerm).map(result => result.item);
  }, [searchTerm, fuse, sortedContracts]);

  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const currentContracts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredContracts.slice(start, end);
  }, [filteredContracts, currentPage]);

  if (loading) return <p className="text-gray-500">Loading contracts...</p>;

  if (filteredContracts.length === 0)
    return (
      <div className="max-w-3xl mx-auto p-4">
        <input
          type="text"
          placeholder="Search by contractor, agency, or purpose..."
          className="w-full mb-4 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="text-gray-500">No results found.</p>
      </div>
    );

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxButtons = 6;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    startPage = Math.max(1, endPage - maxButtons + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage ? "bg-[#355e93] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by contractor, agency, or purpose..."
        className="w-full mb-4 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Contracts List */}
      {currentContracts.map((contract, index) => (
        <ContractCard key={index} contract={contract} />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
