(() => {
  const leafletEl = document.querySelector('.leaflet');

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

  leafletEl.addEventListener('click', e => {
    const eventEl = getDelegationEventEl(e.target, 'page');

    if (!eventEl) return;

    eventEl.classList.add('is-fliped');
  });
})();
