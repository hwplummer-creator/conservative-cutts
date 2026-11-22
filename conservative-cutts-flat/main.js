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
  var isOpen = openDay && mins >= 480 && mins < 1080;
  var detail = isOpen ? 'until 6:00 PM today'
    : (openDay && mins < 480) ? 'opens today at 8:00 AM'
    : (day === 6 || day === 0) ? 'opens Monday at 8:00 AM'
    : 'opens tomorrow at 8:00 AM';
  document.querySelectorAll('.js-status').forEach(function (el) { el.textContent = isOpen ? 'Open now' : 'Closed now'; });
  document.querySelectorAll('.js-detail').forEach(function (el) { el.textContent = detail; });
  document.querySelectorAll('.js-dot').forEach(function (el) { el.classList.toggle('open', isOpen); });
  var row = document.querySelector('#hours li[data-day="' + day + '"]');
  if (row) row.classList.add('today');
  document.getElementById('year').textContent = new Date().getFullYear();
})();

(function(){var g=document.querySelectorAll('#work-grid .cut'),lb=document.getElementById('lb'),im=lb.querySelector('img'),i=0,last;
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
