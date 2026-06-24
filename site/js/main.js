/* ===================================================================
   SKYLARK LODGE — interactions
   =================================================================== */

/* -------------------------------------------------------------------
   1.  CONTACT CONFIG  ← EDIT THESE VALUES
   -------------------------------------------------------------------
   PHONE must be in full international format with no spaces for the
   links to work (e.g. Irish mobile 087 123 4567  ->  +353871234567).
   WHATSAPP is usually the same number, digits only, no "+".
------------------------------------------------------------------- */
const CONTACT = {
  phoneDisplay : "Call Breda",          // text shown on the call button
  phone        : "+353876279097",        // Breda — full international format
  whatsapp     : "353876279097",         // same number, digits only, no "+"
  whatsappMsg  : "Hi Breda! I'd love to book a stay at Skylark Lodge. Could you let me know your availability?",
  instagram    : "https://www.instagram.com/skylarklodge/",
  facebook     : "https://www.facebook.com/profile.php?id=61590315734183",
  tiktok       : "https://www.tiktok.com/@skylarklodge"
};

/* Apply contact links across the page */
(function applyContact(){
  const tel = "tel:" + CONTACT.phone.replace(/\s+/g,"");
  const wa  = "https://wa.me/" + CONTACT.whatsapp.replace(/[^\d]/g,"") +
              "?text=" + encodeURIComponent(CONTACT.whatsappMsg);

  document.querySelectorAll(".js-call-link, .js-call").forEach(a=>a.href = tel);
  document.querySelectorAll(".js-wa-link").forEach(a=>a.href = wa);
  document.querySelectorAll(".js-phone-display").forEach(el=>el.textContent = CONTACT.phoneDisplay);
  document.querySelectorAll(".js-instagram").forEach(a=>a.href = CONTACT.instagram);
  document.querySelectorAll(".js-facebook").forEach(a=>a.href = CONTACT.facebook);
  document.querySelectorAll(".js-tiktok").forEach(a=>a.href = CONTACT.tiktok);
})();

/* -------------------------------------------------------------------
   2.  NAV — scroll state + hide on scroll-down
------------------------------------------------------------------- */
const nav = document.getElementById("nav");
let lastY = 0;
function onScroll(){
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 40);
  if (y > 400 && y > lastY + 4){ nav.classList.add("hide"); }
  else if (y < lastY - 4){ nav.classList.remove("hide"); }
  lastY = y;

  // sticky mobile bar appears after hero
  const bar = document.getElementById("mobilebar");
  bar.classList.toggle("show", y > window.innerHeight * 0.7);
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

/* -------------------------------------------------------------------
   3.  MOBILE MENU
------------------------------------------------------------------- */
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", ()=>{
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".mobile-menu a").forEach(a=>{
  a.addEventListener("click", ()=>document.body.classList.remove("menu-open"));
});

/* -------------------------------------------------------------------
   4.  REVEAL ON SCROLL  (with stagger for grids)
------------------------------------------------------------------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
},{threshold:0.12, rootMargin:"0px 0px -8% 0px"});

document.querySelectorAll(".reveal").forEach((el,i)=>{
  // light stagger for siblings sharing a parent
  const sibs = [...el.parentElement.children].filter(c=>c.classList.contains("reveal"));
  const idx = sibs.indexOf(el);
  if(sibs.length>1) el.style.transitionDelay = (idx*0.08)+"s";
  io.observe(el);
});

/* -------------------------------------------------------------------
   5.  COUNTERS
------------------------------------------------------------------- */
const counters = document.querySelectorAll(".stat__num");
const cio = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target/28));
    const t = setInterval(()=>{
      n += step;
      if(n>=target){ n=target; clearInterval(t); }
      el.textContent = n;
    }, 32);
    cio.unobserve(el);
  });
},{threshold:0.6});
counters.forEach(c=>cio.observe(c));

