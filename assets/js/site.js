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
  const derryHref='/areas/derry/';

  document.querySelectorAll('.desktop-nav .nav-dropdown').forEach(dropdown=>{
    const button=dropdown.querySelector('button');
    const panel=dropdown.querySelector('.dropdown-panel');
    if(!button||!panel||!button.textContent.trim().startsWith('Areas'))return;

    if(!panel.querySelector(`a[href="${belfastHref}"]`)){
      const link=document.createElement('a');
      link.href=belfastHref;
      link.textContent='Belfast';
      const combined=panel.querySelector('a[href="/areas/belfast-lisburn/"]');
      if(combined)panel.insertBefore(link,combined);else panel.appendChild(link);
    }

    if(!panel.querySelector(`a[href="${derryHref}"]`)){
      const link=document.createElement('a');
      link.href=derryHref;
      link.textContent='Derry';
      const combined=panel.querySelector('a[href="/areas/derry-strabane/"]');
      if(combined)panel.insertBefore(link,combined);else panel.appendChild(link);
    }

    const derryCombined=panel.querySelector('a[href="/areas/derry-strabane/"]');
    if(derryCombined)derryCombined.textContent='Strabane & north-west';
  });

  if(menu&&!menu.querySelector(`a[href="${belfastHref}"]`)){
    const link=document.createElement('a');
    link.href=belfastHref;
    link.textContent='Belfast';
    const areasLink=menu.querySelector('a[href="/areas/"]');
    if(areasLink)areasLink.insertAdjacentElement('afterend',link);else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  }
  if(menu&&!menu.querySelector(`a[href="${derryHref}"]`)){
    const link=document.createElement('a');
    link.href=derryHref;
    link.textContent='Derry';
    const belfastLink=menu.querySelector(`a[href="${belfastHref}"]`);
    if(belfastLink)belfastLink.insertAdjacentElement('afterend',link);else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  }

  document.querySelectorAll('.footer-grid > div').forEach(column=>{
    const heading=column.querySelector('h3');
    if(!heading||heading.textContent.trim()!=='Coverage')return;
    if(!column.querySelector(`a[href="${belfastHref}"]`)){
      const link=document.createElement('a');
      link.href=belfastHref;
      link.textContent='Belfast';
      const combined=column.querySelector('a[href="/areas/belfast-lisburn/"]');
      if(combined)column.insertBefore(link,combined);else column.appendChild(link);
    }
    if(!column.querySelector(`a[href="${derryHref}"]`)){
      const link=document.createElement('a');
      link.href=derryHref;
      link.textContent='Derry';
      const combined=column.querySelector('a[href="/areas/derry-strabane/"]');
      if(combined)column.insertBefore(link,combined);else column.appendChild(link);
    }
    const combined=column.querySelector('a[href="/areas/derry-strabane/"]');
    if(combined)combined.textContent='Strabane & north-west';
  });

  if(location.pathname==='/'||location.pathname==='/index.html'){
    const belfastCard=[...document.querySelectorAll('a.card-link[href="/areas/belfast-lisburn/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Belfast'));
    if(belfastCard){
      belfastCard.href=belfastHref;
      const title=belfastCard.querySelector('h3');
      const copy=belfastCard.querySelector('p');
      const cta=belfastCard.querySelector('.text-link');
      if(title)title.textContent='Belfast';
      if(copy)copy.textContent='Dedicated PAT testing for Belfast offices, retail, hospitality, salons, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Belfast →';
    }
    const derryCard=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Derry'));
    if(derryCard){
      derryCard.href=derryHref;
      const title=derryCard.querySelector('h3');
      const copy=derryCard.querySelector('p');
      const cta=derryCard.querySelector('.text-link');
      if(title)title.textContent='Derry';
      if(copy)copy.textContent='Dedicated PAT testing for Derry/Londonderry offices, retail, hospitality, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Derry →';
    }
  }

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

  if(location.pathname==='/areas/derry-strabane/'||location.pathname==='/areas/derry-strabane/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${derryHref}"]`)){
      const link=document.createElement('a');
      link.className='btn-light';
      link.href=derryHref;
      link.textContent='Looking for Derry? View Derry PAT testing';
      actions.appendChild(link);
    }
  }

  if(location.pathname==='/areas/'||location.pathname==='/areas/index.html'){
    const card=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Derry'));
    if(card){
      const derryCard=card.cloneNode(true);
      derryCard.href=derryHref;
      const title=derryCard.querySelector('h3');
      const copy=derryCard.querySelector('p');
      const cta=derryCard.querySelector('.text-link');
      if(title)title.textContent='Derry';
      if(copy)copy.textContent='Dedicated PAT testing information for Derry/Londonderry businesses, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Derry →';
      card.parentNode.insertBefore(derryCard,card);
      const oldTitle=card.querySelector('h3');
      const oldCopy=card.querySelector('p');
      if(oldTitle)oldTitle.textContent='Strabane & north-west';
      if(oldCopy)oldCopy.textContent='PAT testing for Strabane and wider north-west businesses, clubs, churches and organisations.';
    }
  }

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
