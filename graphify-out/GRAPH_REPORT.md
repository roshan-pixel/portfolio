# Graph Report - stephanie-perez-portfolio  (2026-09-20)

## Corpus Check
- 5 files · ~493,634 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 112 nodes · 126 edges · 14 communities (9 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `31304d99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Core & Global State|UI Core & Global State]]
- [[_COMMUNITY_Project Documentation & Setup|Project Documentation & Setup]]
- [[_COMMUNITY_Interactive Lightbox & Slide Nav|Interactive Lightbox & Slide Nav]]
- [[_COMMUNITY_Easter Eggs & Audio Feedback|Easter Eggs & Audio Feedback]]
- [[_COMMUNITY_Service Worker & Cache System|Service Worker & Cache System]]
- [[_COMMUNITY_Prototype Simulator & Storage|Prototype Simulator & Storage]]
- [[_COMMUNITY_Rishwat Modal Dialogs|Rishwat Modal Dialogs]]
- [[_COMMUNITY_Tepi Popup Triggers|Tepi Popup Triggers]]
- [[_COMMUNITY_Navigation & Filter Engine|Navigation & Filter Engine]]
- [[_COMMUNITY_HSI Color Pinning Animation|HSI Color Pinning Animation]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `🌟 Key Features & Interactive Systems` - 9 edges
2. `Portfolio System Architecture & Graphify Knowledge Graph` - 7 edges
3. `Himanshi Parihar — UI/UX & Graphic Designer Portfolio` - 6 edges
4. `playCuteChime()` - 4 edges
5. `4. Key Subsystem Workflows` - 4 edges
6. `Method 2: Direct File Open` - 4 edges
7. `preloadNeighborSlides()` - 3 edges
8. `closeLightboxDirect()` - 3 edges
9. `navigateLightbox()` - 3 edges
10. `handleLightboxSwipe()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (14 total, 5 thin omitted)

### Community 0 - "UI Core & Global State"
Cohesion: 0.05
Nodes (28): allSlides, brandingHeader, brandingSection, canvas, ctx, drawer, fontCycleList, footerHeading (+20 more)

### Community 1 - "Project Documentation & Setup"
Cohesion: 0.16
Nodes (15): Clustered Functional Communities (77 Nodes · 88 Edges), code:powershell (# Navigate to the portfolio folder), code:powershell (Start-Process "C:\Users\sgarm\stephanie-perez-portfolio\inde), code:powershell (# Open the interactive 3D/2D physics graph), 🔍 Exploring the Graphify Knowledge Graph, 🌟 Features, Himanshi Parihar — UI/UX & Graphic Designer Portfolio, Himanshi Parihar — UI/UX & Graphic Designer Portfolio (Interactive Clone) (+7 more)

### Community 2 - "Interactive Lightbox & Slide Nav"
Cohesion: 0.33
Nodes (6): closeLightbox(), closeLightboxDirect(), handleLightboxSwipe(), navigateLightbox(), openLightbox(), preloadNeighborSlides()

### Community 3 - "Easter Eggs & Audio Feedback"
Cohesion: 0.33
Nodes (6): checkBrandingPosition(), payRishwat(), playCuteChime(), showTepiPopup(), showToast(), triggerRishwat()

### Community 4 - "Service Worker & Cache System"
Cohesion: 0.50
Nodes (3): clone, PRECACHE_ASSETS, url

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (12): 1. Graphify Knowledge Graph Summary, 2. Clustered Functional Communities, 3. Deep System Architecture, 5. Web Audio API Procedural Synthesizer, 6. How to Query the Graphify Graph, code:block1 (Graphify Topology Metrics:), code:mermaid (flowchart TD), code:mermaid (flowchart TD) (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.22
Nodes (9): 1. 🎨 HSI Healthcare Continuous 5-Color Pinning Engine, 2. ⚡ Dual-Layer Caching & Offline PWA Engine (`sw.js`), 3. 🖼️ Native-App Lightbox & Touch Gestures, 4. 📱 Interactive Phone Prototype Simulator, 5. 🌿 Bloomcare AI Botanical Scanner Simulator, 6. 🔊 Procedural Web Audio API Synthesizer, 7. 🎁 Cultural Easter Eggs, 8. 📄 Interactive Resume & Bio Drawer (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (6): 4. Key Subsystem Workflows, code:mermaid (sequenceDiagram), code:mermaid (sequenceDiagram), Subsystem A: Service Worker & Offline Image Cache, Subsystem B: HSI Healthcare 5-Color Pinning Engine, Subsystem C: Predictive Lightbox & Touch Gestures

## Knowledge Gaps
- **51 isolated node(s):** `allSlides`, `lightboxModal`, `lightboxImg`, `rishwat`, `drawer` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Himanshi Parihar — UI/UX & Graphic Designer Portfolio` connect `Project Documentation & Setup` to `Community 12`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `🌟 Key Features & Interactive Systems` connect `Community 12` to `Project Documentation & Setup`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Portfolio System Architecture & Graphify Knowledge Graph` connect `Community 11` to `Community 13`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `allSlides`, `lightboxModal`, `lightboxImg` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Core & Global State` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._