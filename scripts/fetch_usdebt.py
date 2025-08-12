import feedparser
import re
from dataclasses import dataclass
from datetime import datetime
from zoneinfo import ZoneInfo
import os
import json
from pathlib import Path


@dataclass
class DebtEntry:
    date: str
    public_debt: float
    intragovernmental: float
    total_debt: float
    pub_date: str


sep_double = "=" * 55
sep_single = "-" * 55


def parse_debt_content(content: str) -> tuple[float, float, float]:
    """
    Parse the content:encoded field to extract debt values.
    """
    public_debt = re.search(r"Debt Held by the Public:</em>\s*([\d,]+\.\d{2})", content)
    intragovernmental = re.search(r"Intragovernmental Holdings:</em>\s*([\d,]+\.\d{2})", content)
    total_debt = re.search(r"Total Public Debt Outstanding:</em>\s*([\d,]+\.\d{2})", content)
    
    if not all([public_debt, intragovernmental, total_debt]):
        raise ValueError("Could not parse debt values from content")
    
    # Convert strings to floats, removing commas
    return (
        float(public_debt.group(1).replace(",", "")),
        float(intragovernmental.group(1).replace(",", "")),
        float(total_debt.group(1).replace(",", ""))
    )


def fetch_debt_data(url: str, num_posts: int = 2) -> list[DebtEntry]:
    """
    Fetch and parse the most recent n posts from the RSS feed.
    """
    feed = feedparser.parse(url)
    entries = []
    
    for entry in feed.entries[:num_posts]:
        date = entry.title.split("for ")[-1]  # Extract date from title
        public_debt, intragovernmental, total_debt = parse_debt_content(entry.content[0].value)
        
        entries.append(DebtEntry(
            date=date,
            public_debt=public_debt,
            intragovernmental=intragovernmental,
            total_debt=total_debt,
            pub_date=entry.published
        ))
    
    return entries


def sync_debt_data_to_json(entries: list[DebtEntry], base_dir="../public/data"):
        """
        Sync the debt data to a JSON file.
        Prevents duplication by comparing dates.
        """
        os.makedirs(base_dir, exist_ok=True)
        json_path = Path(base_dir) / "debt_data.json"

        # Load existing data or initialize structure
        if json_path.exists():
            with open(json_path, "r") as f:
                data = json.load(f)
        else:
            data = []

        # Deduplication check based on date
        existing_dates = {entry['date'] for entry in data}
        
        for entry in entries:
            if entry.date in existing_dates:
                print(f"⚠️ Entry for {entry.date} already exists. Skipping.")
                continue
            
            cleaned_entry = {
                "date": entry.date,
                "public_debt": entry.public_debt,
                "intragovernmental": entry.intragovernmental,
                "total_debt": entry.total_debt,
                "pub_date": entry.pub_date
            }
            data.append(cleaned_entry)

        # Save to JSON
        with open(json_path, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"✔️ Synced debt data to {json_path}")


def main():
    # Fetch the most recent two posts
    entries = fetch_debt_data("https://treasurydirect.gov/NP_WS/debt/feeds/recent", num_posts=30)
    sync_debt_data_to_json(entries)


if __name__ == "__main__":
    main()