import path from "path";
import fs from "fs";
import DebtToThePennyCard from "@/components/treasury/DebtToThePennyCard";

export default function Treasury() {
    
    return (
        <div className="font-sans items-center justify-items-center sm:p-20">
            <main className="gap-[16px] items-center">
            
                <h1 className="text-3xl font-bold mb-8">Treasury Dashboard</h1>
                
                <DebtToThePennyCard />
            
            
            </main>
        
        </div>
    );
}
