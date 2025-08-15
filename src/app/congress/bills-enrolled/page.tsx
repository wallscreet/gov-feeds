import { parseStringPromise } from 'xml2js';
import { parse } from 'node-html-parser';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

function cleanTitle(title: string): string {
  return title.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseDescriptionForPdfUrl(description: string): string | null {
  const root = parse(description);
  const pdfLink = root.querySelectorAll('a').find(a => a.getAttribute('href')?.endsWith('.pdf'));
  const href = pdfLink?.getAttribute('href');
  return href !== undefined ? href : null;
}

async function getRssFeed() {
  const response = await fetch('https://www.govinfo.gov/rss/bills-enr.xml');
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item as RssItem[];
  return items.sort((a, b) => new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime());
}

export default async function CongressBills() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-4">Congressional Bills - Enrolled</h1>
      <p className="mb-2 text-[#355e93]">An Enrolled Congressional Bill is the final version of a bill that has passed both the House and Senate in identical form, been certified by the originating chamber’s clerk, signed by the presiding officers (Speaker of the House and President Pro Tempore of the Senate), and is ready for presentation to the President for signature or veto.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pt-6">
        {items.map((item, index) => {
          const pdfUrl = parseDescriptionForPdfUrl(item.description[0]);
          return (
            <div key={index} className="bg-gray-100 border border-slate-200 shadow-lg rounded-lg p-4">
              <p className="text-slate-600 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>
              <h2 className="text-xl text-[#355e93] font-semibold mb-2">{cleanTitle(item.title[0])}</h2>
              <div className="flex space-x-4">
                <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-[#355e93] hover:underline hover:text-blue-600">Read more</a>
                {pdfUrl && (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline hover:text-blue-600">View Bill PDF</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}