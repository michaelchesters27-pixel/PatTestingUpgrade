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

  const dedicated=[
    {href:'/areas/belfast/',label:'Belfast',regional:'/areas/belfast-lisburn/'},
    {href:'/areas/lisburn/',label:'Lisburn',regional:'/areas/belfast-lisburn/'},
    {href:'/areas/derry/',label:'Derry',regional:'/areas/derry-strabane/'},
    {href:'/areas/strabane/',label:'Strabane',regional:'/areas/derry-strabane/'},
    {href:'/areas/armagh/',label:'Armagh',regional:'/areas/armagh-craigavon/'},
    {href:'/areas/craigavon/',label:'Craigavon',regional:'/areas/armagh-craigavon/'},
    {href:'/areas/portadown/',label:'Portadown',regional:'/areas/armagh-craigavon/'},
    {href:'/areas/newry/',label:'Newry',regional:'/areas/newry-down/'}
  ];

  const regionalLabels={
    '/areas/belfast-lisburn/':'Belfast & Lisburn region',
    '/areas/derry-strabane/':'North-west coverage',
    '/areas/armagh-craigavon/':'Upper Bann & County Armagh',
    '/areas/newry-down/':'County Down coverage'
  };

  document.querySelectorAll('.desktop-nav .nav-dropdown').forEach(dropdown=>{
    const button=dropdown.querySelector('button');
    const panel=dropdown.querySelector('.dropdown-panel');
    if(!button||!panel||!button.textContent.trim().startsWith('Areas'))return;
    dedicated.forEach(item=>{
      if(panel.querySelector(`a[href="${item.href}"]`))return;
      const link=document.createElement('a');link.href=item.href;link.textContent=item.label;
      const before=panel.querySelector(`a[href="${item.regional}"]`);
      if(before)panel.insertBefore(link,before);else panel.appendChild(link);
    });
    Object.entries(regionalLabels).forEach(([href,label])=>{const a=panel.querySelector(`a[href="${href}"]`);if(a)a.textContent=label;});
  });

  const areasLink=menu?.querySelector('a[href="/areas/"]');
  dedicated.forEach(item=>{
    if(!menu||menu.querySelector(`a[href="${item.href}"]`))return;
    const link=document.createElement('a');link.href=item.href;link.textContent=item.label;
    if(areasLink)areasLink.insertAdjacentElement('beforebegin',link);else menu.appendChild(link);
    link.addEventListener('click',()=>{menu.classList.remove('open');if(menuButton)menuButton.setAttribute('aria-expanded','false');});
  });

  document.querySelectorAll('.footer-grid > div').forEach(column=>{
    const heading=column.querySelector('h3');
    if(!heading||heading.textContent.trim()!=='Coverage')return;
    dedicated.forEach(item=>{
      if(column.querySelector(`a[href="${item.href}"]`))return;
      const link=document.createElement('a');link.href=item.href;link.textContent=item.label;
      const before=column.querySelector(`a[href="${item.regional}"]`);
      if(before)column.insertBefore(link,before);else column.appendChild(link);
    });
    Object.entries(regionalLabels).forEach(([href,label])=>{const a=column.querySelector(`a[href="${href}"]`);if(a)a.textContent=label;});
  });

  const cloneCard=(source,href,title,copy,cta,before=true)=>{
    if(!source||document.querySelector(`a.card-link[href="${href}"]`))return;
    const card=source.cloneNode(true);card.href=href;
    const t=card.querySelector('h3');const c=card.querySelector('p');const x=card.querySelector('.text-link');
    if(t)t.textContent=title;if(c)c.textContent=copy;if(x)x.textContent=cta;
    if(before)source.parentNode.insertBefore(card,source);else source.insertAdjacentElement('afterend',card);
  };
  const relabelCard=(card,title,copy,cta)=>{if(!card)return;const t=card.querySelector('h3');const c=card.querySelector('p');const x=card.querySelector('.text-link');if(t)t.textContent=title;if(c)c.textContent=copy;if(x)x.textContent=cta;};

  if(location.pathname==='/'||location.pathname==='/index.html'||location.pathname==='/areas/'||location.pathname==='/areas/index.html'){
    const belfastRegion=[...document.querySelectorAll('a.card-link[href="/areas/belfast-lisburn/"]')][0];
    cloneCard(belfastRegion,'/areas/belfast/','Belfast','Dedicated PAT testing for Belfast businesses, landlords and organisations.','PAT testing in Belfast →');
    cloneCard(belfastRegion,'/areas/lisburn/','Lisburn','Dedicated PAT testing for Lisburn businesses, landlords and organisations.','PAT testing in Lisburn →');
    relabelCard(belfastRegion,'Belfast & Lisburn region','Broader regional PAT testing coverage around Belfast and Lisburn.','View regional coverage →');

    const northWest=[...document.querySelectorAll('a.card-link[href="/areas/derry-strabane/"]')][0];
    cloneCard(northWest,'/areas/derry/','Derry','Dedicated PAT testing for Derry/Londonderry businesses, landlords and organisations.','PAT testing in Derry →');
    cloneCard(northWest,'/areas/strabane/','Strabane','Dedicated PAT testing for Strabane businesses, schools, clubs and organisations.','PAT testing in Strabane →');
    relabelCard(northWest,'North-west coverage','Regional PAT testing coverage for other north-west locations.','View north-west coverage →');

    const armaghRegion=[...document.querySelectorAll('a.card-link[href="/areas/armagh-craigavon/"]')][0];
    cloneCard(armaghRegion,'/areas/armagh/','Armagh','Dedicated PAT testing for Armagh businesses, schools, shops and organisations.','PAT testing in Armagh →');
    cloneCard(armaghRegion,'/areas/craigavon/','Craigavon','Dedicated PAT testing for Craigavon offices, retail, schools, workshops and organisations.','PAT testing in Craigavon →');
    cloneCard(armaghRegion,'/areas/portadown/','Portadown','Dedicated PAT testing for Portadown shops, offices, schools, workshops and organisations.','PAT testing in Portadown →');
    relabelCard(armaghRegion,'Upper Bann & County Armagh','Broader regional PAT testing coverage across Upper Bann and surrounding County Armagh.','View regional coverage →');

    const downRegion=[...document.querySelectorAll('a.card-link[href="/areas/newry-down/"]')][0];
    cloneCard(downRegion,'/areas/newry/','Newry','Dedicated PAT testing for Newry businesses, landlords, schools and organisations.','PAT testing in Newry →');
    relabelCard(downRegion,'County Down coverage','Regional PAT testing coverage for Banbridge, Downpatrick, Bangor and wider County Down.','View County Down coverage →');
  }

  const regionButtons={
    '/areas/belfast-lisburn/':[['/areas/belfast/','PAT Testing Belfast'],['/areas/lisburn/','PAT Testing Lisburn']],
    '/areas/derry-strabane/':[['/areas/derry/','PAT Testing Derry'],['/areas/strabane/','PAT Testing Strabane']],
    '/areas/armagh-craigavon/':[['/areas/armagh/','PAT Testing Armagh'],['/areas/craigavon/','PAT Testing Craigavon'],['/areas/portadown/','PAT Testing Portadown']],
    '/areas/newry-down/':[['/areas/newry/','PAT Testing Newry']]
  };
  const path=location.pathname.replace(/index\.html$/,'');
  Object.entries(regionButtons).forEach(([regional,buttons])=>{
    if(path!==regional)return;
    const actions=document.querySelector('.page-hero-actions');if(!actions)return;
    buttons.forEach(([href,label])=>{if(actions.querySelector(`a[href="${href}"]`))return;const a=document.createElement('a');a.className='btn-light';a.href=href;a.textContent=label;actions.appendChild(a);});
  });

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();});
  document.querySelectorAll('[data-year]').forEach(year=>year.textContent=new Date().getFullYear());
})();
