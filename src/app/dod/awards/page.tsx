import ContractList from "@/components/dod/ContractList";

export default function Home() {
  return (
    <div className="font-sans items-center min-h-screen pt-20 md:pt-24">
      

      <h1 className="mx-auto text-center text-xl tracking-widest text-[#355e93] uppercase">Department of Defense</h1>
      <h1 className="mx-auto text-center text-xl tracking-widest text-[#355e93] uppercase">Contract Announcements</h1>
      <ContractList />
      
    </div>
  );
}