(function () {
  // Mobile menu
  var header = document.getElementById('header');
  var btn = document.getElementById('menu-btn');
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('#mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () { header.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
  });


  // Open / closed status in shop time (America/New_York)
  var day, mins;
  try {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ''; };
    day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
  } catch (e) { var d = new Date(); day = d.getDay(); mins = d.getHours() * 60 + d.getMinutes(); }
  var openDay = day >= 1 && day <= 6;
  var isOpen = openDay && mins >= 600 && mins < 1140;
  var detail = isOpen ? 'until 7:00 PM today'
    : (openDay && mins < 600) ? 'opens today at 10:00 AM'
    : (day === 0) ? 'opens Monday at 10:00 AM'
    : (day === 6) ? 'Sunday by appointment only'
    : 'opens tomorrow at 10:00 AM';
  var status = isOpen ? 'Open now' : (day === 0 ? 'By appointment today' : 'Closed now');
  document.querySelectorAll('.js-status').forEach(function (el) { el.textContent = status; });
  document.querySelectorAll('.js-detail').forEach(function (el) { el.textContent = detail; });
  document.querySelectorAll('.js-dot').forEach(function (el) { el.classList.toggle('open', isOpen); });
  var row = document.querySelector('#hours li[data-day="' + day + '"]');
  if (row) row.classList.add('today');
  document.getElementById('year').textContent = new Date().getFullYear();
})();

(function(){var g=document.querySelectorAll('.work-top .cut, #work-grid .cut'),lb=document.getElementById('lb'),im=lb.querySelector('img'),i=0,last;
function show(n){i=(n+g.length)%g.length;var s=g[i].querySelector('img');im.src=s.src;im.alt=s.alt}
function open(n){last=document.activeElement;show(n);lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow='';if(last)last.focus()}
g.forEach(function(b,n){b.addEventListener('click',function(){open(n)})});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){show(i-1)};lb.querySelector('.nx').onclick=function(){show(i+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)show(i+(d<0?1:-1));x0=null});
})();

// Section transitions: fade content up as it scrolls into view
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var groups = ['.sec .head', '.shop-head', '.menu', '.barbers > *', '.gallery', '.features > div', '.work-top .cut', '#work-grid .cut', '.reviews .review', '.visit-info', '.map', '.closing .wrap'];
  var items = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, n) {
      el.classList.add('reveal');
      el.dataset.delay = (n % 4) * 90;
      items.push(el);
    });
  });
  var brows = document.querySelectorAll('.eyebrow');
  document.documentElement.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, d = +(el.dataset.delay || 0);
      if (d) { el.style.transitionDelay = d + 'ms'; setTimeout(function () { el.style.transitionDelay = ''; }, d + 800); }
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
  brows.forEach(function (el) { io.observe(el); });
})();
