import Home from "@/app/page"
import HomeAffordabilityCard from "@/components/gov-data/affordability"

function page() {
  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-center">Test Page</h1>
      <HomeAffordabilityCard/>
    </div>
  )
}

export default page