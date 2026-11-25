document.getElementById('yr').textContent = new Date().getFullYear();
  document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('menu').classList.remove('open');});});

  /* HERO CAROUSEL — add more banners by adding URLs here */
  var RAW="";
  var heroSlides=[RAW+"/img/header-bg.jpg", RAW+"/img/header-bg.2022.jpg"];
  var slidesEl=document.getElementById('slides'), dotsEl=document.getElementById('dots'), cur=0, timer=null;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  heroSlides.forEach(function(url,i){
    var s=document.createElement('div'); s.className='slide'+(i===0?' on':''); s.style.backgroundImage="url('"+url+"')"; slidesEl.appendChild(s);
    var d=document.createElement('button'); d.className='dot'+(i===0?' on':''); d.setAttribute('aria-label','Go to slide '+(i+1)); d.onclick=function(){go(i);}; dotsEl.appendChild(d);
  });
  function render(){slidesEl.querySelectorAll('.slide').forEach(function(s,i){s.classList.toggle('on',i===cur);});dotsEl.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('on',i===cur);});}
  function go(i){cur=(i+heroSlides.length)%heroSlides.length;render();}
  function nextSlide(){go(cur+1);} function prevSlide(){go(cur-1);}
  function startHero(){if(!reduce&&heroSlides.length>1){timer=setInterval(nextSlide,6000);}}
  function pauseHero(){if(timer){clearInterval(timer);timer=null;}}
  function resumeHero(){if(!timer)startHero();}
  startHero();

  /* SCROLL-SPY NAV */
  var spy=document.querySelectorAll('.nav-links a.link'), map={};
  spy.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){spy.forEach(function(a){a.classList.remove('active');});if(map[e.target.id])map[e.target.id].classList.add('active');}});
  },{rootMargin:"-45% 0px -50% 0px"});
  ['about','committee','programs','events','join','contact'].forEach(function(id){var el=document.getElementById(id);if(el)obs.observe(el);});

  /* EVENTS + MODAL */
  var EV=RAW+"/img/events/";
  var events=[
    {date:"2024",title:"English Presentation Competition 2024",img:EV+"english-presentation-2024-1.jpg",imgs:[EV+"english-presentation-2024-1.jpg",EV+"english-presentation-2024-2.jpg"],text:"Our member took part in the English Presentation Competition 2024, held at Ritsumeikan University."},
    {date:"Aug\u2013Sep 2024",title:"IEEE Region 10 SYWL Congress 2024",img:EV+"sywl-congress-2024-1.jpg",imgs:[EV+"sywl-congress-2024-1.jpg",EV+"sywl-congress-2024-2.jpg"],text:"Our member took part in the IEEE Region 10 Students, Young Professionals, Women in Engineering, and Life Members (SYWL) Congress 2024, held at the National Olympics Memorial Youth Center in Tokyo, Japan, from August 29 to September 1, 2024."},
    {date:"2024",title:"Women in Engineering Symposium 2024",img:EV+"wie-symposium-2024.jpg",imgs:[EV+"wie-symposium-2024.jpg"],text:"Members joined the Women in Engineering Symposium, with talks from female researchers and engineers across the Kansai Section."},
    {date:"2023",title:"Officer Selection for 2023",img:EV+"officer-selection-2023.jpg",text:"We held an event to select the Student Branch officers for 2023 with the previous officers present. The new officers for 2023 were Olufemi (Chair), Thuwiba (Vice Chair), Sergio (Secretary), Yohanssen (Treasurer) and Kang (Webmaster). Juri also joined as a regular member. We had a social gathering with sushi afterwards. Welcome everyone to IEEE SB NAIST!"},
    {date:"2022",title:"Research Exchange Meeting 2022",img:EV+"research-exchange-meeting-2022.jpg",text:"A member presented at the Research Exchange Meeting 2022, held at Osaka Institute of Technology, Umeda Campus."},
    {date:"2022",title:"English Presentation Competition 2022",img:EV+"english-presentation-2022.jpeg",text:"A member took part in the English Presentation Competition 2022, hosted at Ritsumeikan University."},
    {date:"2022",title:"Members photo session 2022",img:EV+"photo-session-2022.jpeg",text:"We gathered to take updated member photos for the website. Thanks to Felan Carlo Garcia for taking the pictures."},
    {date:"2021",title:"Members photo session 2021",img:EV+"photo-session-2021.JPG",text:"We took photos of the members to refresh the website for the year. Thanks to Felan Carlo Garcia for taking the pictures."},
    {date:"2021",title:"First officers' meeting of 2021",img:EV+"20210218.JPG",text:"The officers of the Student Branch held the first meeting of the year to draft the plan for the year ahead."}
  ];
  var grid=document.getElementById('events-grid');
  events.forEach(function(ev,i){
    var b=document.createElement('button'); b.className='event'; b.onclick=function(){openModal(i);};
    b.innerHTML='<div class="thumb" style="background-image:url(\''+((ev.imgs&&ev.imgs[0])||ev.img)+'\')"></div><div class="ebody"><div class="date">'+ev.date+'</div><h3>'+ev.title+'</h3><div class="more">Read more</div></div>';
    grid.appendChild(b);
  });

  /* NEXT EVENT — set to null when nothing is scheduled, or update the fields */
  var upcomingEvent = {
    title:"Semester Kick-off & Officer Meet",
    datetime:"2026-10-20T18:00:00+09:00",   // start (with timezone)
    end:"2026-10-20T20:00:00+09:00",         // end (optional; defaults to +2h)
    location:"NAIST, Information Science Building",
    blurb:"Our first gathering of the term — meet the committee, hear what's planned, and find out how to get involved.",
    rsvpUrl:""                                // optional: a Google Form / Facebook event / mailto link
  };
  (function(){
    var host=document.getElementById('next-event'); if(!host) return;
    function pad(n){return (n<10?'0':'')+n;}
    function empty(){host.innerHTML='<div class="ne-empty">No upcoming events scheduled right now — check back soon.</div>';}
    if(!upcomingEvent){empty();return;}
    var dt=new Date(upcomingEvent.datetime);
    if(isNaN(dt.getTime())||dt.getTime()<=Date.now()){empty();return;}
    var when=dt.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})+' \u00b7 '+dt.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    host.innerHTML=
      '<div class="next-event">'+
        '<div class="ne-left">'+
          '<div class="ne-label">Next event</div>'+
          '<div class="ne-title"></div>'+
          '<div class="ne-meta">'+
            '<span><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><span class="ne-when"></span></span>'+
            '<span><svg viewBox="0 0 24 24"><path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><span class="ne-loc"></span></span>'+
          '</div>'+
          '<p class="ne-blurb"></p>'+
          '<div class="ne-cta"></div>'+
        '</div>'+
        '<div class="ne-right"><div class="countdown">'+
          '<div class="cd-box"><div class="cd-num" id="cd-d">0</div><div class="cd-lbl">DAYS</div></div>'+
          '<div class="cd-box"><div class="cd-num" id="cd-h">00</div><div class="cd-lbl">HRS</div></div>'+
          '<div class="cd-box"><div class="cd-num" id="cd-m">00</div><div class="cd-lbl">MIN</div></div>'+
          '<div class="cd-box"><div class="cd-num" id="cd-s">00</div><div class="cd-lbl">SEC</div></div>'+
        '</div></div>'+
      '</div>';
    host.querySelector('.ne-title').textContent=upcomingEvent.title;
    host.querySelector('.ne-when').textContent=when;
    host.querySelector('.ne-loc').textContent=upcomingEvent.location;
    host.querySelector('.ne-blurb').textContent=upcomingEvent.blurb;
    var cta=host.querySelector('.ne-cta');
    function toCal(x){return new Date(x).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');}
    function endOf(ev){if(ev.end)return ev.end;var d=new Date(ev.datetime);d.setHours(d.getHours()+2);return d.toISOString();}
    var gs=toCal(upcomingEvent.datetime), ge=toCal(endOf(upcomingEvent));
    var gcal='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(upcomingEvent.title)+'&dates='+gs+'/'+ge+'&details='+encodeURIComponent(upcomingEvent.blurb||'')+'&location='+encodeURIComponent(upcomingEvent.location||'');
    var icsText=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//IEEE SB NAIST//EN','BEGIN:VEVENT','UID:'+gs+'@ieee-sb-naist.github.io','DTSTAMP:'+toCal(new Date().toISOString()),'DTSTART:'+gs,'DTEND:'+ge,'SUMMARY:'+upcomingEvent.title,'DESCRIPTION:'+(upcomingEvent.blurb||'').replace(/\n/g,' '),'LOCATION:'+(upcomingEvent.location||''),'END:VEVENT','END:VCALENDAR'].join('\r\n');
    var icsHref='data:text/calendar;charset=utf-8,'+encodeURIComponent(icsText);
    cta.innerHTML='<a class="btn" target="_blank" rel="noopener" href="'+gcal+'"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/></svg>Add to Google Calendar</a>'+
      '<div class="ne-sub">'+
        '<a href="'+icsHref+'" download="ieee-sb-naist-event.ics">Add to Apple / Outlook (.ics)</a>'+
        (upcomingEvent.rsvpUrl?'<a target="_blank" rel="noopener" href="'+upcomingEvent.rsvpUrl+'">Details & RSVP</a>':'')+
      '</div>';
    var dEl=document.getElementById('cd-d'),hEl=document.getElementById('cd-h'),mEl=document.getElementById('cd-m'),sEl=document.getElementById('cd-s'),iv;
    function tick(){
      var t=dt.getTime()-Date.now();
      if(t<=0){clearInterval(iv);empty();return;}
      dEl.textContent=Math.floor(t/86400000);
      hEl.textContent=pad(Math.floor(t/3600000)%24);
      mEl.textContent=pad(Math.floor(t/60000)%60);
      sEl.textContent=pad(Math.floor(t/1000)%60);
    }
    tick(); iv=setInterval(tick,1000);
  })();
  var modal=document.getElementById('modal'), lastFocus=null;
  function openModal(i){var ev=events[i];lastFocus=document.activeElement;
    var imgs=(ev.imgs&&ev.imgs.length)?ev.imgs:[ev.img];
    document.getElementById('modal-img').src=imgs[0];document.getElementById('modal-img').alt=ev.title;
    document.getElementById('modal-date').textContent=ev.date;document.getElementById('modal-title').textContent=ev.title;
    document.getElementById('modal-text').textContent=ev.text;
    var g=document.getElementById('modal-gallery');g.innerHTML='';
    for(var k=1;k<imgs.length;k++){var im=document.createElement('img');im.src=imgs[k];im.alt=ev.title+' photo '+(k+1);g.appendChild(im);}
    modal.classList.add('open');document.querySelector('.modal-close').focus();}
  function closeModal(){modal.classList.remove('open');if(lastFocus)lastFocus.focus();}
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
