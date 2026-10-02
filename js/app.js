/**
 * Srujan Raghavendra S — Portfolio Application Logic
 * Integrates:
 *  - Hardcoded resume & portfolio data (zero spreadsheet / excel dependency)
 *  - Prominent role badge: Associate AI Developer @ Conneqtion Group (Client: Etihad Engineering) · Ex-Bright Money
 *  - Horizontally scrollable Technical Articles immediately after hero
 *  - Floating Side Bookmarks Navigation (transparent, overlaps content, hover tooltips)
 *  - Smart, Intuitive Experience Timeline (Visual Chronology Gantt + Connected Spine Milestones)
 *  - Deeply categorized Skills section with proven track record
 *  - Horizontally scrollable Certificates section (PDF ready)
 *  - Live Public APIs (GitHub, Medium RSS, LeetCode stats)
 *  - "Ask about Srujan" Knowledge Assistant
 */

(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA || {};
  const prof = data.profile || {};

  /* -------------------------------------------------------------------------- */
  /* Helpers                                                                    */
  /* -------------------------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  /* -------------------------------------------------------------------------- */
  /* Side Bookmarks Navigation (Floating, Transparent, Overlapping Content)     */
  /* -------------------------------------------------------------------------- */
  function initSideBookmarks() {
    const bookmarkNav = $("#side-bookmarks");
    if (!bookmarkNav) return;

    const sections = [
      { id: "top", label: "Intro & Overview" },
      { id: "writing", label: "Technical Articles" },
      { id: "experience", label: "Experience Timeline" },
      { id: "skills", label: "Skills & Architecture" },
      { id: "certificates", label: "Certifications" },
      { id: "projects", label: "Featured Projects" },
      { id: "github-live", label: "Live GitHub" },
      { id: "leetcode-live", label: "Live LeetCode" },
      { id: "research", label: "Research & IEEE" },
      { id: "contact", label: "Get in Touch" }
    ];

    bookmarkNav.innerHTML = "";

    sections.forEach((sec, idx) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = `bookmark-item ${idx === 0 ? "is-active" : ""}`;
      item.dataset.target = sec.id;
      item.setAttribute("aria-label", `Navigate to ${sec.label}`);

      item.innerHTML = `
        <span class="bookmark-tooltip">${sec.label}</span>
        <span class="bookmark-line"></span>
      `;

      item.addEventListener("click", () => {
        const el = document.getElementById(sec.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });

      bookmarkNav.appendChild(item);
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              $$(".bookmark-item").forEach((btn) => {
                if (btn.dataset.target === activeId) {
                  btn.classList.add("is-active");
                } else {
                  btn.classList.remove("is-active");
                }
              });
            }
          });
        },
        { rootMargin: "-35% 0px -40% 0px" }
      );

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.observe(el);
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Render Profile & Hero Details                                              */
  /* -------------------------------------------------------------------------- */
  function renderProfile() {
    $("#hero-name").textContent = prof.name;
    $("#hero-headline").textContent = prof.headline;
    $("#hero-about").textContent = prof.about;

    const roleLineEl = $("#hero-role-line");
    if (roleLineEl) {
      roleLineEl.innerHTML = `
        <span class="inline-flex items-center gap-2 flex-wrap">
          <span class="w-5 h-5 rounded bg-white p-0.5 inline-flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
            <img src="assets/conneqtiongroup.jpg" alt="Conneqtion" class="w-full h-full object-contain" />
          </span>
          <span>Associate AI Developer @ Conneqtion Group (Client: Etihad Engineering)</span>
          <span class="text-slate-500">·</span>
          <span class="w-5 h-5 rounded bg-white p-0.5 inline-flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
            <img src="assets/brightmoney.jpg" alt="Bright Money" class="w-full h-full object-contain" />
          </span>
          <span class="text-amber-300">Ex-Bright Money</span>
        </span>
      `;
    }

    const factNowEl = $("#fact-now");
    if (factNowEl) {
      factNowEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5">
          <span class="w-4 h-4 rounded bg-white p-0.5 inline-flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
            <img src="assets/conneqtiongroup.jpg" alt="Conneqtion" class="w-full h-full object-contain" />
          </span>
          <span>Conneqtion (Client: Etihad)</span>
        </span>
      `;
    } else {
      $("#fact-now").textContent = prof.currently;
    }
    $("#fact-focus").textContent = prof.focus;
    $("#fact-location").textContent = prof.location;
    $("#fact-opento").textContent = prof.openTo;

    $("#cta-email").href = `mailto:${prof.email}`;
    $("#cta-resume").href = prof.resumeUrl;
    $("#nav-resume").href = prof.resumeUrl;
    $("#footer-email").href = `mailto:${prof.email}`;
    $("#footer-email").textContent = prof.email;
    $("#footer-phone").href = `tel:${prof.phone.replace(/[^+\d]/g, "")}`;
    $("#footer-phone").textContent = prof.phone;

    $("#contact-open-to").textContent = `Currently open to ${prof.openTo.toLowerCase()}.`;
    $("#footer-year").textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------------------- */
  /* Technical Articles (Immediately after Hero, Horizontally Scrollable)       */
  /* -------------------------------------------------------------------------- */
  async function loadLiveMedium() {
    const container = $("#medium-articles-container");
    if (!container) return;

    let articles = data.articlesFallback || [];

    try {
      const feedUrl = `https://medium.com/feed/@${prof.mediumUsername}`;
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.status === "ok" && json.items && json.items.length) {
          articles = json.items.map((item) => {
            const tmp = document.createElement("div");
            tmp.innerHTML = item.description || "";
            const cleanText = tmp.textContent || tmp.innerText || "";
            const snippet = cleanText.slice(0, 160).trim() + "...";

            return {
              title: item.title,
              date: item.pubDate,
              pubDateFormatted: formatDate(item.pubDate),
              readMinutes: 5,
              categories: item.categories || ["backend", "architecture"],
              url: item.link,
              summary: snippet
            };
          });
        }
      }
    } catch (e) {
      console.log("Using cached Medium fallback:", e.message);
    }

    container.innerHTML = articles.map((art) => {
      const tags = (art.categories || []).slice(0, 3).map(
        (c) => `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">#${c}</span>`
      ).join(" ");

      return `
        <article class="w-[320px] sm:w-[380px] border border-slate-800 rounded-xl p-5 bg-[#131d33]/90 shadow-md hover:border-sky-500/50 transition-all flex flex-col justify-between flex-shrink-0">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <time>${art.pubDateFormatted || formatDate(art.date)}</time>
              <span class="text-sky-400 font-semibold">${art.readMinutes ? art.readMinutes + " min read" : "Medium"}</span>
            </div>
            <h3 class="text-base font-bold text-white mb-2 leading-snug hover:text-sky-400 transition-colors">
              <a href="${art.url}" target="_blank" rel="noopener">${art.title}</a>
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">${art.summary}</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
            <div class="flex flex-wrap gap-1">${tags}</div>
            <a href="${art.url}" target="_blank" rel="noopener" class="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1 font-semibold">
              Read on Medium ↗
            </a>
          </div>
        </article>
      `;
    }).join("");

    const scrollLeftBtn = $("#articles-scroll-left");
    const scrollRightBtn = $("#articles-scroll-right");
    if (scrollLeftBtn && scrollRightBtn) {
      scrollLeftBtn.onclick = () => container.scrollBy({ left: -360, behavior: "smooth" });
      scrollRightBtn.onclick = () => container.scrollBy({ left: 360, behavior: "smooth" });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Experience Trace Timeline (Collapsed Designation & Company + X-Axis       */
  /* Horizontal Timeline Bar; Detailed Cards Appear on Click)                  */
  /* -------------------------------------------------------------------------- */
  function renderExperience() {
    const traceContainer = $("#experience-trace");
    if (!traceContainer) return;

    const expList = data.experience || [];
    if (!expList.length) return;

    // Timeline Configuration: 2021 to 2027 (72 months total)
    const startYear = 2021;
    const endYear = 2027;
    const totalMonths = (endYear - startYear) * 12;

    function parseDateToMonths(str, isEnd = false) {
      if (!str || str.toLowerCase() === "present" || str.toLowerCase() === "now") {
        return (2026.85 - startYear) * 12; // Oct 2026
      }
      const parts = str.split("-");
      const y = parseInt(parts[0], 10);
      const m = parts[1] ? parseInt(parts[1], 10) : (isEnd ? 12 : 1);
      return (y - startYear) * 12 + m;
    }

    const tickYears = [2021, 2022, 2023, 2024, 2025, 2026, "Now"];

    let html = `
      <!-- Top X-Axis Ruler Header -->
      <div class="trace-axis">
        <div class="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
          Role & Company
        </div>
        <div class="trace-ticks">
          ${tickYears.map((yr, i) => {
            const pct = (i / (tickYears.length - 1)) * 100;
            const isNow = yr === "Now";
            return `
              <span class="${isNow ? 'now' : ''}" style="left: ${pct}%;">
                ${yr}
              </span>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Experience Rows -->
      <div class="space-y-3">
    `;

    expList.forEach((exp, idx) => {
      const startM = parseDateToMonths(exp.start, false);
      const endM = parseDateToMonths(exp.end, true);
      let leftPct = Math.max(0, Math.min(94, (startM / totalMonths) * 100));
      let widthPct = Math.max(7, ((endM - startM) / totalMonths) * 100);
      if (leftPct + widthPct > 100) widthPct = 100 - leftPct;

      const logoHtml = exp.logo
        ? `<div class="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-700/60 overflow-hidden">
             <img src="${exp.logo}" alt="${exp.company} logo" class="w-full h-full object-contain" />
           </div>`
        : `<div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold font-mono text-xs shadow-sm border" style="background: ${exp.color}18; color: ${exp.color}; border-color: ${exp.color}44">
             ${exp.company.charAt(0)}
           </div>`;

      const clientBadge = exp.client
        ? `<span class="span-client-tag">Client: ${exp.client}</span>`
        : "";

      const currentBadge = exp.isCurrent
        ? `<span class="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold ml-1.5">Ongoing · 5 mos</span>`
        : "";

      const stackBadges = (exp.stack || []).map(
        (t) => `<span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700/80">${t}</span>`
      ).join("");

      const tasksHtml = (exp.tasks || []).map((t) => `
        <div class="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
            <h5 class="text-sm font-bold text-white">${t.title}</h5>
            ${t.metrics ? `<span class="text-[11px] font-mono px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30 font-semibold">${t.metrics}</span>` : ""}
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${t.detail}</p>
        </div>
      `).join("");

      // Clean short duration label (e.g. "5 mos (Ongoing)", "10 mos", "5 mos", "4 yrs")
      let shortDur = exp.duration;
      if (exp.duration.includes("(") && exp.duration.includes(")")) {
        const m = exp.duration.match(/\((.*?)\)/);
        if (m) {
          shortDur = exp.isCurrent ? `${m[1]} (Ongoing)` : m[1];
        }
      }

      // Duration label positioning (avoid right edge clipping)
      const isNearRightEdge = (leftPct + widthPct) > 75;
      const durPosStyle = isNearRightEdge
        ? `right: calc(100% - ${leftPct}% + 12px);`
        : `left: ${leftPct + widthPct}%; margin-left: 10px;`;

      html += `
        <div class="span-row" id="trace-row-${exp.id}">
          <!-- Clickable Row: Displays Designation & Company on Left + X-Axis Timeline Bar on Right -->
          <button type="button" class="span-toggle" aria-expanded="false" aria-controls="trace-body-${exp.id}">
            <!-- Left Column: Designation & Company Name -->
            <div class="span-label">
              <svg class="span-caret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
              ${logoHtml}
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="span-org">${exp.company}</span>
                  ${clientBadge}
                  ${currentBadge}
                </div>
                <span class="span-role">${exp.role}</span>
              </div>
            </div>

            <!-- Right Column: X-Axis Horizontal Timeline Bar showing duration worked -->
            <div class="span-track">
              <!-- Background Grid Lines aligned with top years -->
              ${tickYears.map((_, i) => {
                const pct = (i / (tickYears.length - 1)) * 100;
                return `<div class="grid ${i === tickYears.length - 1 ? 'now' : ''}" style="left: ${pct}%;"></div>`;
              }).join("")}

              <!-- The Horizontal Timeline Bar -->
              <div class="span-bar" style="left: ${leftPct}%; width: ${widthPct}%; background-color: ${exp.color}; box-shadow: 0 0 10px ${exp.color}66;"></div>
              
              <!-- Duration Label -->
              <span class="span-dur" style="${durPosStyle}">${shortDur}</span>
            </div>
          </button>

          <!-- Expandable Detailed Card: Appears only when the user clicks the row -->
          <div class="span-body hidden" id="trace-body-${exp.id}">
            <!-- Left Details Column -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 pb-3 border-b border-slate-800/80">
                ${logoHtml}
                <div class="min-w-0">
                  <span class="text-sm font-bold text-white block leading-tight truncate">${exp.company}</span>
                  <span class="text-xs text-sky-400 font-mono block truncate">${exp.role}</span>
                </div>
              </div>

              <div>
                <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Duration & Location</span>
                <span class="text-xs font-mono font-semibold text-slate-200 block mt-0.5">${exp.duration}</span>
                <span class="text-xs text-slate-400 font-mono block mt-0.5">📍 ${exp.location}</span>
              </div>

              <div>
                <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Technologies & Architecture</span>
                <div class="flex flex-wrap gap-1.5">${stackBadges}</div>
              </div>
            </div>

            <!-- Right Details Column -->
            <div class="space-y-4">
              <div>
                <span class="text-[10px] font-mono text-sky-400 uppercase tracking-wider block mb-1">Role Summary</span>
                <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${exp.summary}</p>
              </div>

              <div>
                <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5">Key Deliverables & Production Impact</span>
                <div class="space-y-2.5">${tasksHtml}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    traceContainer.innerHTML = html;

    // Attach click listeners to expand/collapse cards
    traceContainer.querySelectorAll(".span-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = btn.closest(".span-row");
        const body = row.querySelector(".span-body");
        const isOpen = row.classList.contains("is-open");

        if (isOpen) {
          row.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          body.classList.add("hidden");
        } else {
          row.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          body.classList.remove("hidden");
        }
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Categorized Skills Section (Proven Track Across Full Stack)                */
  /* -------------------------------------------------------------------------- */
  function renderSkills() {
    const container = $("#skills-stack-grid");
    if (!container) return;
    container.innerHTML = "";

    const layers = data.skillsByLayer || [];
    layers.forEach((layer) => {
      const box = document.createElement("div");
      box.className = "border border-slate-800 rounded-xl p-5 bg-[#131d33]/80 shadow-sm hover:border-sky-500/40 transition-colors flex flex-col justify-between";

      const pills = layer.skills.map(
        (s) => `<span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-sky-500 transition-colors">${s}</span>`
      ).join("");

      box.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-sky-400"></span>
              ${layer.layer}
            </h3>
          </div>
          <p class="text-[11px] font-mono text-slate-400 mb-3">${layer.description || ""}</p>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">${pills}</div>
      `;

      container.appendChild(box);
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Horizontally Scrollable Certificates Section (PDF Ready)                   */
  /* -------------------------------------------------------------------------- */
  function renderCertificates() {
    const container = $("#certificates-container");
    if (!container) return;
    container.innerHTML = "";

    const certs = data.certificates || [];
    certs.forEach((cert) => {
      const card = document.createElement("div");
      card.className = "w-[320px] sm:w-[380px] border border-slate-800 rounded-xl p-5 bg-[#131d33]/90 shadow-md flex flex-col justify-between flex-shrink-0 hover:border-amber-500/50 transition-all";

      const tagsHtml = (cert.tags || []).slice(0, 3).map(
        (t) => `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300/90 border border-slate-700">#${t}</span>`
      ).join(" ");

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg>
              <span>Verified Credential${cert.length ? ' · ' + cert.length : ''}</span>
            </span>
            <span class="text-xs font-mono text-slate-400">${cert.date}</span>
          </div>

          <h3 class="text-base font-bold text-white mb-1.5 leading-snug hover:text-amber-300 transition-colors">
            <a href="${cert.pdfFile}" target="_blank" rel="noopener">${cert.title}</a>
          </h3>
          <p class="text-xs text-sky-300 font-mono mb-2">${cert.issuer}</p>
          <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">${cert.description}</p>
          
          <div class="flex flex-wrap gap-1 mb-2">${tagsHtml}</div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener" class="text-[11px] font-mono text-slate-400 hover:text-sky-300 flex items-center gap-1 truncate" title="Verify Online">
            <span>Verify Online ↗</span>
          </a>
          <a href="${cert.pdfFile}" target="_blank" rel="noopener" class="text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all flex items-center gap-1.5 font-semibold flex-shrink-0">
            <span>View PDF</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      `;

      container.appendChild(card);
    });

    const scrollLeftBtn = $("#certs-scroll-left");
    const scrollRightBtn = $("#certs-scroll-right");
    if (scrollLeftBtn && scrollRightBtn) {
      scrollLeftBtn.onclick = () => container.scrollBy({ left: -360, behavior: "smooth" });
      scrollRightBtn.onclick = () => container.scrollBy({ left: 360, behavior: "smooth" });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Render Featured Projects                                                   */
  /* -------------------------------------------------------------------------- */
  function renderProjects() {
    const container = $("#featured-projects-list");
    if (!container) return;
    container.innerHTML = "";

    const projects = data.projects || [];
    projects.forEach((proj) => {
      const card = document.createElement("article");
      card.className = "border border-slate-800 rounded-xl p-6 bg-[#131d33]/80 shadow-sm hover:border-sky-500/50 transition-all flex flex-col justify-between";

      const highlightsHtml = (proj.highlights || []).map(
        (h) => `<li class="text-xs text-slate-300 leading-relaxed">• ${h}</li>`
      ).join("");

      const techHtml = (proj.tech || []).map(
        (t) => `<span class="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">${t}</span>`
      ).join("");

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">${proj.badge || "Project"}</span>
            <div class="flex items-center gap-3">
              ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener" class="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1 font-semibold">Open ↗</a>` : ""}
              ${proj.repo ? `<a href="${proj.repo}" target="_blank" rel="noopener" class="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1">GitHub ↗</a>` : ""}
            </div>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">${proj.title}</h3>
          <p class="text-sm text-slate-300 mb-4">${proj.summary}</p>
          <ul class="space-y-1.5 mb-5">${highlightsHtml}</ul>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">${techHtml}</div>
      `;

      container.appendChild(card);
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Live Public API 1: GitHub Repositories & Profile Stats                     */
  /* -------------------------------------------------------------------------- */
  async function loadLiveGitHub() {
    const repoContainer = $("#live-github-repos");
    const metaStats = $("#github-meta-stats");
    if (!repoContainer) return;

    try {
      const userRes = await fetch(`https://api.github.com/users/${prof.githubUsername}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        if (metaStats) {
          metaStats.innerHTML = `
            <div class="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span><strong>${userData.public_repos}</strong> Public Repos</span>
              <span>•</span>
              <span><strong>${userData.followers}</strong> Followers</span>
              <span>•</span>
              <a href="${userData.html_url}" target="_blank" rel="noopener" class="text-sky-400 hover:underline font-semibold">@${userData.login} ↗</a>
            </div>
          `;
        }
      }

      const reposRes = await fetch(`https://api.github.com/users/${prof.githubUsername}/repos?sort=updated&per_page=6`);
      if (!reposRes.ok) throw new Error("GitHub repos fetch error");
      const repos = await reposRes.json();

      repoContainer.innerHTML = "";
      repos.forEach((r) => {
        const col = document.createElement("div");
        col.className = "border border-slate-800 rounded-lg p-4 bg-[#131d33]/60 hover:border-slate-700 transition-colors flex flex-col justify-between";

        col.innerHTML = `
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <a href="${r.html_url}" target="_blank" rel="noopener" class="font-bold text-sm text-sky-400 hover:underline truncate">${r.name}</a>
              <span class="text-[11px] font-mono text-slate-400 flex items-center gap-1">★ ${r.stargazers_count}</span>
            </div>
            <p class="text-xs text-slate-400 line-clamp-2 mb-3">${r.description || "Public repository on GitHub."}</p>
          </div>
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
            <span>${r.language || "Code"}</span>
            <span>Updated ${formatDate(r.pushed_at)}</span>
          </div>
        `;
        repoContainer.appendChild(col);
      });
    } catch (err) {
      console.warn("Live GitHub fetch note:", err.message);
      repoContainer.innerHTML = `
        <div class="col-span-full p-4 rounded-lg bg-slate-800/40 text-center text-xs font-mono text-slate-400">
          Showing profile link: <a href="${prof.github}" target="_blank" class="text-sky-400 underline">${prof.github}</a>
        </div>
      `;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Live Public API 2: LeetCode Stats                                          */
  /* -------------------------------------------------------------------------- */
  async function loadLiveLeetCode() {
    const totalEl = $("#leetcode-total-solved");
    const easyEl = $("#leetcode-easy-solved");
    const medEl = $("#leetcode-med-solved");
    const hardEl = $("#leetcode-hard-solved");
    const rankEl = $("#leetcode-ranking");
    const recentList = $("#leetcode-recent-list");
    const easyBar = $("#leetcode-easy-bar");
    const medBar = $("#leetcode-med-bar");
    const hardBar = $("#leetcode-hard-bar");

    let stats = {
      totalSolved: 256,
      easySolved: 147,
      totalEasy: 968,
      mediumSolved: 95,
      totalMedium: 2122,
      hardSolved: 14,
      totalHard: 979,
      ranking: "633,782",
      recent: [
        { title: "LRU Cache", status: "Accepted", lang: "Python3" },
        { title: "Container With Most Water", status: "Accepted", lang: "Python3" },
        { title: "Merge Intervals", status: "Accepted", lang: "Python3" },
        { title: "Insert Interval", status: "Accepted", lang: "Python3" },
        { title: "Find Median from Data Stream", status: "Accepted", lang: "Python3" },
        { title: "Minimum Window Substring", status: "Accepted", lang: "Python3" },
        { title: "3Sum", status: "Accepted", lang: "Python3" }
      ]
    };

    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${prof.leetcodeUsername}`);
      if (res.ok) {
        const json = await res.json();
        if (json.totalSolved) {
          stats.totalSolved = json.totalSolved;
          stats.easySolved = json.easySolved;
          stats.totalEasy = json.totalEasy || 968;
          stats.mediumSolved = json.mediumSolved;
          stats.totalMedium = json.totalMedium || 2122;
          stats.hardSolved = json.hardSolved;
          stats.totalHard = json.totalHard || 979;
          stats.ranking = json.ranking ? json.ranking.toLocaleString() : stats.ranking;
          if (json.recentSubmissions && json.recentSubmissions.length) {
            stats.recent = json.recentSubmissions
              .filter((s) => s.statusDisplay === "Accepted")
              .slice(0, 6)
              .map((s) => ({ title: s.title, status: "Accepted", lang: s.lang || "Python3" }));
          }
        }
      }
    } catch (e) {
      console.log("Using cached LeetCode stats fallback:", e.message);
    }

    if (totalEl) totalEl.textContent = stats.totalSolved;
    if (easyEl) easyEl.textContent = `${stats.easySolved} / ${stats.totalEasy}`;
    if (medEl) medEl.textContent = `${stats.mediumSolved} / ${stats.totalMedium}`;
    if (hardEl) hardEl.textContent = `${stats.hardSolved} / ${stats.totalHard}`;
    if (rankEl) rankEl.textContent = `#${stats.ranking}`;

    if (easyBar) easyBar.style.width = `${Math.min(100, (stats.easySolved / 250) * 100)}%`;
    if (medBar) medBar.style.width = `${Math.min(100, (stats.mediumSolved / 250) * 100)}%`;
    if (hardBar) hardBar.style.width = `${Math.min(100, (stats.hardSolved / 50) * 100)}%`;

    if (recentList) {
      recentList.innerHTML = stats.recent.map((item) => `
        <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 last:border-none">
          <span class="font-medium text-slate-200 truncate pr-2">${item.title}</span>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="font-mono text-[10px] text-slate-400">${item.lang}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold">✓ Solved</span>
          </div>
        </div>
      `).join("");
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Render Research & Publications                                             */
  /* -------------------------------------------------------------------------- */
  function renderPublications() {
    const container = $("#publications-list");
    if (!container) return;
    container.innerHTML = "";

    const pubs = data.publications || [];
    pubs.forEach((pub) => {
      const card = document.createElement("div");
      card.className = "border border-slate-800 rounded-xl p-6 bg-[#131d33]/80 shadow-sm";

      card.innerHTML = `
        <div class="flex items-center justify-between text-xs font-mono text-sky-400 mb-2">
          <span>${pub.venue}</span>
          <span class="text-emerald-400 font-semibold">Peer-Reviewed Conference Paper</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2">${pub.title}</h3>
        <p class="text-xs text-slate-400 mb-3">${pub.authors}</p>
        <p class="text-xs text-slate-300 leading-relaxed mb-4">${pub.abstract}</p>
        <div class="flex items-center gap-4 text-xs font-mono">
          <a href="${pub.url}" target="_blank" rel="noopener" class="text-sky-400 hover:underline font-semibold">View Paper on IEEE Xplore ↗</a>
          <span class="text-slate-500">DOI: ${pub.doi}</span>
        </div>
      `;

      container.appendChild(card);
    });
  }

  /* -------------------------------------------------------------------------- */
  /* "Ask about Srujan" Assistant Modal                                         */
  /* -------------------------------------------------------------------------- */
  function initAssistant() {
    const launchBtn = $("#chat-launch-btn");
    const modal = $("#chat-modal");
    const closeBtn = $("#chat-close-btn");
    const log = $("#chat-log");
    const form = $("#chat-form");
    const input = $("#chat-input");
    const suggestions = $("#chat-suggestions");

    if (!launchBtn || !modal) return;

    const SUGGESTED_QUESTIONS = [
      "What is his role at Conneqtion Group & Etihad Engineering?",
      "Tell me about his work at Bright Money & Subhanu Technologies",
      "Tell me about his LangGraph Agentic Hiring project",
      "What are his core technical skills across the stack?",
      "How can I contact or interview Srujan?"
    ];

    function openModal() {
      modal.classList.remove("hidden");
      if (!log.children.length) {
        addMessage("bot", `Hello! I'm Srujan's portfolio assistant. Ask me anything about his backend experience at <strong>Conneqtion Group (Client: Etihad Engineering)</strong>, <strong>Bright Money</strong>, <strong>Subhanu Technologies</strong>, or his skills and projects.`);
        renderSuggestions();
      }
      input.focus();
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    launchBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });

    function renderSuggestions() {
      if (!suggestions) return;
      suggestions.innerHTML = "";
      SUGGESTED_QUESTIONS.forEach((q) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-xs font-mono text-left px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors";
        btn.textContent = q;
        btn.onclick = () => askQuestion(q);
        suggestions.appendChild(btn);
      });
    }

    function addMessage(role, html) {
      const msg = document.createElement("div");
      msg.className = `p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
        role === "user"
          ? "ml-auto bg-sky-600 text-white rounded-tr-none font-medium"
          : "mr-auto bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
      }`;
      msg.innerHTML = html;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }

    function askQuestion(q) {
      if (!q.trim()) return;
      addMessage("user", q);
      input.value = "";
      if (suggestions) suggestions.innerHTML = "";

      const typingEl = document.createElement("div");
      typingEl.className = "mr-auto p-3 rounded-xl text-xs bg-slate-800 text-slate-400 rounded-tl-none";
      typingEl.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
      log.appendChild(typingEl);
      log.scrollTop = log.scrollHeight;

      setTimeout(() => {
        typingEl.remove();
        const answer = answerFromKnowledge(q);
        addMessage("bot", answer);
      }, 350);
    }

    function answerFromKnowledge(q) {
      const lower = q.toLowerCase();

      if (lower.includes("conneqtion") || lower.includes("etihad") || lower.includes("aviation") || lower.includes("manual")) {
        return `At <strong>Conneqtion Group</strong> (Client: <strong>Etihad Engineering</strong>), Srujan is an <strong>Associate AI Developer</strong> where he:
        <ul class="list-disc ml-4 mt-1 space-y-1">
          <li>Architected the document version control backend for aviation maintenance manuals on OCI VMs with FastAPI, Oracle ATP, and Oracle WCC.</li>
          <li>Engineered a <strong>LangGraph RAG assistant</strong> with MMR retrieval, prompt caching, and incremental vector re-indexing into PostgreSQL (pgvector).</li>
          <li>Migrated <strong>1.5 TB+</strong> of manuals to Oracle WCC with OCR search in OpenSearch.</li>
          <li>Built licensing for <strong>AI Watchtower</strong> monitoring deployed in 3+ customer tenancies.</li>
        </ul>`;
      }

      if (lower.includes("bright") || lower.includes("kafka") || lower.includes("fintech") || lower.includes("scale") || lower.includes("intern")) {
        return `At <strong>Bright Money</strong> (AI-Driven Consumer FinTech), Srujan was an <strong>SDE Backend Intern</strong>:
        <ul class="list-disc ml-4 mt-1 space-y-1">
          <li>Architected high-scale event-driven notification pipelines on <strong>Apache Kafka, Celery & Redis</strong> reaching <strong>5M+ and 10M+ users</strong> (+20% re-engagement).</li>
          <li>Rebuilt the Rent Reporting credit-score product supporting <strong>~40k+ monthly users</strong> with AWS Glue ETL jobs.</li>
          <li>Migrated LLM features from async runtime inference to a <strong>Feature Store architecture</strong>.</li>
          <li>Led backend planning for Rent Reporting opt-out experiment with caching and polling for zero funnel breakage.</li>
          <li>Managed privacy policy migration for <strong>1.4 million customers</strong> and shipped 10+ production releases with Jenkins and GitHub Actions.</li>
        </ul>`;
      }

      if (lower.includes("subhanu") || lower.includes("poc")) {
        return `At <strong>Subhanu Technologies</strong>, Srujan worked as a <strong>Software Engineer Intern</strong> (Sep 2024 – Jan 2025):
        <ul class="list-disc ml-4 mt-1 space-y-1">
          <li>Actively developed backend REST APIs using <strong>FastAPI</strong> with async handlers.</li>
          <li>Contributed to High-Level Design (HLD), System Level Design (SLD), and comprehensive OpenAPI documentation.</li>
          <li>Built proof-of-concept services for electronic beginners and developers.</li>
        </ul>`;
      }

      if (lower.includes("hiring") || lower.includes("agent") || lower.includes("langgraph") || lower.includes("project")) {
        return `Srujan built an <strong>Agentic Hiring Workflow</strong> using Python, LangGraph, LangChain, FastAPI, and RAG. A supervisor agent orchestrates specialized sub-agents to analyze 100+ resumes, cross-examine candidate GitHub/LinkedIn profiles, predict salary benchmarks, and provide HR with an interactive conversational reasoning layer.`;
      }

      if (lower.includes("skill") || lower.includes("stack") || lower.includes("technolog")) {
        return `Srujan has a proven track record across the stack:
        <ul class="list-disc ml-4 mt-1 space-y-1">
          <li><strong>Languages & Core:</strong> Python, C, C++, SQL, JavaScript</li>
          <li><strong>Backend Frameworks:</strong> FastAPI, Django, Flask, Express.js, REST APIs</li>
          <li><strong>AI & Agents:</strong> LangGraph, LangChain, RAG, pgvector, MMR, OCR</li>
          <li><strong>Distributed Systems:</strong> Apache Kafka, Celery, Redis, State Machines</li>
          <li><strong>Databases:</strong> PostgreSQL, Oracle ATP, MongoDB, Oracle WCC, OpenSearch</li>
          <li><strong>Cloud & DevOps:</strong> OCI, AWS (EC2, Glue, RDS, VPC, S3), Docker, Jenkins, CI/CD</li>
        </ul>`;
      }

      if (lower.includes("leetcode") || lower.includes("dsa") || lower.includes("problem") || lower.includes("algorithm")) {
        return `Srujan has solved <strong>256+ LeetCode problems</strong> (147 Easy, 95 Medium, 14 Hard) focusing on distributed systems patterns, LRU caches, interval management, dynamic programming, and data structures. You can check his live profile at <a href="${prof.leetcode}" target="_blank" class="text-sky-400 underline font-semibold">leetcode.com/u/Srujan_Raghavendra_S</a>.`;
      }

      if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("hire") || lower.includes("reach")) {
        return `You can reach Srujan directly via:
        <ul class="list-disc ml-4 mt-1 space-y-1">
          <li><strong>Email:</strong> <a href="mailto:${prof.email}" class="text-sky-400 underline">${prof.email}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${prof.phone.replace(/[^+\d]/g, "")}" class="text-sky-400 underline">${prof.phone}</a></li>
          <li><strong>LinkedIn:</strong> <a href="${prof.linkedin}" target="_blank" class="text-sky-400 underline">linkedin.com/in/srujan-raghavendra-s</a></li>
          <li><strong>GitHub:</strong> <a href="${prof.github}" target="_blank" class="text-sky-400 underline">github.com/SrujanRaghavendraS</a></li>
        </ul>`;
      }

      return `Srujan Raghavendra S is an Associate AI Developer at <strong>Conneqtion Group (Client: Etihad Engineering)</strong> and Ex-<strong>Bright Money</strong>, specializing in Python, FastAPI, Django, LangGraph RAG, Kafka, PostgreSQL, and OCI/AWS cloud architecture. Feel free to contact him at <a href="mailto:${prof.email}" class="text-sky-400 underline">${prof.email}</a>!`;
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        askQuestion(input.value);
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Boot                                                                       */
  /* -------------------------------------------------------------------------- */
  function init() {
    initSideBookmarks();
    renderProfile();
    renderExperience();
    renderSkills();
    renderCertificates();
    renderProjects();
    renderPublications();
    initAssistant();

    // Fetch Live Public APIs
    loadLiveMedium();
    loadLiveGitHub();
    loadLiveLeetCode();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
