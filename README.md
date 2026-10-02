# Srujan Raghavendra S — Portfolio

Modern, high-performance personal portfolio for **Srujan Raghavendra S** (Associate AI Developer @ Conneqtion Group [Client: Etihad Engineering] · Ex-Bright Money).

## ✨ Key Features & Architecture

- **Tailwind CSS & Strictly Dark Mode**: Sleek dark slate developer aesthetic with responsive typography and custom micro-animations.
- **Side Bookmarks Navigation**: Minimalist horizontal indicator ticks on the right edge of the screen that light up on scroll and show section tooltips on hover.
- **Prominent Role Header**: Direct highlight of current role (*Associate AI Developer @ Conneqtion Group [Client: Etihad Engineering]*) and previous experience (*Ex-Bright Money*).
- **Horizontally Scrollable Articles**: Technical writing placed immediately after the hero section with smooth horizontal scrolling and live Medium RSS ingestion (`@srujan9712`).
- **Understandable Experience Timeline**: Clean, intuitive milestone progression:
  1. **Conneqtion Group** (Client: Etihad Engineering) — *Associate AI Developer* (June 2026 – Present, Ongoing)
  2. **Bright Money** — *Software Development Engineer – Backend Intern* (June 2025 – March 2026, 10 mos)
  3. **Subhanu Technologies** — *Software Engineer Intern* (Sept 2024 – Jan 2025, 5 mos)
  4. **BNM Institute of Technology** — *B.E. in Computer Science & Engineering* (Nov 2021 – June 2025, GPA: 9.01/10)
- **Deeply Categorized Skills**: Clear categories emphasizing proven track record across distributed systems (10M+ users), LangGraph RAG, FastAPI, Kafka, and cloud infrastructure.
- **Horizontally Scrollable Certificates Section**: Dedicated PDF certificate viewer pointing to the `certificates/` directory.
- **Live Public APIs**:
  - **GitHub API**: Automatically pulls live public repositories, language distribution, and star metrics (`SrujanRaghavendraS`).
  - **LeetCode Profile API**: Live query of solved problems count (256+ solved, Easy/Medium/Hard breakdown), global ranking, and accepted submissions list (`Srujan_Raghavendra_S`).
  - **Medium RSS Feed**: Live article ingestion via RSS-to-JSON proxy (`@srujan9712`).
- **"Ask about Srujan" Assistant**: Interactive conversational widget answering visitor questions grounded in Srujan's verified experience.
- **Embedded Résumé**: Direct link and download for `assets/Srujan_Raghavendra_Resume.pdf`.

---

## 📁 Project Layout

```text
.
├── index.html                           # Main portfolio markup with Tailwind CSS
├── css/
│   └── styles.css                       # Dark theme, side bookmarks & horizontal scroll styling
├── js/
│   ├── data.js                          # Hardcoded profile, experience, skills, projects & certs
│   └── app.js                           # Side bookmarks, live API fetchers, timeline & assistant
├── assets/
│   └── Srujan_Raghavendra_Resume.pdf    # Attached Resume PDF
├── certificates/                        # Drop PDF certificates here!
│   └── README.md
└── README.md                            # Documentation
```

---

## 🚀 Running Locally

```bash
# Option 1: Python 3
python -m http.server 8000

# Option 2: Node.js npx serve
npx serve .
```

Then open `http://localhost:8000` in your web browser.

---

## 🌐 Deploying to Vercel / GitHub Pages

This is a 100% static frontend project with zero build step:
1. **GitHub Pages**: Go to Repository Settings > Pages > Deploy from branch (`main` / root).
2. **Vercel**: Import the GitHub repository, set framework preset to **Other**, leave build command blank, and deploy.
