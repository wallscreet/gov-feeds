from pathlib import Path
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from typing import List, Dict, Any
import json
from dateutil import parser
from dataclasses import dataclass, field
import os
from pydantic import BaseModel
from openai import OpenAI
import re
import feedparser
from urllib.parse import urlencode
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

@dataclass
class XAIClient:
    api_key: str = os.getenv("XAI_API_KEY")
    base_url: str = "https://api.x.ai/v1"

    def __post_init__(self):
        self.client = OpenAI(
            api_key=self.api_key,
            base_url=self.base_url,
            timeout=3600,
        )
    
    def get_response(self, model: str, messages: list = None):
        """
        Get a response from the Grok AI model.

        :param model: The Grok model to use (e.g., 'grok-3').
        :param messages: The input messages for the AI model.
        :return: The response content from the AI model.
        """
        try:
            completion = self.client.chat.completions.create(
                model=model,
                messages=messages
            )
            return completion.choices[0].message.content

        except Exception as e:
            print(f"Error: {e}")
    
    def get_structured_response(self, model: str, response_format: BaseModel = None, content: str = None):
        """
        Get a structured output response from the Grok AI api.

        :param model: The Grok model to use (e.g., 'grok-3').
        :param messages: The input messages for the AI model.
        :param response_format: The Pydantic model to define the structure of the response.
        """
        messages = [
            {
                "role": "system",
                "content": "Extract structured information from the content."
            },
            {
                "role": "user",
                "content": content
            }
        ]

        try:
            completion = self.client.chat.completions.parse(
                model=model,
                messages=messages,
                response_format=response_format,
            )
            return completion.choices[0].message.parsed
        
        except Exception as e:
            print(f"Error: {e}")


class Entity(BaseModel):
    name: str
    contract_id: str
    location: str


class ContractingAgency(BaseModel):
    name: str
    location: str


class DodContractInfo(BaseModel):
    """
    Pydantic model to extract contract details from text extracted from DOD awards/contracts URL extracted from the DOD contracts RSS feed.
    """
    contractors: list[Entity]
    purpose: str
    amount: float
    contracting_agency: ContractingAgency


@dataclass
class Feed:
    """
    Base class for rss feeds.
    """
    name: str
    base_url: str
    description: str = ""
    content_type: Optional[str] = None
    site: Optional[str] = None
    max: Optional[int] = None
    url: str = field(init=False)

    def __post_init__(self):
        params = {}
        if self.site is not None:
            params["Site"] = self.site
        if self.content_type is not None:
            params["ContentType"] = self.content_type
        if self.max is not None:
            params["Max"] = str(self.max)

        query_string = urlencode(params)
        self.url = f"{self.base_url}?{query_string}" if query_string else self.base_url


@dataclass
class BaseRSS:
    """
    Base class for RSS sources to contain their feeds.
    """
    feeds: List[Feed]

    def get_url_by_name(self, name: str) -> Optional[str]:
        feed = next((f for f in self.feeds if f.name == name), None)
        if not feed:
            raise ValueError(f"No feed found with name '{name}'")
        return feed.url


@dataclass
class DOD_RSS(BaseRSS):
    """
    RSS feeds for the United States Department of Defense (DOD).
    """
    feeds: list[Feed] = field(default_factory=lambda: [
            Feed(
                name="Contract Announcements",
                content_type="400",
                base_url="https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx",
                site="945",
                max=10,
                description="U.S. Department of Defense Contracts valued at $7.5 million or more are announced each business day at 5 p.m."
            ),
    ])

    def get_contract_announcements_feed(self) -> list[str]:
        """ Contract Announcements
        Returns a list of entries containing links for daily contract announcements.
        """
        contracts_rss_url = self.get_url_by_name("Contract Announcements")
        entries = feedparser.parse(contracts_rss_url)

        return entries


def sanitize_filename(name: str) -> str:
    # replace spaces with underscores, strip forbidden filesystem chars
    name = name.strip().replace(" ", "_")
    # remove anything that's not alphanumeric, underscore, hyphen, or dot
    return re.sub(r"[^\w\-.]", "", name)


def is_noise_paragraph(text: str) -> bool:
    # match "*Small business" with optional space after *, case-insensitive
    if re.match(r"^\*\s*small business$", text.strip(), flags=re.IGNORECASE):
        return True
    return False


def load_processed_list(manifest_path: Path) -> set[str]:
    if manifest_path.exists():
        return {line.strip() for line in manifest_path.read_text(encoding="utf-8").splitlines() if line.strip()}
    return set()


def append_processed_file(manifest_path: Path, filename: str):
    with open(manifest_path, "a", encoding="utf-8") as f:
        f.write(filename + "\n")


def parse_contract_date(date_string: str):
    return parser.parse(date_string)


