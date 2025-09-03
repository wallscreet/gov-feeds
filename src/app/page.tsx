import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUsCard";
import FeedOverview from "@/components/FeedOverviewCard";
import ContactUs from "@/components/ContactUsCard";

//Todo: Affordability page, chart for mtg ratio

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen pb-10 sm:p-20">
      <main className="flex flex-col gap-[25px] items-center sm:items-start">
        
        <Hero />
        <FeedOverview />
        <AboutUs />
      
      </main>
      
    </div>
  );
}
