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
  const response = await fetch('https://www.govinfo.gov/rss/bills.xml');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item as RssItem[];
  return items.sort((a, b) => new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime());
}

export default async function CongressBills() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl tracking-widest text-gray-700 uppercase mb-4">Congressional Bills</h1>
      <p className="mb-2">A Congressional Bill is a legislative proposal introduced in either the House or Senate, still in the process of being debated, amended, and voted on. It may or may not pass both chambers.</p>
      <p>(IH): Introduced in the House of Representatives</p>
      <p>(IS): Introduced in the Senate</p>
      
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