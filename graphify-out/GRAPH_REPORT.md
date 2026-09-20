# Graph Report - .  (2026-09-20)

## Corpus Check
- 77 files · ~50,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 77 nodes · 88 edges · 11 communities (6 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Core & Global State|UI Core & Global State]]
- [[_COMMUNITY_Navigation & Filter Engine|Navigation & Filter Engine]]
- [[_COMMUNITY_Prototype Simulator & Storage|Prototype Simulator & Storage]]
- [[_COMMUNITY_Interactive Lightbox & Slide Nav|Interactive Lightbox & Slide Nav]]
- [[_COMMUNITY_Easter Eggs & Audio Feedback|Easter Eggs & Audio Feedback]]
- [[_COMMUNITY_Rishwat Modal Dialogs|Rishwat Modal Dialogs]]
- [[_COMMUNITY_Tepi Popup Triggers|Tepi Popup Triggers]]
- [[_COMMUNITY_HSI Color Pinning Animation|HSI Color Pinning Animation]]
- [[_COMMUNITY_Service Worker & Cache System|Service Worker & Cache System]]
- [[_COMMUNITY_Project Documentation & Setup|Project Documentation & Setup]]

## God Nodes (most connected - your core abstractions)
1. `playCuteChime()` - 4 edges
2. `preloadNeighborSlides()` - 3 edges
3. `closeLightboxDirect()` - 3 edges
4. `navigateLightbox()` - 3 edges
5. `handleLightboxSwipe()` - 3 edges
6. `payRishwat()` - 3 edges
7. `showTepiPopup()` - 3 edges
8. `Himanshi Parihar — UI/UX & Graphic Designer Portfolio (Interactive Clone)` - 3 edges
9. `🚀 How to Run` - 3 edges
10. `Method 1: Local HTTP Server (Active on Port 8080)` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (11 total, 5 thin omitted)

### Community 0 - "UI Core & Global State"
Cohesion: 0.05
Nodes (28): allSlides, lightboxModal, lightboxImg, rishwat, drawer, overlay, toast, rishwatOverlay (+20 more)

### Community 2 - "Interactive Lightbox & Slide Nav"
Cohesion: 0.33
Nodes (6): preloadNeighborSlides(), openLightbox(), closeLightboxDirect(), closeLightbox(), navigateLightbox(), handleLightboxSwipe()

### Community 3 - "Easter Eggs & Audio Feedback"
Cohesion: 0.33
Nodes (6): showToast(), playCuteChime(), triggerRishwat(), payRishwat(), showTepiPopup(), checkBrandingPosition()

### Community 4 - "Service Worker & Cache System"
Cohesion: 0.50
Nodes (3): PRECACHE_ASSETS, url, clone

### Community 1 - "Project Documentation & Setup"
Cohesion: 0.22
Nodes (8): Himanshi Parihar — UI/UX & Graphic Designer Portfolio (Interactive Clone), 🌟 Features, 🚀 How to Run, Method 1: Local HTTP Server (Active on Port 8080), code:block1 (http://localhost:8080), code:powershell (cd C:\Users\sgarm\stephanie-perez-portfolio), Method 2: Direct File Open, code:powershell (Start-Process "C:\Users\sgarm\stephanie-perez-portfolio\inde)

## Knowledge Gaps
- **35 isolated node(s):** `allSlides`, `lightboxModal`, `lightboxImg`, `rishwat`, `drawer` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `allSlides`, `lightboxModal`, `lightboxImg` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Core & Global State` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._