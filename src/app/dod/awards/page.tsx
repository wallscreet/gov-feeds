import ContractList from "@/components/dod/ContractList";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] items-center sm:items-start">

        <h1 className="text-2xl pl-4 font-bold mb-4">DOD Contract Announcements</h1>
        <ContractList />
       
      </main>
      
    </div>
  );
}