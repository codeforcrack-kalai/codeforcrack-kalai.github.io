"""Dependency-free checks for the portfolio's static production files."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.refs, self.headings = path, [], [], []
        self.schemas, self.schema, self.in_schema = [], '', False
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if re.fullmatch('h[1-6]', tag):
            self.headings.append(int(tag[1]))
        for key in ('src', 'href'):
            if key in attrs:
                self.refs.append(attrs[key])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_schema, self.schema = True, ''
    def handle_data(self, data):
        if self.in_schema:
            self.schema += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.in_schema:
            self.schemas.append(json.loads(self.schema))
            self.in_schema = False

errors = []
pages = {p.name: Page(p) for p in [ROOT / 'index.html', ROOT / 'resume.html'] if p.exists()}
for name, page in pages.items():
    if len(page.ids) != len(set(page.ids)):
        errors.append(f'{name}: duplicate IDs')
    if page.headings.count(1) != 1:
        errors.append(f'{name}: expected one H1')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        dest = (ROOT / unquote(url.path.lstrip('/'))) if url.path else page.path
        if not dest.exists():
            errors.append(f'{name}: missing asset {ref}')
        if url.fragment and dest.name in pages and url.fragment not in pages[dest.name].ids:
            errors.append(f'{name}: missing anchor {ref}')
    text = page.path.read_text()
    if re.search(r'available for hire|ready to join|open for freelance|available on-site|open to opportunities', text, re.I):
        errors.append(f'{name}: availability messaging remains')
    if not page.schemas:
        errors.append(f'{name}: missing structured data')
    print(f'{name}: {len(page.ids)} unique anchors, {len(page.refs)} references, {len(page.schemas)} JSON-LD blocks')
required = {'home','about','experience','capabilities','skills','brands','case-studies','work','faq','contact'}
if missing := required - set(pages['index.html'].ids):
    errors.append(f'Missing preserved anchors: {missing}')
ET.parse(ROOT / 'sitemap.xml')
if errors:
    raise SystemExit('\n'.join(errors))
print('PASS: local references, anchors, JSON-LD syntax, heading counts, sitemap XML, availability wording')
