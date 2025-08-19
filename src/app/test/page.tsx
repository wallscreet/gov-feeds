import MedianHomeSalesPriceChart from '@/components/gov-data/MedianHomeSalesPrice'
import Mtg15RatesChart from '@/components/gov-data/15yrMtgRates'
import Mtg30RatesChart from '@/components/gov-data/30yrMtgRates'


function page() {
  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-center">Test Page</h1>
      <MedianHomeSalesPriceChart/>
      <Mtg30RatesChart/>
      <Mtg15RatesChart/>
    </div>
  )
}

export default page
