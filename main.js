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

  leafletEl.addEventListener('click', e => {
    const eventEl = getDelegationEventEl(e.target, 'page');

    if (!eventEl) return;
    eventEl.classList.add('is-fliped');

    // close all
    const closeAllBtn = getDelegationEventEl(e.target, 'page__close');
    if (closeAllBtn) closeLeaflet();
  });
})();
