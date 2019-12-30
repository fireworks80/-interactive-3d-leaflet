(() => {
  const leafletEl = document.querySelector('.leaflet');
  const pageEls = document.querySelectorAll('.page');

  const getDelegationEventEl = (target, className) => {
    while (!target.classList.contains(className)) {
      target = target.parentNode;

      if (target.nodeName.toLowerCase() === 'body') {
        target = null;
        return;
      }
    }
    return target;
  };

  const closeLeaflet = () => {
    pageEls[2].classList.remove('is-fliped');
    setTimeout(() => {
      pageEls[0].classList.remove('is-fliped');
    }, 500);
  };

  const zoomIn = menuItemEl => {
    const rect = menuItemEl.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (rect.x + rect.width / 2);
    const dy = window.innerHeight / 2 - (rect.y + rect.height / 2);
    let angle;
    const pageEl = menuItemEl.parentNode.parentNode.parentNode;

    switch (parseInt(pageEl.dataset.page)) {
      case 1:
        angle = -30;
        break;
      case 2:
        angle = 0;
        break;
      case 3:
        angle = 30;
        break;
    }

    leafletEl.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
  };

  leafletEl.addEventListener('click', e => {
    const eventEl = getDelegationEventEl(e.target, 'page');

    if (!eventEl) return;
    eventEl.classList.add('is-fliped');

    // close all
    const closeAllBtn = getDelegationEventEl(e.target, 'page__close');
    if (closeAllBtn) closeLeaflet();

    const menuItemEl = getDelegationEventEl(e.target, 'member');
    if (menuItemEl) zoomIn(menuItemEl);
  });
})();
