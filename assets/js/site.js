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

  const belfastHref='/areas/belfast/';

  // Give Belfast a direct link in the desktop Areas menu on every page.
  document.querySelectorAll('.desktop-nav .nav-dropdown').forEach(dropdown=>{
    const button=dropdown.querySelector('button');
    const panel=dropdown.querySelector('.dropdown-panel');
    if(!button||!panel||!button.textContent.trim().startsWith('Areas'))return;
    if(panel.querySelector(`a[href="${belfastHref}"]`))return;
    const link=document.createElement('a');
    link.href=belfastHref;
    link.textContent='Belfast';
    const combined=panel.querySelector('a[href="/areas/belfast-lisburn/"]');
    if(combined)panel.insertBefore(link,combined);else panel.appendChild(link);
  });

  // Give Belfast a direct link in the mobile navigation on every page.
  if(menu&&!menu.querySelector(`a[href="${belfastHref}"]`)){
    const link=document.createElement('a');
    link.href=belfastHref;
    link.textContent='Belfast';
    const areasLink=menu.querySelector('a[href="/areas/"]');
    if(areasLink)areasLink.insertAdjacentElement('afterend',link);else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  }

  // Give Belfast a direct link in the Coverage footer on every page.
  document.querySelectorAll('.footer-grid > div').forEach(column=>{
    const heading=column.querySelector('h3');
    if(!heading||heading.textContent.trim()!=='Coverage'||column.querySelector(`a[href="${belfastHref}"]`))return;
    const link=document.createElement('a');
    link.href=belfastHref;
    link.textContent='Belfast';
    const combined=column.querySelector('a[href="/areas/belfast-lisburn/"]');
    if(combined)column.insertBefore(link,combined);else column.appendChild(link);
  });

  // Make the homepage Belfast coverage card point at the dedicated Belfast page.
  if(location.pathname==='/'||location.pathname==='/index.html'){
    const card=[...document.querySelectorAll('a.card-link[href="/areas/belfast-lisburn/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Belfast'));
    if(card){
      card.href=belfastHref;
      const title=card.querySelector('h3');
      const copy=card.querySelector('p');
      const cta=card.querySelector('.text-link');
      if(title)title.textContent='Belfast';
      if(copy)copy.textContent='Dedicated PAT testing for Belfast offices, retail, hospitality, salons, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Belfast →';
    }
  }

  // On the Lisburn coverage page, provide a clear contextual route to the dedicated Belfast page.
  if(location.pathname==='/areas/belfast-lisburn/'||location.pathname==='/areas/belfast-lisburn/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${belfastHref}"]`)){
      const link=document.createElement('a');
      link.className='btn-light';
      link.href=belfastHref;
      link.textContent='Looking for Belfast? View Belfast PAT testing';
      actions.appendChild(link);
    }
  }

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
