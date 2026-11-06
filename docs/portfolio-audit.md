# Portfolio audit and redesign

## Scope and source of truth

The redesign uses the existing working-tree portfolio as its content source. The working tree already contained edits to `index.html`, `assets/css/main.css`, `assets/js/scripts.js`, `llms.txt`, and `sitemap.xml` before this task. Those files were inspected before implementation. Their career dates, company names, project names, technical descriptions, and destinations informed the redesign.

The public homepage also differs from the local working copy. No employment history was inferred from that difference. The local entries remain:

- **2014–Present:** Senior Full-Stack & Mobile Engineer — Independent Engineering Consultant & Freelance.
- **2017–Present:** Web Systems & Frontend Architect — Digital Agencies & Enterprise Clients.
- **2016–2017:** UI/UX Designer & Frontend Developer — iorange innovation.

The architecture is buildless HTML, CSS, and vanilla JavaScript. There is no framework or package build to replace. Unrelated streaming nginx and Apache examples were left untouched.

## Initial findings

### Existing strengths

- Substantial project evidence: five detailed case studies and 25 archive entries, including web, mobile, wearables, software, and creative coding.
- Descriptive screenshots, direct project destinations, GitHub links, and professional profiles.
- Static content available to crawlers without client-side rendering.
- Existing semantic sections, labeled inputs, skip link, lazy loading, canonical URL, sitemap, and structured data.
- A lightweight runtime without loaded legacy jQuery plugins.

### Problems addressed

- Identity was secondary to a generic hero role. A badge wall, four metric cards, and repeated summaries crowded the first impression.
- Eight primary navigation items, an availability badge, and repeated resume actions competed for attention.
- The slate/yellow/cyan palette, gradients, numerous cards, particles, animated counters, typewriter, and brand marquee made the presentation feel like a template.
- A full-page preloader delayed useful content and depended on JavaScript to clear.
- Project information was duplicated across case studies and archive; image actions depended on hover.
- Image and resume modals lacked full focus containment, restoration, and background inertness.
- Filters were list items presenting themselves as tabs without the associated tab keyboard model.
- The contact form opened an email client after artificial delays, displayed success-like feedback, and cleared unsent input.
- Resume access depended on a JavaScript modal; print layout could retain large hidden page spaces.
- Three remote font families and an external icon font added unnecessary critical requests.
- SEO included nonstandard AI declarations, keyword-heavy metadata, repeated FAQ content, and incorrect social-image dimensions.
- Existing promotional metrics and performance assertions had no independently supplied evidence. The redesign avoids promoting those metrics or describing them as independently verified.
- Multiple historical external destinations are no longer reliably reachable.

## Design decisions

### Editorial engineering portfolio

Warm ivory, near-black ink, and forest green replace the dark template styling. A system serif gives the full name and section headings an individual editorial character; a system sans keeps technical descriptions and navigation clear. No remote font or icon requests remain.

A consistent asymmetric grid, fine rules, restrained section numbering, and deliberate whitespace organize the page. Rounded card grids, decorative gradients, particle effects, and continuous motion were removed.

### Hierarchy and content

The hero immediately presents the full name, engineering focus, location, primary actions, GitHub, LinkedIn, and email. An actual project screenshot and a small linked project index provide evidence beside the introduction.

Five featured projects precede the longer biography and technical toolkit. Each includes its original summary, contribution, technologies, screenshot preview, destination, and expandable engineering notes. The detailed challenge and architectural decision text remains in the original HTML.

All 25 archive projects remain in a native disclosure, with an accessible button filter and announced result count. This keeps the initial page manageable without requiring JavaScript to access the archive. Career names and dates are preserved. Capabilities and technical-toolkit descriptions are retained in structured rows and lists.

Repeated recruiter-facing marketing labels and availability statements were removed. Contact information and professional profiles appear naturally. The short profile notes answer useful questions without artificial FAQ schema.

### Motion and interaction

- Small, non-blocking hero entrance movement and restrained link/image feedback.
- No continuous animations or JavaScript animation loops.
- CSS honors reduced-motion preferences, including changes during the session.
- Native screenshot dialog provides focus containment, Escape handling, background inertness, and focus restoration. Screenshot links continue to open originals without JavaScript.
- Mobile menu supports Escape, outside click, section selection, and viewport changes.
- Filters use real buttons and `aria-pressed`; visible counts are announced through a live region.
- Contact form immediately prepares an email draft. It explicitly explains the email-client handoff and preserves fields; it never claims delivery.

## SEO and AEO

- Homepage canonical and original section anchors are retained.
- Legacy public anchors `#services`, `#featured-showcases`, and `#statistics` resolve to relevant content locations.
- Dedicated `resume.html` has a unique title, description, canonical, social metadata, and WebPage entity.
- Homepage JSON-LD contains Person, ProfilePage, WebSite, and five CreativeWork entities linked by stable identifiers.
- Structured descriptions reuse the visible project content; no metrics, certifications, testimonials, ratings, or new employment claims were introduced.
- Correct 1024×992 social portrait dimensions replace the inaccurate landscape declaration.
- One H1 per page, semantic sections and articles, meaningful headings, descriptive image alt text, and internal project links.
- Sitemap includes the homepage and new resume page; robots permits crawling and points to the sitemap.
- `llms.txt` is a concise factual directory and profile summary. It is supplemental material, not a promise of indexing or AI citation.

## Performance and accessibility

