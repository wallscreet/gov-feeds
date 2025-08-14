import path from "path";
import fs from "fs";
import DebtToThePenny from "@/components/treasury/DebtToThePenny";

export default function Treasury() {
    
    return (
        <div className="font-sans items-center justify-items-center sm:p-20">
            <main className="items-center">
            
                <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-6">
                US Debt to the Penny
                </h1>
                
                <DebtToThePenny />
            
            
            </main>
        
        </div>
    );
}