(function(){
  const menuButton=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.mobile-menu');
  if(menuButton&&menu){
    if(!menu.id)menu.id='mobile-menu';
    menuButton.setAttribute('aria-controls',menu.id);
    const closeMenu=()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');};
    menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
  }

  const belfastHref='/areas/belfast/';
  const lisburnHref='/areas/lisburn/';
  const derryHref='/areas/derry/';
  const strabaneHref='/areas/strabane/';
  const armaghHref='/areas/armagh/';

  document.querySelectorAll('.desktop-nav .nav-dropdown').forEach(dropdown=>{
    const button=dropdown.querySelector('button');
    const panel=dropdown.querySelector('.dropdown-panel');
    if(!button||!panel||!button.textContent.trim().startsWith('Areas'))return;

    const insertBefore=(href,label,beforeHref)=>{
      if(panel.querySelector(`a[href="${href}"]`))return;
      const link=document.createElement('a');link.href=href;link.textContent=label;
      const before=panel.querySelector(`a[href="${beforeHref}"]`);
      if(before)panel.insertBefore(link,before);else panel.appendChild(link);
    };
    insertBefore(belfastHref,'Belfast','/areas/belfast-lisburn/');
    insertBefore(lisburnHref,'Lisburn','/areas/belfast-lisburn/');
    insertBefore(derryHref,'Derry','/areas/derry-strabane/');
    insertBefore(strabaneHref,'Strabane','/areas/derry-strabane/');
    insertBefore(armaghHref,'Armagh','/areas/armagh-craigavon/');

    const belfastRegion=panel.querySelector('a[href="/areas/belfast-lisburn/"]');
    if(belfastRegion)belfastRegion.textContent='Belfast & Lisburn region';
    const northWest=panel.querySelector('a[href="/areas/derry-strabane/"]');
    if(northWest)northWest.textContent='North-west coverage';
    const armaghCombined=panel.querySelector('a[href="/areas/armagh-craigavon/"]');
    if(armaghCombined)armaghCombined.textContent='Craigavon & Portadown';
  });

  const addMobileAreaLink=(href,label,afterHref)=>{
    if(!menu||menu.querySelector(`a[href="${href}"]`))return;
    const link=document.createElement('a');link.href=href;link.textContent=label;
    const after=afterHref?menu.querySelector(`a[href="${afterHref}"]`):null;
    const areasLink=menu.querySelector('a[href="/areas/"]');
    if(after)after.insertAdjacentElement('afterend',link);
    else if(areasLink)areasLink.insertAdjacentElement('beforebegin',link);
    else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  };
  addMobileAreaLink(belfastHref,'Belfast',null);
  addMobileAreaLink(lisburnHref,'Lisburn',belfastHref);
  addMobileAreaLink(derryHref,'Derry',lisburnHref);
  addMobileAreaLink(strabaneHref,'Strabane',derryHref);
  addMobileAreaLink(armaghHref,'Armagh',strabaneHref);

  document.querySelectorAll('.footer-grid > div').forEach(column=>{
    const heading=column.querySelector('h3');
    if(!heading||heading.textContent.trim()!=='Coverage')return;
    const insertBeforeRegional=(href,label,regionalHref)=>{
      if(column.querySelector(`a[href="${href}"]`))return;
      const link=document.createElement('a');link.href=href;link.textContent=label;
      const regional=column.querySelector(`a[href="${regionalHref}"]`);
      if(regional)column.insertBefore(link,regional);else column.appendChild(link);
    };
    insertBeforeRegional(belfastHref,'Belfast','/areas/belfast-lisburn/');
    insertBeforeRegional(lisburnHref,'Lisburn','/areas/belfast-lisburn/');
    insertBeforeRegional(derryHref,'Derry','/areas/derry-strabane/');
    insertBeforeRegional(strabaneHref,'Strabane','/areas/derry-strabane/');
    insertBeforeRegional(armaghHref,'Armagh','/areas/armagh-craigavon/');
    const belfastRegion=column.querySelector('a[href="/areas/belfast-lisburn/"]');
    if(belfastRegion)belfastRegion.textContent='Belfast & Lisburn region';
    const northWest=column.querySelector('a[href="/areas/derry-strabane/"]');
    if(northWest)northWest.textContent='North-west coverage';
    const armaghCombined=column.querySelector('a[href="/areas/armagh-craigavon/"]');
    if(armaghCombined)armaghCombined.textContent='Craigavon & Portadown';
  });

  if(location.pathname==='/'||location.pathname==='/index.html'){
    const belfastCard=[...document.querySelectorAll('a.card-link[href="/areas/belfast-lisburn/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Belfast'));
    if(belfastCard){
      const lisburnCard=belfastCard.cloneNode(true);
      lisburnCard.href=lisburnHref;
      const lt=lisburnCard.querySelector('h3');const lc=lisburnCard.querySelector('p');const lx=lisburnCard.querySelector('.text-link');
      if(lt)lt.textContent='Lisburn';if(lc)lc.textContent='Dedicated PAT testing for Lisburn offices, retail, hospitality, landlords and organisations.';if(lx)lx.textContent='PAT testing in Lisburn →';
      belfastCard.insertAdjacentElement('afterend',lisburnCard);
      belfastCard.href=belfastHref;
      const title=belfastCard.querySelector('h3');const copy=belfastCard.querySelector('p');const cta=belfastCard.querySelector('.text-link');
      if(title)title.textContent='Belfast';if(copy)copy.textContent='Dedicated PAT testing for Belfast offices, retail, hospitality, salons, landlords and organisations.';if(cta)cta.textContent='PAT testing in Belfast →';
    }
    const regionalCard=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Derry'));
    if(regionalCard){
      const strabaneCard=regionalCard.cloneNode(true);strabaneCard.href=strabaneHref;
      const st=strabaneCard.querySelector('h3');const sc=strabaneCard.querySelector('p');const sx=strabaneCard.querySelector('.text-link');
      if(st)st.textContent='Strabane';if(sc)sc.textContent='Dedicated PAT testing for Strabane businesses, schools, clubs, landlords and organisations.';if(sx)sx.textContent='PAT testing in Strabane →';
      regionalCard.insertAdjacentElement('afterend',strabaneCard);
      regionalCard.href=derryHref;
      const title=regionalCard.querySelector('h3');const copy=regionalCard.querySelector('p');const cta=regionalCard.querySelector('.text-link');
      if(title)title.textContent='Derry';if(copy)copy.textContent='Dedicated PAT testing for Derry/Londonderry offices, retail, hospitality, landlords and organisations.';if(cta)cta.textContent='PAT testing in Derry →';
    }
    const armaghCard=[...document.querySelectorAll('a.card-link[href="/areas/armagh-craigavon/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Armagh'));
    if(armaghCard){
      armaghCard.href=armaghHref;
      const title=armaghCard.querySelector('h3');const copy=armaghCard.querySelector('p');const cta=armaghCard.querySelector('.text-link');
      if(title)title.textContent='Armagh';if(copy)copy.textContent='Dedicated PAT testing for Armagh shops, offices, schools, cafés, salons, landlords and organisations.';if(cta)cta.textContent='PAT testing in Armagh →';
    }
  }

  if(location.pathname==='/areas/belfast-lisburn/'||location.pathname==='/areas/belfast-lisburn/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${belfastHref}"]`)){const link=document.createElement('a');link.className='btn-light';link.href=belfastHref;link.textContent='PAT Testing Belfast';actions.appendChild(link);}
    if(actions&&!actions.querySelector(`a[href="${lisburnHref}"]`)){const link=document.createElement('a');link.className='btn-light';link.href=lisburnHref;link.textContent='PAT Testing Lisburn';actions.appendChild(link);}
  }
  if(location.pathname==='/areas/derry-strabane/'||location.pathname==='/areas/derry-strabane/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${derryHref}"]`)){const link=document.createElement('a');link.className='btn-light';link.href=derryHref;link.textContent='PAT Testing Derry';actions.appendChild(link);}
    if(actions&&!actions.querySelector(`a[href="${strabaneHref}"]`)){const link=document.createElement('a');link.className='btn-light';link.href=strabaneHref;link.textContent='PAT Testing Strabane';actions.appendChild(link);}
  }
  if(location.pathname==='/areas/armagh-craigavon/'||location.pathname==='/areas/armagh-craigavon/index.html'){
    const actions=document.querySelector('.page-hero-actions');
    if(actions&&!actions.querySelector(`a[href="${armaghHref}"]`)){const link=document.createElement('a');link.className='btn-light';link.href=armaghHref;link.textContent='Looking for Armagh? View Armagh PAT testing';actions.appendChild(link);}
  }

  if(location.pathname==='/areas/'||location.pathname==='/areas/index.html'){
    const belfastRegional=[...document.querySelectorAll('a.card-link[href="/areas/belfast-lisburn/"]')][0];
    if(belfastRegional){
      if(!document.querySelector(`a.card-link[href="${belfastHref}"]`)){
        const card=belfastRegional.cloneNode(true);card.href=belfastHref;
        const t=card.querySelector('h3');const c=card.querySelector('p');const x=card.querySelector('.text-link');
        if(t)t.textContent='Belfast';if(c)c.textContent='Dedicated PAT testing information for Belfast businesses, landlords and organisations.';if(x)x.textContent='PAT testing in Belfast →';
        belfastRegional.parentNode.insertBefore(card,belfastRegional);
      }
      if(!document.querySelector(`a.card-link[href="${lisburnHref}"]`)){
        const card=belfastRegional.cloneNode(true);card.href=lisburnHref;
        const t=card.querySelector('h3');const c=card.querySelector('p');const x=card.querySelector('.text-link');
        if(t)t.textContent='Lisburn';if(c)c.textContent='Dedicated PAT testing information for Lisburn businesses, landlords and organisations.';if(x)x.textContent='PAT testing in Lisburn →';
        belfastRegional.parentNode.insertBefore(card,belfastRegional);
      }
      const t=belfastRegional.querySelector('h3');const c=belfastRegional.querySelector('p');const x=belfastRegional.querySelector('.text-link');
      if(t)t.textContent='Belfast & Lisburn region';if(c)c.textContent='Broader regional PAT testing coverage around Belfast and Lisburn.';if(x)x.textContent='View regional coverage →';
    }

    const regionalCard=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Derry'));
    if(regionalCard){
      if(!document.querySelector(`a.card-link[href="${derryHref}"]`)){
        const derryCard=regionalCard.cloneNode(true);derryCard.href=derryHref;
        const t=derryCard.querySelector('h3');const c=derryCard.querySelector('p');const x=derryCard.querySelector('.text-link');
        if(t)t.textContent='Derry';if(c)c.textContent='Dedicated PAT testing information for Derry/Londonderry businesses, landlords and organisations.';if(x)x.textContent='PAT testing in Derry →';
        regionalCard.parentNode.insertBefore(derryCard,regionalCard);
      }
      if(!document.querySelector(`a.card-link[href="${strabaneHref}"]`)){
        const strabaneCard=regionalCard.cloneNode(true);strabaneCard.href=strabaneHref;
        const t=strabaneCard.querySelector('h3');const c=strabaneCard.querySelector('p');const x=strabaneCard.querySelector('.text-link');
        if(t)t.textContent='Strabane';if(c)c.textContent='Dedicated PAT testing information for Strabane businesses, schools, landlords, clubs and organisations.';if(x)x.textContent='PAT testing in Strabane →';
        regionalCard.parentNode.insertBefore(strabaneCard,regionalCard);
      }
      const oldTitle=regionalCard.querySelector('h3');const oldCopy=regionalCard.querySelector('p');const oldCta=regionalCard.querySelector('.text-link');
      if(oldTitle)oldTitle.textContent='North-west coverage';if(oldCopy)oldCopy.textContent='Regional PAT testing coverage for other north-west locations, with travel confirmed before booking.';if(oldCta)oldCta.textContent='View north-west coverage →';
    }

    const armaghCard=[...document.querySelectorAll('a.card-link[href="/areas/armagh-craigavon/"]')].find(a=>a.querySelector('h3')?.textContent.includes('Armagh'));
    if(armaghCard&&!document.querySelector(`a.card-link[href="${armaghHref}"]`)){
      const dedicated=armaghCard.cloneNode(true);dedicated.href=armaghHref;
      const title=dedicated.querySelector('h3');const copy=dedicated.querySelector('p');const cta=dedicated.querySelector('.text-link');
      if(title)title.textContent='Armagh';if(copy)copy.textContent='Dedicated PAT testing information for Armagh businesses, schools, landlords, shops, cafés and organisations.';if(cta)cta.textContent='PAT testing in Armagh →';
      armaghCard.parentNode.insertBefore(dedicated,armaghCard);
      const oldTitle=armaghCard.querySelector('h3');const oldCopy=armaghCard.querySelector('p');
      if(oldTitle)oldTitle.textContent='Craigavon & Portadown';if(oldCopy)oldCopy.textContent='PAT testing for Craigavon and Portadown business parks, shops, offices, schools and commercial premises.';
    }
  }

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
