import path from "path";
import fs from "fs";
// import DebtToThePennyCard from "@/components/treasury/DebtToThePennyCard";
import DebtToThePenny from "@/components/treasury/DebtToThePenny";

export default function Treasury() {
    
    return (
        <div className="font-sans items-center justify-items-center  pt-24">
            <main className="items-center">
            
                <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-6 font-semibold">
                US Debt to the Penny
                </h1>
                
                {/* <DebtToThePennyCard /> */}
                <DebtToThePenny />
            
            
            </main>
        </div>
    );
}