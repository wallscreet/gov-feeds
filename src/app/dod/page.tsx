import ContractList from "@/components/dod/ContractList";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] items-center sm:items-start">

      Department of Defense 

        <h1 className="text-2xl font-bold mb-6">Recent Contracts</h1>
        <ContractList />
       
      </main>
      
    </div>
  );
}