def extract_contract_awards_content(url: str) -> list[str]:
    """ Contract Announcements
    Extracts paragraphs from a dod contract announcement page.
    """
    output_dir = Path("../public/data/dod_awards_json")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        content = page.content()
        browser.close()

    soup = BeautifulSoup(content, 'html.parser')
    body_div = soup.find("div", class_="body")
    if body_div is None:
        raise RuntimeError("Could not find <div class='body'> on the page")

    raw_title = soup.find("h1").get_text(strip=True)
    page_title = sanitize_filename(raw_title)
    date_month = page_title.split("_")[2]
    date_day = page_title.split("_")[3]
    date_year = page_title.split("_")[4]
    
    date_string = f"{date_month} {date_day}, {date_year}"
    contract_date = parse_contract_date(date_string=date_string)
    iso_date = contract_date.date().isoformat()
    # print(f"Contract Date: {contract_date}")

    out_path = output_dir / f"{page_title}.json"

    if out_path.exists():
        print(f"File {out_path} already exists, skipping extraction.")
    else:
        paragraphs_raw = [
            p.get_text(strip=True) for p in body_div.find_all("p") if p.get_text(strip=True) and not (p.get("style") and "text-align" in p.get("style", ""))
        ]

        paragraphs = [
            {
                "text": para, "contract_date": iso_date
            } for para in paragraphs_raw 
        ]

        # Write to JSON file
        with open(f"../public/data/dod_awards_json/{page_title}.json", "w", encoding="utf-8") as f:
            json.dump(paragraphs, f, ensure_ascii=False, indent=2)

        print(f"Extracted {len(paragraphs)} paragraphs and saved to contracts.json")
        print(f"Page Title: {page_title}")


def sync_contract_announcements_feed_json():
    dod = DOD_RSS()
    entries = dod.get_contract_announcements_feed()

    for entry in entries['entries']:
        title = entry.get('title', 'No Title')
        link = entry.get('link', None)
        
        if link:
            print(f"Processing: {title} - {link}")
            extract_contract_awards_content(link)
        else:
            print(f"Skipping entry without link: {title}")


def contract_awards_to_master_json(out_path: str, filepath: str):
    """
    Load one day's extracted paragraph file, get structured award info, and merge into a master JSON file.
    """
    out_path = Path(out_path)
    filepath = Path(filepath)

    # Load input day's data
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Load existing master if present
    if out_path.exists():
        with open(out_path, "r", encoding="utf-8") as f:
            try:
                master_awards: List[Dict[str, Any]] = json.load(f)
            except json.JSONDecodeError:
                master_awards = []
    else:
        master_awards = []

    # Build a set of dedupe keys already present
    existing_keys = set()
    for a in master_awards:
        # key: contractor name(s) + contract_id(s) + contract_date
        contractors = a.get("contractors", [])
        if contractors:
            first = contractors[0]
            key = (
                first.get("name", "").strip().lower(),
                a.get("contract_date", ""),
            )
        else:
            key = (a.get("award_text", "").strip().lower(), a.get("contract_date", ""))
        existing_keys.add(key)

    new_awards = []
    for entry in data:
        text = entry.get("text", "").strip()
        if not text or text.lower().startswith("*small business"):
            continue  # skip noise

        # Get structured award
        xclient = XAIClient()
        award_details = xclient.get_structured_response(
            model="grok-3-mini",
            response_format=DodContractInfo,
            content=text,
        )
        record = award_details.model_dump() if hasattr(award_details, "model_dump") else award_details.dict()

        # Attach metadata
        contract_date = entry.get("contract_date")
        record["contract_date"] = contract_date
        record["award_text"] = text

        # Build the dedupe key
        contractors = record.get("contractors", [])
        if contractors:
            first = contractors[0]
            key = (
                first.get("name", "").strip().lower(),
                record["contract_date"],
            )
        else:
            key = (text.lower(), record["contract_date"])

        if key in existing_keys:
            # already have it
            continue
        existing_keys.add(key)
        new_awards.append(record)

    if not new_awards:
        print(f"No new awards to add from {filepath.name}")
    else:
        master_awards.extend(new_awards)
        # Write back to master
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(master_awards, f, ensure_ascii=False, indent=2)
        print(f"Appended {len(new_awards)} new award(s) from {filepath.name} to {out_path}")


def batch_process_awards_json(data_dir: Path, master_path: Path):
    manifest_path = data_dir / "processed_files.txt"
    processed = load_processed_list(manifest_path=manifest_path)

    for file in sorted(data_dir.iterdir()):
        if not file.is_file():
            continue
        if file.name in {master_path.name, manifest_path.name}:
            continue
        if file.suffix.lower() != ".json":
            continue
        if file.name in processed:
            print(f"Skipping already-processed file {file.name}")
            continue

        try:
            print(f"Processing {file.name}...")
            contract_awards_to_master_json(out_path=str(master_path), filepath=str(file))
            append_processed_file(manifest_path, file.name)
        except Exception as e:
            print(f"Failed to process {file.name}: {e}")


def main():
    data_dir = Path("../public/data/dod_awards_json")
    master_path = data_dir / "dod_awards_master.json"

    sync_contract_announcements_feed_json()
    batch_process_awards_json(data_dir=data_dir, master_path=master_path)


if __name__ == "__main__":
    main()