- Preserved buildless architecture and zero runtime dependencies.
- Removed preloader, canvas, timer-based typewriter, counters, marquee, external font families, and external icon stylesheet.
- Original screenshots remain untouched for full-size preview links.
- Lightweight display derivatives reduce the referenced large-image set from **4,885,403 bytes to 1,224,140 bytes**, approximately **75% less**. The full original asset library was not deleted.
- Display-image dimensions match actual files; eager/high-priority loading is reserved for the hero screenshot. Below-fold images remain lazy.
- Visible focus styles, skip links, readable contrast, labeled inputs, native disclosures, keyboard-operable filters, native modal semantics, and print styles.
- Descriptive copy uses at least 14px across screen breakpoints. Technical metadata and toolkit explanations use at least 11–12px; small section indices and eyebrows remain secondary.
- Resume is a standalone document accessible without JavaScript; browser print/save PDF works as an enhancement.

## Files changed or added

- `index.html`: restructured existing content and metadata.
- `assets/css/main.css`: cohesive responsive design system, interaction states, and print styles.
- `assets/js/scripts.js`: small progressive enhancements for navigation, filters, preview dialog, contact draft, and resume printing.
- `resume.html`: standalone printable professional summary.
- `assets/img/favicon.svg`: small identity mark.
- `assets/img/optimized/`: JPEG display derivatives of existing images; originals retained.
- `llms.txt`: factual profile and content directory.
- `sitemap.xml`: homepage and resume.
- `robots.txt`: concise crawling policy and sitemap.
- `docs/portfolio-audit.md`: this record.
- `scripts/check-portfolio.py`: dependency-free production-source validation, supplied during QA.

## Verification

Implementation checks completed:

- `node --check assets/js/scripts.js`: passed.
- `python3 scripts/check-portfolio.py`: passed for both pages; verifies unique IDs, one H1 per page, local references, fragment destinations, JSON-LD parsing, sitemap XML, and absence of availability messaging.
- Confirmed all five featured project entries, 25 archive projects, three career entries, six capabilities, and four stack categories survive the restructuring.
- HTML formatted and checked with Apple HTML Tidy 5.8. Its remaining notices concern modern `decoding` and `fetchpriority` image attributes that this validator does not recognize; no structural repair warnings remain.
- Original project destinations retained. Browser-responsive, interaction, console, accessibility, and print checks are performed separately during final QA.
- Initial browser QA caught a desktop mobile-menu control and accessible-name overrides that omitted visible link labels. Both were corrected: the menu control now appears only at mobile widths, and links use their visible content and descriptive image alt text as their accessible names.

## External link limitations

Network checks on 6 November 2026 found the following issues in original project destinations:

- DNS failure: uaenationalday.ae, kfcgaming.me, win-topfruit.com, vgrowpharma.com, lotuscarsmadurai.co.in, desartbuilders.com.
- HTTP 404: Amity University's original `/fintech/` route.
- TLS validation failure: vivagamatrimony.com.
- Timeout: blanfordcapital.com.

These remain historical project references, with visible annotations and original-site labels instead of an assertion that a live demo works. Local screenshot previews provide a reliable way to inspect the work. No replacement website was invented.

LinkedIn returned 999, CodePen 403, and the CodeCanyon product route 403 to automated requests. These responses can be anti-automation controls and do not establish broken user-facing links. GitHub profile/repositories, Apple App Store, Fitbit Gallery, CodeCanyon profile, Auto Central, Medait Group, Awad, Krishna Bed, and Shelomith returned successful responses. CERT's original destination redirects to another education site, so its source URL was preserved rather than assigning an unverified replacement.

## Recommendations

Confirm historical project destinations and provide archival or replacement URLs when available. A separately authored resume PDF could supplement the printable summary in future. Review the preexisting career and detailed technical claims against personal records before publication; the redesign preserves source meaning and does not independently authenticate employment or outcomes.

No remote push or deployment is part of this implementation.

## Final browser QA

- Design evaluation: PASS after browser review at 1440, 768, and 375 CSS pixels. Final descriptive copy was increased to at least 14px, with clearer technical metadata.
- Responsive checks: no horizontal overflow at 375px or 768px; desktop menu control is hidden. Final desktop/tablet/mobile screenshots captured.
- Mobile navigation: opens, closes after selecting a section, and updates the destination fragment.
- Engineering notes: native disclosure opens and exposes original technical text.
- Screenshot preview: original loads, focus enters Close control, Escape closes dialog, and focus returns to preview link.
- Archive filters: All 25, Web 17, Mobile 3, Wearables 2, Software 3, SEO 1; state and live result counts agree. Categories overlap.
- Contact: empty input is invalid, completed input is valid; email-draft handoff announces its behavior and retains unsent fields. No email was sent during QA.
- Resume: standalone route loads; final generated PDF contains three nonempty pages, including the final selected project, without blank pages or clipped content.
- Reduced motion: computed hero animation is `none` and button transition duration is `0s`.
- JavaScript disabled: mobile navigation stays visible, all 25 archive entries remain in HTML, resume link works as a document link, and no horizontal overflow occurs.
- Lighthouse 13.6.0 final simulated mobile run: **Performance 93, Accessibility 100, Best Practices 100, SEO 100**. FCP 1.4s, LCP 3.0s, TBT 120ms, CLS 0.026. These are local lab measurements, not production field Core Web Vitals. Python preview lacks production compression/cache headers. Summary: `docs/qa-results.json`.
- Console: no JavaScript page errors on the final normal homepage load.
- Final static checks: local asset/fragment checks, JSON-LD syntax, one H1 per page, preserved anchors, sitemap XML, JavaScript syntax, and Git whitespace validation pass.

Remaining limitations are external historical URLs listed above, source claims that require the owner's personal records to authenticate, and production hosting behavior which must be measured after deployment. No remote push or deployment was performed.
