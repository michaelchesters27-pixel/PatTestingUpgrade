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
  const armaghHref='/areas/armagh/';

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

    if(!panel.querySelector(`a[href="${armaghHref}"]`)){
      const link=document.createElement('a');
      link.href=armaghHref;
      link.textContent='Armagh';
      const combined=panel.querySelector('a[href="/areas/armagh-craigavon/"]');
      if(combined)panel.insertBefore(link,combined);else panel.appendChild(link);
    }

    const derryCombined=panel.querySelector('a[href="/areas/derry-strabane/"]');
    if(derryCombined)derryCombined.textContent='Strabane & north-west';
    const armaghCombined=panel.querySelector('a[href="/areas/armagh-craigavon/"]');
    if(armaghCombined)armaghCombined.textContent='Craigavon & Portadown';
  });

  const addMobileAreaLink=(href,label,afterHref)=>{
    if(!menu||menu.querySelector(`a[href="${href}"]`))return;
    const link=document.createElement('a');
    link.href=href;
    link.textContent=label;
    const after=afterHref?menu.querySelector(`a[href="${afterHref}"]`):null;
    const areasLink=menu.querySelector('a[href="/areas/"]');
    if(after)after.insertAdjacentElement('afterend',link);
    else if(areasLink)areasLink.insertAdjacentElement('beforebegin',link);
    else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  };
  addMobileAreaLink(belfastHref,'Belfast',null);
  addMobileAreaLink(derryHref,'Derry',belfastHref);
  addMobileAreaLink(armaghHref,'Armagh',derryHref);

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
    if(!column.querySelector(`a[href="${armaghHref}"]`)){
      const link=document.createElement('a');
      link.href=armaghHref;
      link.textContent='Armagh';
      const combined=column.querySelector('a[href="/areas/armagh-craigavon/"]');
      if(combined)column.insertBefore(link,combined);else column.appendChild(link);
    }
    const derryCombined=column.querySelector('a[href="/areas/derry-strabane/"]');
    if(derryCombined)derryCombined.textContent='Strabane & north-west';
    const armaghCombined=column.querySelector('a[href="/areas/armagh-craigavon/"]');
    if(armaghCombined)armaghCombined.textContent='Craigavon & Portadown';
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
    const armaghCard=[...document.querySelectorAll('a.card-link[href="/areas/armagh-craigavon/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Armagh'));
    if(armaghCard){
      armaghCard.href=armaghHref;
      const title=armaghCard.querySelector('h3');
      const copy=armaghCard.querySelector('p');
      const cta=armaghCard.querySelector('.text-link');
      if(title)title.textContent='Armagh';
      if(copy)copy.textContent='Dedicated PAT testing for Armagh shops, offices, schools, cafés, salons, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Armagh →';
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

  if(location.pathname==='/areas/armagh-craigavon/'||location.pathname==='/areas/armagh-craigavon/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${armaghHref}"]`)){
      const link=document.createElement('a');
      link.className='btn-light';
      link.href=armaghHref;
      link.textContent='Looking for Armagh? View Armagh PAT testing';
      actions.appendChild(link);
    }
  }

  if(location.pathname==='/areas/'||location.pathname==='/areas/index.html'){
    const derryCard=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Derry'));
    if(derryCard&&!document.querySelector(`a.card-link[href="${derryHref}"]`)){
      const dedicated=derryCard.cloneNode(true);
      dedicated.href=derryHref;
      const title=dedicated.querySelector('h3');
      const copy=dedicated.querySelector('p');
      const cta=dedicated.querySelector('.text-link');
      if(title)title.textContent='Derry';
      if(copy)copy.textContent='Dedicated PAT testing information for Derry/Londonderry businesses, landlords and organisations.';
      if(cta)cta.textContent='PAT testing in Derry →';
      derryCard.parentNode.insertBefore(dedicated,derryCard);
      const oldTitle=derryCard.querySelector('h3');
      const oldCopy=derryCard.querySelector('p');
      if(oldTitle)oldTitle.textContent='Strabane & north-west';
      if(oldCopy)oldCopy.textContent='PAT testing for Strabane and wider north-west businesses, clubs, churches and organisations.';
    }

    const armaghCard=[...document.querySelectorAll('a.card-link[href="/areas/armagh-craigavon/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Armagh'));
    if(armaghCard&&!document.querySelector(`a.card-link[href="${armaghHref}"]`)){
      const dedicated=armaghCard.cloneNode(true);
      dedicated.href=armaghHref;
      const title=dedicated.querySelector('h3');
      const copy=dedicated.querySelector('p');
      const cta=dedicated.querySelector('.text-link');
      if(title)title.textContent='Armagh';
      if(copy)copy.textContent='Dedicated PAT testing information for Armagh businesses, schools, landlords, shops, cafés and organisations.';
      if(cta)cta.textContent='PAT testing in Armagh →';
      armaghCard.parentNode.insertBefore(dedicated,armaghCard);
      const oldTitle=armaghCard.querySelector('h3');
      const oldCopy=armaghCard.querySelector('p');
      if(oldTitle)oldTitle.textContent='Craigavon & Portadown';
      if(oldCopy)oldCopy.textContent='PAT testing for Craigavon and Portadown business parks, shops, offices, schools and commercial premises.';
    }
  }

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
