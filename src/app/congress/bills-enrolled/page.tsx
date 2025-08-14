import { parseStringPromise } from 'xml2js';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

function cleanTitle(title: string): string {
  return title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

async function getRssFeed() {
  const response = await fetch('https://www.govinfo.gov/rss/bills-enr.xml');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item as RssItem[];
  return items.sort((a, b) => new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime());
}

export default async function CongressBillsEnrolled() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl tracking-widest text-gray-700 uppercase mb-4">Congressional Bills - Enrolled</h1>
      <p>An Enrolled Congressional Bill is the final version of a bill that has passed both the House and Senate in identical form, been certified by the originating chamber’s clerk, signed by the presiding officers (Speaker of the House and President Pro Tempore of the Senate), and is ready for presentation to the President for signature or veto.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pt-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-2xl rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{cleanTitle(item.title[0])}</h2>
            <p className="text-gray-600 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>
            {/* <p className="text-gray-700 mb-4">{item.description[0].substring(0, 420)}...</p> */}
            <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}