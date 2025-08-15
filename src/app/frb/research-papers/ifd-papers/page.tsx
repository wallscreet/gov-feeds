import { parseStringPromise } from 'xml2js';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

async function getRssFeed() {
  const response = await fetch('https://www.federalreserve.gov/feeds/ifdp.xml');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result.rss.channel[0].item as RssItem[];
}

export default async function FinEconDiscussion() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-2">US Federal Reserve - Research Papers</h1>
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase">International Finance Discussion Papers</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pt-6">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-100 border border-slate-200 shadow-lg rounded-lg p-4">
            <h2 className="text-xl text-[#355e93] font-semibold mb-2">{item.title[0]}</h2>
            <p className="text-gray-700 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>
            <p className="text-[#355e93] mb-4">{item.description[0].substring(0, 420)}...</p>
            <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-[#355e93] hover:text-blue-800 hover:underline">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}