import { parseStringPromise } from 'xml2js';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

async function getRssFeed() {
  const response = await fetch('https://www.federalreserve.gov/feeds/working_papers.xml');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result.rss.channel[0].item as RssItem[];
}

export default async function FinEconDiscussion() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl tracking-widest text-gray-700 uppercase">US Federal Reserve - Research Papers</h1>
      <h1 className="text-center text-xl tracking-widest text-gray-700 uppercase">International Finance Discussion Papers</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-12">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-2xl rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{item.title[0]}</h2>
            <p className="text-gray-600 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">{item.description[0].substring(0, 690)}...</p>
            <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}