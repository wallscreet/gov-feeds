import ContractList from "@/components/dod/ContractList";

export default function Home() {
  return (
    <div className="font-sans items-center min-h-screen sm:p-20">
      

      <h1 className="mx-auto text-center text-xl tracking-widest text-[#355e93] uppercase">Department of Defense</h1>
      <h1 className="mx-auto text-center text-xl tracking-widest text-[#355e93] uppercase">Contract Announcements</h1>
      <ContractList />
      
    </div>
  );
}