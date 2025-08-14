import path from "path";
import fs from "fs";
import DebtToThePennyCard from "@/components/treasury/DebtToThePennyCard";

export default function Treasury() {
    
    return (
        <div className="font-sans items-center justify-items-center sm:p-20">
            <main className="items-center">
            
                <h1 className="text-center text-xl tracking-widest text-gray-800 uppercase mb-8">
                US Debt to the Penny
                </h1>
                
                <DebtToThePennyCard />
            
            
            </main>
        
        </div>
    );
}