/* -------------------------------------------------------------------
   6.  PARALLAX  (rAF-throttled)
------------------------------------------------------------------- */
const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
let ticking = false;
function parallax(){
  const vh = window.innerHeight;
  parallaxEls.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.bottom < -200 || r.top > vh+200) return;
    const speed = parseFloat(el.dataset.parallax);
    const offset = (r.top + r.height/2 - vh/2) * speed * -1;
    const target = el.querySelector("img") || el;
    if(el.classList.contains("cta__bg")) el.style.transform = `translateY(${offset}px) scale(1.05)`;
    else target.style.transform = `translateY(${offset}px)`;
  });
  ticking = false;
}
window.addEventListener("scroll", ()=>{
  if(!ticking){ requestAnimationFrame(parallax); ticking=true; }
},{passive:true});
parallax();

/* -------------------------------------------------------------------
   7.  GALLERY  +  LIGHTBOX
------------------------------------------------------------------- */
const GALLERY = [
  {src:"openplan-1",     alt:"Open-plan living and dining filled with light",        tall:true},
  {src:"bedroom-grey",   alt:"Calm grey bedroom with reading armchair"},
  {src:"kitchen",        alt:"Sage-green island kitchen with brass pendants"},
  {src:"bath-grey",      alt:"Grey marble bathroom with walk-in rainfall shower",    tall:true},
  {src:"bedroom-navy",   alt:"Navy upholstered bed with countryside view"},
  {src:"entrance-hall",  alt:"Bright entrance hall with crystal chandelier"},
  {src:"bedroom-beige",  alt:"Neutral bedroom with ensuite"},
  {src:"hallway",        alt:"Hallway gallery wall with artwork",                    tall:true},
  {src:"bath-marble-gold",alt:"Marble bathroom with gold-framed mirror"},
  {src:"bedroom-twin",   alt:"Flexible twin bedroom"},
  {src:"living-room",    alt:"Living room with leather sofa and smart TV"},
  {src:"entrance-door",  alt:"Front door framed by potted flowers"},
  {src:"exterior-gates", alt:"Gated entrance with sweeping driveway",                tall:true},
  {src:"garden",         alt:"Landscaped gardens and open countryside"},
  {src:"exterior-rear",  alt:"Rear of the lodge across the lawn"},
  {src:"patio",          alt:"Sunny patio with outdoor seating"}
];

const grid = document.getElementById("galleryGrid");
GALLERY.forEach((g,i)=>{
  const fig = document.createElement("figure");
  fig.className = "gallery__item reveal" + (g.tall ? " gallery__item--tall" : "");
  fig.dataset.index = i;
  fig.innerHTML = `<img src="assets/img/${g.src}.jpg" alt="${g.alt}" loading="lazy">`;
  fig.addEventListener("click", ()=>openLightbox(i));
  grid.appendChild(fig);
  io.observe(fig);
});

const lb       = document.getElementById("lightbox");
const lbImg    = lb.querySelector(".lightbox__img");
const lbCap    = lb.querySelector(".lightbox__caption");
let lbIndex    = 0;

function openLightbox(i){
  lbIndex = i;
  render();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function render(){
  const g = GALLERY[lbIndex];
  lbImg.src = `assets/img/${g.src}.jpg`;
  lbImg.alt = g.alt;
  lbCap.textContent = `${g.alt}  ·  ${lbIndex+1} / ${GALLERY.length}`;
}
function close(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function move(dir){
  lbIndex = (lbIndex + dir + GALLERY.length) % GALLERY.length;
  lbImg.style.opacity = 0;
  setTimeout(()=>{ render(); lbImg.style.opacity = 1; }, 120);
}
lb.querySelector(".lightbox__close").addEventListener("click", close);
lb.querySelector(".lightbox__nav--prev").addEventListener("click", ()=>move(-1));
lb.querySelector(".lightbox__nav--next").addEventListener("click", ()=>move(1));
lb.addEventListener("click", e=>{ if(e.target===lb) close(); });
document.addEventListener("keydown", e=>{
  if(!lb.classList.contains("open")) return;
  if(e.key==="Escape") close();
  if(e.key==="ArrowLeft") move(-1);
  if(e.key==="ArrowRight") move(1);
});
lbImg.style.transition = "opacity .12s ease";

/* swipe on touch */
let touchX = null;
lb.addEventListener("touchstart", e=>touchX = e.touches[0].clientX, {passive:true});
lb.addEventListener("touchend", e=>{
  if(touchX===null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(Math.abs(dx)>50) move(dx<0 ? 1 : -1);
  touchX = null;
},{passive:true});

/* -------------------------------------------------------------------
   8.  YEAR
------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
