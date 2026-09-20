# Portfolio System Architecture & Graphify Knowledge Graph

This document provides a deep, production-grade technical breakdown of the architecture, subsystems, data flow, and knowledge graph for the portfolio codebase (`stephanie-perez-portfolio`), processed and clustered via **[Graphify](https://github.com/Graphify-Labs/graphify)**.

---

## 1. Graphify Knowledge Graph Summary

The codebase was ingested and clustered using Graphify into **77 nodes**, **88 edges**, and **11 distinct functional communities**.

### Graphify Artifacts Generated in `graphify-out/`
- **[`graphify-out/graph.html`](file:///C:/Users/sgarm/stephanie-perez-portfolio/graphify-out/graph.html)**: Interactive force-directed 2D/3D physics visualization with community clustering.
- **[`graphify-out/GRAPH_TREE.html`](file:///C:/Users/sgarm/stephanie-perez-portfolio/graphify-out/GRAPH_TREE.html)**: Collapsible D3 hierarchical tree view.
- **[`graphify-out/stephanie-perez-portfolio-callflow.html`](file:///C:/Users/sgarm/stephanie-perez-portfolio/graphify-out/stephanie-perez-portfolio-callflow.html)**: Interactive Mermaid callflow with zoom & pan controls.
- **[`graphify-out/GRAPH_REPORT.md`](file:///C:/Users/sgarm/stephanie-perez-portfolio/graphify-out/GRAPH_REPORT.md)**: God nodes, cohesion metrics, and community audit summary.
- **[`graphify-out/graph.json`](file:///C:/Users/sgarm/stephanie-perez-portfolio/graphify-out/graph.json)**: GraphRAG-ready schema of all entities, calls, and relationships.

```
Graphify Topology Metrics:
  Nodes: 77
  Edges: 88
  Communities: 11 (6 primary, 5 focused utility modules)
  Token Reduction: 3.1x query compression vs full-corpus scanning
```

---

## 2. Clustered Functional Communities

```mermaid
flowchart TD
    subgraph Core ["Core Application Layer"]
        C0["Community 0: UI Core & State<br/>(DOM refs, scanning, canvas)"]
        C8["Community 8: Navigation & Filter<br/>(scrollToSection, category filtering)"]
    end

    subgraph Interactive ["Interactive User Subsystems"]
        C2["Community 2: Interactive Lightbox<br/>(Swipe, preloading, modal controls)"]
        C9["Community 9: HSI Color Droplets<br/>(5-color continuous animation loop)"]
        C5["Community 5: Prototype Simulator<br/>(Slide switching, screen toggling)"]
    end

    subgraph AudioEasterEggs ["Audio & Easter Eggs"]
        C3["Community 3: Audio & Easter Eggs<br/>(Web Audio API synthesizer, toasts)"]
        C6["Community 6: Rishwat Bribe Modal<br/>(Bribe choice handler, dialogs)"]
        C7["Community 7: Tepi Popup Triggers<br/>(Branding section scroll detection)"]
    end

    subgraph InfraCache ["Infrastructure & Offline Pipeline"]
        C4["Community 4: Service Worker & Cache<br/>(PWA cache-first, precache engine)"]
        C1["Community 1: Documentation & Server<br/>(README, run scripts, deployment)"]
        C10["Community 10: Asset Utilities<br/>(download_assets.py)"]
    end

    C0 --> C2
    C0 --> C9
    C0 --> C3
    C4 --> C0
    C3 --> C6
    C3 --> C7
    C8 --> C0
```

### Community Breakdown
| ID | Community Label | Node Count | Key Functions & Abstractions |
|---|---|---|---|
| **0** | **UI Core & Global State** | 41 | `allSlides`, `ctx`, `runPlantScan()`, particle loop, DOM bindings |
| **1** | **Project Documentation & Setup** | 9 | `README.md`, deployment methods, server commands |
| **2** | **Interactive Lightbox & Slide Nav** | 6 | `openLightbox()`, `navigateLightbox()`, `handleLightboxSwipe()`, `preloadNeighborSlides()` |
| **3** | **Easter Eggs & Audio Feedback** | 6 | `playCuteChime()`, `payRishwat()`, `showTepiPopup()`, `showToast()` |
| **4** | **Service Worker & Cache System** | 4 | `sw.js`, `PRECACHE_ASSETS`, cache-first fetch handler |
| **5** | **Prototype Simulator & Storage** | 2 | `switchSimSlide()`, `cacheImage()` |
| **6** | **Rishwat Modal Dialogs** | 2 | `closeRishwatPopup()`, `closeRishwatPopupDirect()` |
| **7** | **Tepi Popup Triggers** | 2 | `closeTepiPopup()`, `closeTepiPopupDirect()` |
| **8** | **Navigation & Filter Engine** | 2 | `scrollToSection()`, `filterCategory()` |
| **9** | **HSI Color Pinning Animation** | 2 | `runHsiCycle()`, `startHsiContinuousMotion()` |
| **10** | **Asset Pipeline Utilities** | 1 | `download_assets.py` |

---

## 3. Deep System Architecture

The application is structured as a zero-dependency, high-performance static client-side web application designed to run with instant responsiveness on both mobile and desktop.

```mermaid
flowchart TD
    subgraph Browser ["Client Browser Runtime"]
        HTML["index.html<br/>(Semantic DOM, Glassmorphism Cards)"]
        CSS["styles.css<br/>(Responsive Variables, Layout, Media Queries)"]
        JS["app.js<br/>(Application Controller & Event Listeners)"]
    end

    subgraph ServiceWorker ["PWA Service Worker Engine (sw.js)"]
        SW_Install["Cache Activation & Precaching"]
        SW_Fetch["Cache-First Interceptor"]
        CacheStorage[("Browser CacheStorage<br/>(hsi-portfolio-v1)")]
    end

    subgraph Subsystems ["Core Runtime Subsystems"]
        LB["Interactive Lightbox System<br/>• Keyboard Navigation<br/>• Touch Gestures (Swipes)<br/>• Predictive Preloader"]
        HSI["Continuous Color Droplet Engine<br/>• 5-Color Sequential Loop<br/>• Zero-Replay Physics<br/>• IntersectionObserver Trigger"]
        SIM["Phone Prototype Simulator<br/>• Active Tab Switching<br/>• Caregiver vs Patient Screen"]
        AUDIO["Web Audio API Synthesizer<br/>• Procedural Chimes (No MP3s)<br/>• Sine/Triangle Frequencies"]
        EE["Cultural Easter Eggs<br/>• Rishwat Bribe Modal<br/>• Tepi Canvas Popup"]
    end

    HTML --> JS
    CSS --> HTML
    JS --> LB
    JS --> HSI
    JS --> SIM
    JS --> AUDIO
    JS --> EE
    JS -.-> SW_Fetch
    SW_Fetch <--> CacheStorage
```

---

## 4. Key Subsystem Workflows

### Subsystem A: Service Worker & Offline Image Cache
To prevent slow network loads and repeated image downloads on mobile devices, a Service Worker operates as a transparent network proxy:

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Mobile Browser
    participant JS as app.js
    participant SW as sw.js (Service Worker)
    participant Cache as CacheStorage (v1)
    participant Net as Network / CDN

    User->>JS: Enters Portfolio Page
    JS->>SW: Register 'sw.js'
    SW->>Cache: Pre-cache core slides (slide_25, 41, 48, etc.)
    User->>JS: Request Image / Asset
    JS->>SW: Fetch Event
    SW->>Cache: Match Request in Cache
    alt Asset Exists in Cache (Cache Hit)
        Cache-->>SW: Return Cached Response (Instant, 0ms latency)
        SW-->>User: Render Image
    else Asset Not in Cache (Cache Miss)
        SW->>Net: Fetch from Network
        Net-->>SW: 200 OK Response
        SW->>Cache: Clone & Store in CacheStorage
        SW-->>User: Render Image
    end
```

### Subsystem B: HSI Healthcare 5-Color Pinning Engine
The color droplet system on slide 41 animates in a continuous, smooth, non-blocking sequence:

```mermaid
sequenceDiagram
    autonumber
    actor Viewport as Viewport Scroll
    participant IO as IntersectionObserver
    participant HSI as runHsiCycle()
    participant D1 as Blue (#1A49FF)
    participant D2 as White (#FAFAFA)
    participant D3 as Soft (#B4C2FA)
    participant D4 as Pale (#D8E0FF)
    participant D5 as Black (#1F1F1F)
    participant Target as Image (#hsi-target-img)

    Viewport->>IO: Section enters viewport (threshold 0.3)
    IO->>HSI: startHsiContinuousMotion()
    loop Every 4300ms Continuously
        HSI->>D1: Pop (100ms)
        HSI->>D1: Plunge into UI (800ms) & Pulse Image
        HSI->>D2: Pop (800ms)
        HSI->>D2: Plunge into UI (1500ms) & Pulse Image
        HSI->>D3: Pop (1500ms)
        HSI->>D3: Plunge into UI (2200ms) & Pulse Image
        HSI->>D4: Pop (2200ms)
        HSI->>D4: Plunge into UI (2900ms) & Pulse Image
        HSI->>D5: Pop (2900ms)
        HSI->>D5: Plunge into UI (3600ms) & Pulse Image
        HSI->>HSI: Reset all droplet positions (4150ms)
    end
    Viewport->>IO: Section leaves viewport
    IO->>HSI: stopHsiContinuousMotion() (Clears intervals & timers)
```

### Subsystem C: Predictive Lightbox & Touch Gestures
The lightbox provides native-app quality gallery browsing:
1. **Swipe Detection**: Measures `touchStartX` and `touchEndX` with a 45px threshold to trigger forward or backward navigation.
2. **Predictive Preloading**: When slide `i` is opened, `preloadNeighborSlides(i)` immediately instantiates background `new Image()` instances for slide `i - 1` and slide `i + 1`, eliminating rendering lag.
3. **Focus & Keyboard Management**: Binds `ArrowLeft`, `ArrowRight`, and `Escape` for full accessibility.

---

## 5. Web Audio API Procedural Synthesizer
Zero MP3 or WAV files are downloaded for sound effects. Instead, `playCuteChime(type)` synthesizes frequencies directly through the browser's audio hardware:
- **Pop Chime**: Generates an exponential frequency ramp from `520Hz` to `880Hz` using a `sine` oscillator over `0.15s`.
- **Success Chime**: A two-note harmonic arpeggio (`587.33Hz` D5 &rarr; `880Hz` A5) using smooth gain decay.
- **Mobile Safe**: Wrapped in an auto-resuming `AudioContext` on the first user tap to comply with mobile autoplay restrictions.

---

## 6. How to Query the Graphify Graph

You can explore the persistent knowledge graph anytime from the terminal:

```bash
# 1. Open the interactive 3D/2D force-directed knowledge graph
start graphify-out/graph.html

# 2. Open the hierarchical tree visualization
start graphify-out/GRAPH_TREE.html

# 3. Open the Mermaid callflow diagram
start graphify-out/stephanie-perez-portfolio-callflow.html

# 4. Find the shortest path between any two components
python -m graphify path "openLightbox" "PRECACHE_ASSETS"

# 5. Explain any concept or node
python -m graphify explain "runHsiCycle"

# 6. Ask semantic questions using GraphRAG BFS traversal
python -m graphify query "How does image preloading and caching work?"
```
