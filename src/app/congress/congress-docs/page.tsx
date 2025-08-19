import { parseStringPromise } from "xml2js";

interface RssGuid {
  _: string;
  $?: { isPermaLink?: string };
}

interface RssItem {
  guid: RssGuid[];
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

function cleanTitle(title: string): string {
  return title.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function buildPdfUrl(item: RssItem): string | null {
  try {
    const guid = item?.guid?.[0]?._;
    if (!guid) return null;
    return `https://www.govinfo.gov/content/pkg/${guid}/pdf/${guid}.pdf`;
  } catch {
    return null;
  }
}

async function getRssFeed(): Promise<RssItem[]> {
  const response = await fetch("https://www.govinfo.gov/rss/cdoc.xml");
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item as RssItem[];
  return items.sort(
    (a, b) =>
      new Date(b.pubDate[0]).getTime() - new Date(a.pubDate[0]).getTime()
  );
}

export default async function CongressDocs() {
  const items = await getRssFeed();

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase p-4">
        Congressional Documents
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pt-6">
        {items.map((item, index) => {
          const pdfUrl = buildPdfUrl(item);

          return (
            <div key={index} className="bg-gray-100 border border-slate-200 shadow-lg rounded-lg p-4">
              <h2 className="text-xl text-[#355e93] font-semibold mb-2">{cleanTitle(item.title[0])}</h2>
              <p className="text-gray-600 mb-2">{new Date(item.pubDate[0]).toLocaleDateString()}</p>

              <div className="flex gap-4">
                <a href={item.link[0]} target="_blank" rel="noopener noreferrer" className="text-[#355e93] hover:underline hover:text-blue-800">Content Details</a>
                {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#355e93] hover:underline hover:text-blue-800">Document PDF</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
