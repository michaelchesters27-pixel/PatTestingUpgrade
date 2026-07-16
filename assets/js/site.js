
(function(){
  const menuButton=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.mobile-menu');
  if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu&&menu.classList.remove('open')));
  const year=document.querySelector('[data-year]'); if(year) year.textContent=new Date().getFullYear();
})();
