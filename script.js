/* ============ EDIT YOUR PROJECTS HERE ============ */
const projects = [
  { title: "Food Valley", description: "Developed a responsive food website featuring menu cards, prices, and ordering buttons.", tech: ["HTML5", "CSS3"], category: "html-css", repo: "https://github.com/Ahsanansari786/Food-Valley-html-Css-Based", live: "https://foodvalleymain.netlify.app/", placeholder: true },
  { title: "Teacher Login Protal", description: "A teacher login portal where a teacher see's there student progress ", tech: ["HTML5", "CSS3", "Bootsrtep 5.3"], category: "html-css", repo: "https://github.com/Ahsanansari786/Student-Portal", live: "studentportalbyahsanansari.netlify.app", placeholder: true },
];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
document.documentElement.classList.add("js");
$("#year").textContent = new Date().getFullYear();

/* ---------- Navbar: glass on scroll, mobile menu ---------- */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---------- Active nav link on scroll ---------- */
const links = $$(".nav__link");
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "about", "skills", "journey", "projects", "contact"].forEach(id => spy.observe($("#" + id)));

/* ---------- Reveal on scroll ---------- */
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => reveal.observe(el));

/* ---------- Projects: render + filter ---------- */
const grid = $("#projectGrid"), emptyMsg = $("#emptyMsg");
const symbol = { "html-css": "</>", javascript: "{ }" };

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

function renderProjects(filter = "all") {
  grid.replaceChildren();
  const list = projects.filter(p => filter === "all" || p.category === filter);
  list.forEach(p => {
    const card = el("article", "glass project");
    card.append(el("div", "thumb", symbol[p.category] || "</>"));
    const body = el("div", "project__body");
    body.append(el("h3", "", p.title));
    if (p.placeholder) body.append(el("span", "soon", "Placeholder: not a finished project"));
    body.append(el("p", "", p.description));
    const tech = el("div", "tech");
    p.tech.forEach(t => tech.append(el("span", "", t)));
    body.append(tech);

    const btns = el("div", "project__btns");
    const code = el("a", "btn btn--ghost", "View Code");
    if (p.repo) { code.href = p.repo; code.target = "_blank"; code.rel = "noopener noreferrer"; }
    else { code.setAttribute("role", "link"); code.setAttribute("aria-disabled", "true"); code.title = "Add your repository link in script.js"; }
    btns.append(code);
    if (p.live) {
      const live = el("a", "btn btn--primary", "Live Preview");
      live.href = p.live; live.target = "_blank"; live.rel = "noopener noreferrer";
      btns.append(live);
    }
    body.append(btns);
    card.append(body);
    grid.append(card);
  });
  emptyMsg.hidden = list.length > 0;
}
renderProjects();

$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-pressed", "false"); });
  chip.classList.add("is-active");
  chip.setAttribute("aria-pressed", "true");
  renderProjects(chip.dataset.filter);
}));

/* ---------- Back to top ---------- */
$("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
