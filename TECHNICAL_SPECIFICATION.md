# Technical Specification: Universal AI MasterClass Platform

**Version:** 1.0.0
**Date:** 2024
**Status:** Production Ready / Proprietary

---

## 1. Executive Summary
The **Universal AI MasterClass Platform** is a client-side, single-page application (SPA) designed to provide adaptive, expert-level technical education. Unlike traditional LMS platforms, it uses a **Polymorphic AI Instructor** engine to generate curriculum, deep-dive content, and interactive responses in real-time.

The system features a browser-based architecture that requires no build step (no Webpack/Vite required for execution), utilizing modern ES Modules and Import Maps.

---

## 2. Technology Stack

### Core Framework
*   **Runtime:** Browser (ES6+ Modules)
*   **UI Library:** React 18+ (via CDN)
*   **Language:** TypeScript (Transpiled on-the-fly or pre-compiled) / JavaScript (ESNext)
*   **State Management:** React Hooks (`useState`, `useReducer`, `useContext` pattern)
*   **Routing:** Custom State-based Routing (`AppView` state)

### Styling & Design
*   **CSS Framework:** Tailwind CSS (v3.4 via CDN)
*   **Iconography:** Custom SVG Component System (Lucide-style)
*   **Effects:** Glassmorphism, CSS Grid Patterns, Backdrop Blur

### Artificial Intelligence
*   **Model:** Google Gemini 2.5 Flash
*   **SDK:** `@google/genai` (v0.1.1 via ImportMap)
*   **Pattern:** RAG-Lite (Retrieval via pre-defined context + Generation)

### Utilities
*   **PDF Generation:** `html2pdf.js`
*   **Markdown Rendering:** Custom React Markdown Parser (No external heavy libs)

---

## 3. System Architecture

### 3.1. File Structure
```
/
├── index.html            # Entry point, ImportMaps, Tailwind Config
├── index.tsx             # React Mount point
├── App.tsx               # Main Controller (Router, State, UI Layout)
├── constants.ts          # Static Data (Curriculum, Translations, Prompts)
├── types.ts              # TypeScript Interfaces (Data Models)
├── services/
│   └── geminiService.ts  # AI Abstraction Layer (API Calls, Prompts)
└── components/
    ├── LandingPage.tsx   # Marketing Front-end
    ├── ChatBubble.tsx    # Context-aware AI Assistant
    ├── MarkdownRenderer.tsx # Content display engine
    └── Icons.tsx         # SVG Icon System
```

### 3.2. Data Flow
1.  **Initialization:** `constants.ts` loads static course definitions (`COURSES`) and UI strings (`UI_STRINGS`).
2.  **User Action:** User selects a topic.
3.  **Cache Check:** App checks `contentCache` in memory.
4.  **AI Request (If Miss):** If content is missing, a request is pushed to `processingQueue`.
5.  **Queue Processor:** A `useEffect` hook monitors the queue, processing up to `MAX_CONCURRENT_REQUESTS` (2) items simultaneously.
6.  **Generation:** `geminiService.ts` calls Gemini API with specific "Persona" and "Task" prompts.
7.  **Rendering:** Result is stored in `contentCache` and rendered via `MarkdownRenderer`.

---

## 4. AI Engineering & Prompt Strategy

### 4.1. Polymorphic Instructor Persona
The system does not use a single system prompt. Instead, it dynamically generates a persona based on the active course.

**Function:** `getInstructorPersona(courseTitle, language)`

*   **Logic:**
    *   If Course == "Cloudflare" -> Persona: "Senior Network Architect"
    *   If Course == "Data Science" -> Persona: "Academic Data Scientist"
    *   If Course == "B2B Sales" -> Persona: "Enterprise Sales Executive"

### 4.2. Modes of Operation
1.  **Standard Tutorial:** Generates structured documentation with "Executive Summary", "Technical Architecture", and "Code Examples".
2.  **Deep Dive (Expert Mode):** Triggered by the microscope icon.
    *   **Prompt Injection:** "Focus on internals, edge cases, production pitfalls, and performance trade-offs. Ignore basic definitions."
3.  **Curriculum Expansion:** Triggered by the wand icon.
    *   **Task:** Analyze existing topics -> Find missing advanced concepts -> Return JSON Array of new topics.

### 4.3. Localization
The AI is strictly bound to the `language` state ('tr' | 'en').
*   **TR:** Output is Turkish, persona is culturally adapted (e.g., referencing local regulations like KVKK/MASAK).
*   **EN:** Output is English, persona references global standards (GDPR/FCC).

---

## 5. Key Algorithms & Logic

### 5.1. Async Queue System
To prevent browser freezing and API rate limiting:
*   **State:** `processingQueue` (Array of pending topics)
*   **State:** `activeRequests` (Array of currently processing IDs)
*   **Logic:**
    ```typescript
    if (queue.length > 0 && activeRequests.length < 2) {
       pop item from queue;
       add to activeRequests;
       call API;
       onSuccess -> update Cache, remove from activeRequests;
    }
    ```

### 5.2. Caching Strategy
*   **Level 1 (Memory):** `STATIC_TUTORIALS` in `constants.ts` acts as the "Zero Latency" layer for popular topics.
*   **Level 2 (Runtime):** Generated content is stored in `contentCache` state. It persists as long as the session is active (or until page refresh).
*   **Invalidation:** "Regenerate" button forces a bypass of the cache.

### 5.3. Contextual Chat
The Chat Bubble is not a generic chatbot. It injects the **currently visible content** into the context window.
*   **Prompt:** `[SYSTEM: You are {Persona}] + [CONTEXT: User is reading {CurrentContent}] + [USER: {Question}]`

---

## 6. UI/UX Design System

### 6.1. Visual Language
*   **Theme:** Dark Mode (Absolute)
*   **Background:** `#0d0d0d` with CSS Radial Gradients and Grid Patterns.
*   **Accents:** Dynamic `activeCourse.themeColor` (Orange for Cloudflare, Blue for TypeScript, etc.).
*   **Typography:** Inter (UI) + Fira Code (Code blocks).

### 6.2. Component Hierarchy
*   **LandingPage:** Hero section, Feature grid, Course catalog cards.
*   **Sidebar:**
    *   **Course Selector:** Dropdown to switch contexts.
    *   **Curriculum Tree:** Collapsible categories with status indicators (Completed, Cached, Queued).
    *   **Settings:** Global controls (Reset, Language, Regenerate All).
*   **Main Content:**
    *   **Overview:** Grid view of modules when no topic is selected.
    *   **Reader:** Markdown content area with PDF export and Deep Dive controls.

---

## 7. Data Models (Types)

```typescript
interface Course {
  id: string;
  title: string; // Translatable key
  themeColor: string; // Hex code
  curriculum: Category[];
}

interface Category {
  id: string;
  title: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface GeneratedContent {
  title: string;
  content: string; // Markdown
  language: 'tr' | 'en';
}
```

---

## 8. Deployment Considerations

*   **Environment Variables:** Requires `API_KEY` (Google Gemini) to be injected at runtime or build time.
*   **CORS:** Image proxying in `html2pdf` requires CORS-enabled endpoints if external images are used.
*   **Persistence:** `localStorage` is used for `completedTopics` (read status), but not for heavy content cache (to avoid QuotaExceeded errors).

---

**End of Specification**
