var su=u=>/^(javascript|data|vbscript):/i.test(String(u||'').replace(/[\s\x00-\x1f]/g,''))?'#':u;
const CATS=window.CATS,TABS=['首頁',...CATS];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const N=[...NEWS].sort((a,b)=>(b.date||'').localeCompare(a.date||''));let cat='首頁',topic='',shown=20;
const W='日一二三四五六',d=new Date();$('#today').textContent=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${W[d.getDay()]}`;$('#upd').textContent='資料更新：'+UPDATED;
const ci=c=>CATS.indexOf(c)+1,tag=n=>`<span class="tag t${ci(n.category)}">${n.category}</span>`;
const link=(n,t)=>`<a href="${esc(su(n.url))}" target="_blank" rel="noopener">${t}</a>`,ttl=n=>esc(n.title);
const meta=n=>`<div class="meta">${tag(n)}<span class="unit">${esc(n.unit)}</span><time>${n.date}</time></div>`;
const card=(n,cls='card')=>`<article class="${cls}">${meta(n)}<h3>${link(n,ttl(n))}</h3><p class="sum">${esc(n.summary)}</p><button class="tog">展開摘要 ▾</button><div class="foot"><a class="src" href="${esc(su(n.url))}" target="_blank" rel="noopener">原始連結 ↗</a></div></article>`;
$('#tabs').innerHTML=TABS.map(c=>`<button data-c="${c}">${c}</button>`).join('')+'<a class="navsk" href="https://www.subsidyking.tw/" target="_blank" rel="noopener">補助王 ↗</a><a class="navsub" href="https://news.subsidyking.tw/" target="_blank" rel="noopener">補助新聞網 ↗</a>';
$('#blocks').innerHTML=CATS.map(c=>`<section class="block" data-cat="${c}"><h2><span>${c}</span><a data-go="${c}">更多 ›</a></h2><div class="grid"></div></section>`).join('');
const AD=`<div class="box ad"><div class="ad-name">仁禾管理顧問<br>劉靜渡</div><div class="ad-contact"><a href="mailto:tommyliu2009@gmail.com">tommyliu2009@gmail.com</a><br><a href="https://line.me/ti/p/~tommyliu2009" target="_blank" rel="noopener">LINE ID：tommyliu2009</a></div></div>`;
function side(){const t={};N.forEach(n=>{(t[n.category]=t[n.category]||{})[n.unit]=((t[n.category]||{})[n.unit]||0)+1});
 let h=AD+'<div class="box"><h4>分類</h4>'+CATS.filter(c=>t[c]).map(c=>`<p class="grp"><a data-c="${c}" data-t="">${c}</a></p><ul class="units">`+Object.entries(t[c]).sort((a,b)=>b[1]-a[1]).map(([u,k])=>`<li><a data-c="${c}" data-t="${esc(u)}" class="${c==cat&&u==topic?'on':''}">${esc(u)}<em>${k}</em></a></li>`).join('')+'</ul>').join('')+'</div>';
 h+='<a class="box skside" href="https://www.subsidyking.tw/" target="_blank" rel="noopener"><b>補助王</b><span>全台政府補助查詢，開放中、即將截止一次看 ↗</span></a>';
 h+='<div class="box"><h4>最新新聞</h4><ol class="latest">'+N.slice(0,8).map(n=>`<li>${link(n,ttl(n))}<time>${n.date}｜${esc(n.unit)}</time></li>`).join('')+'</ol></div>';
 h+='<div class="box"><h4>相關網站</h4><ul class="units"><li><a href="https://www.subsidyking.tw/" target="_blank" rel="noopener">補助王：政府補助查詢 ↗</a></li><li><a href="https://news.subsidyking.tw/" target="_blank" rel="noopener">台灣政府補助新聞網 ↗</a></li><li><a href="https://web4.subsidyking.tw/" target="_blank" rel="noopener">標案王：政府標案查詢 ↗</a></li></ul></div>';$$('.side').forEach(s=>s.innerHTML=h)}
function home(){const [l,...r]=N;if(!l)return;$('#lead').innerHTML=`<article class="lead">${meta(l)}<h2>${link(l,ttl(l))}</h2><p class="sum">${esc(l.summary)}</p><button class="tog">展開摘要 ▾</button><a class="src" href="${esc(su(l.url))}" target="_blank" rel="noopener">閱讀原文 ↗</a></article>`;
 const picks=CATS.map(c=>r.find(n=>n.category==c)).filter(Boolean).slice(0,4);
 $('#subs').innerHTML='<h4 class="kicker">焦點新聞</h4>'+picks.map(n=>`<article class="subh">${meta(n)}<h3>${link(n,ttl(n))}</h3></article>`).join('');
 $$('.block[data-cat]').forEach(b=>{const a=N.filter(n=>n.category==b.dataset.cat&&n!==l).slice(0,6);b.hidden=!a.length;b.querySelector('.grid').innerHTML=a.map(n=>card(n)).join('')})}
function catv(){const all=N.filter(n=>n.category==cat),a=all.filter(n=>!topic||n.unit==topic),tp={};all.forEach(n=>tp[n.unit]=(tp[n.unit]||0)+1);
 $('#ctitle').textContent=cat+(topic?'｜'+topic:'');$('#cmeta').textContent=`共 ${a.length} 則`;
 $('#topics').innerHTML=`<a data-c="${cat}" data-t="" class="${topic?'':'on'}">全部</a>`+Object.entries(tp).sort((x,y)=>y[1]-x[1]).map(([u,k])=>`<a data-c="${cat}" data-t="${esc(u)}" class="${u==topic?'on':''}">${esc(u)} ${k}</a>`).join('');
 $('#clist').innerHTML=a.length?a.slice(0,shown).map(n=>card(n,'card row')).join(''):'<p class="meta">目前沒有這個分類的新聞。</p>';$('#more').style.display=a.length>shown?'':'none'}
function go(c,t=''){cat=c;topic=t;shown=20;$$('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.c==cat));$('#home').hidden=cat!='首頁';$('#catview').hidden=cat=='首頁';cat=='首頁'?home():catv();side();folds();const h=cat=='首頁'?'':'#'+encodeURIComponent(cat);if(location.hash!=h)history.replaceState(null,'',h||location.pathname);scrollTo(0,0)}
function folds(){$$('.sum').forEach(p=>{const b=p.nextElementSibling;if(b&&b.classList.contains('tog'))b.hidden=!(p.scrollHeight>p.clientHeight+2)&&!p.classList.contains('open')})}
document.addEventListener('click',e=>{const t=e.target.closest('[data-c],[data-go],.tog');if(!t)return;
 if(t.classList.contains('tog')){const p=t.previousElementSibling,o=p.classList.toggle('open');t.textContent=o?'收合摘要 ▴':'展開摘要 ▾';return}
 e.preventDefault();go(t.dataset.go||t.dataset.c,t.dataset.t||'')});
$('#more').onclick=()=>{shown+=20;catv();folds()};addEventListener('resize',folds);
const h0=decodeURIComponent(location.hash.slice(1));go(CATS.includes(h0)?h0:'首頁');
