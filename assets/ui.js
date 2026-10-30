// Core controls work even when optional animation CDNs are unavailable.
const photoDialog=document.getElementById('photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('full-photo');img.src=button.dataset.photo;img.alt=button.dataset.caption;document.getElementById('photo-caption').textContent=button.dataset.caption;photoDialog.showModal();}));
document.getElementById('close-photo').addEventListener('click',()=>photoDialog.close());
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog)photoDialog.close();});
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.querySelector('.nav-toggle');
toggle.addEventListener('click',()=>setTimeout(()=>toggle.setAttribute('aria-expanded',toggle.classList.contains('active')),0));
// Native menu and theme fallbacks if the motion libraries cannot load.
if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){
 const nav=document.querySelector('.nav-links');toggle.addEventListener('click',()=>{toggle.classList.toggle('active');nav.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',nav.classList.contains('nav-open'));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('nav-open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');}));
 document.documentElement.classList.toggle('light-mode',localStorage.getItem('theme')==='light');
 document.getElementById('theme-toggle').addEventListener('click',()=>{const light=document.documentElement.classList.toggle('light-mode');localStorage.setItem('theme',light?'light':'dark');});
}
const terminal=document.getElementById('learning-terminal');
const lines=['> lokesh --introduce','Final-year CSE (AI & ML) · Class of 2027','Stack: Python · SQL · Power BI · Power Automate','Building practical solutions. Always learning.','> status: open to opportunities'];
let line=0;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function nextLine(){if(line>=lines.length)return;const el=document.createElement('p');el.textContent=lines[line];if(line===0||line===4)el.className='orange';terminal.append(el);line++;if(!reduced)setTimeout(nextLine,1000);else nextLine();}nextLine();
// Expandable content changes document height; keep scroll animation measurements current.
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(typeof ScrollTrigger!=='undefined')ScrollTrigger.refresh();}));
// No external stats are cached: profile links always lead to the current source.
const portfolioConfig={youtubeUrl:''};
