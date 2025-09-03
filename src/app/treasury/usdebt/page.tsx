import path from "path";
import fs from "fs";
import DebtToThePenny from "@/components/treasury/DebtToThePenny";
import { BadgeDollarSign } from "lucide-react";

export default function Treasury() {
    
    return (
        <div className="font-sans items-center justify-items-center pt-18">
            
            <main className="items-center px-10">
                <div className="gap-6">       
                    <h1 className="text-2xl font-semibold text-center mb-4 text-center text-[#0c122d]">
                        U.S. Debt To The Penny
                    </h1>
                    </div>

                    <div>
                        <div className="flex items-center my-2 mb-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                                <BadgeDollarSign className="mx-4 text-gray-400 w-4 h-4" />
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        
                        <p className="text-center px-10 text-md mb-4 text-[#0c122d]">
                            The U.S. national debt is the total money the federal government owes, including what it owes to the public and to itself through various programs. The Debt to the Penny API provides daily updates of this debt down to the exact dollar, giving a clear, detailed view of how America&apos;s financial obligations change over time.
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    </div>
                
                {/* <DebtToThePennyCard /> */}
                <DebtToThePenny />
            </main>
            
        </div>
    );
}