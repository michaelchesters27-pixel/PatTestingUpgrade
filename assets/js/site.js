(function(){
  const menuButton=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.mobile-menu');
  if(menuButton&&menu){
    if(!menu.id) menu.id='mobile-menu';
    menuButton.setAttribute('aria-controls',menu.id);
    const closeMenu=()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');};
    menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
  }
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
