import { parseStringPromise } from 'xml2js';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
  enclosure?: { $: { url: string; type: string } }[];
}

function cleanTitle(title: string): string {
  return title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

async function getRssFeed() {
  const response = await fetch('https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=800&Site=945&max=30');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item as RssItem[];
  return items.sort((a, b) => new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime());
}

export default async function Home() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-2">Department of Defense</h1>
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-2">Feature Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 pt-6">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-100 border border-slate-200 shadow-lg rounded-lg p-4">
            <h2 className="text-xl text-[#355e93] font-semibold mb-2">{cleanTitle(item.title[0])}</h2>
            {item.enclosure?.[0]?.$.url && (
              <img
                src={item.enclosure[0].$.url}
                alt={item.title[0]}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
            )}
            <p className="text-slate-700 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>
            <p className="text-slate-700 mb-4">{item.description[0].substring(0, 225)}...</p>
            <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-[#355e93] hover:text-blue-800 hover:underline">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}