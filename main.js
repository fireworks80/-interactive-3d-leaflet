(() => {
  const leafletEl = document.querySelector('.leaflet');
  const pageEls = document.querySelectorAll('.page');
  const handEl = document.querySelector('.hand');
  let currentMenu = null;

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
    if (leafletEl.classList.contains('is-zoomIn')) return;

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

    document.body.classList.add('is-zoomIn');
    leafletEl.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
    currentMenu = menuItemEl;
    menuItemEl.classList.add('is-selected');
  };

  const zoomOut = () => {
    leafletEl.style = null;
    document.body.classList.remove('is-zoomIn');

    if (currentMenu) {
      currentMenu.classList.remove('is-selected');
      currentMenu = null;
    }
  };

  const handPos = {
    x: 0,
    y: 0
  };
  const mousePos = {
    x: 0,
    y: 0
  };

  const onHandPosition = (x, y) => {
    // handPos = { x, y };
    const speed = 0.001;
    const distanceX = mousePos.x - handPos.x;
    const distanceY = mousePos.y - handPos.y;

    handPos.x += distanceX * speed;
    handPos.y += distanceY * speed;
    handEl.style.transform = `translate(${handPos.x - 50}px, ${handPos.y +
      30}px)`;

    requestAnimationFrame(() => onHandPosition(x, y));
  };

  leafletEl.addEventListener('click', e => {
    const eventEl = getDelegationEventEl(e.target, 'page');

    if (!eventEl) return;
    eventEl.classList.add('is-fliped');

    // close all
    const closeAllBtn = getDelegationEventEl(e.target, 'page__close');
    if (closeAllBtn) {
      zoomOut();
      closeLeaflet();
    }

    // zoom In - click element
    const menuItemEl = getDelegationEventEl(e.target, 'member');
    if (menuItemEl) zoomIn(menuItemEl);

    // zoom out
    const closeMenuItemBtn = getDelegationEventEl(e.target, 'member__btn');
    if (closeMenuItemBtn) zoomOut();
  });

  leafletEl.addEventListener('animationend', () => console.log('end'));

  window.addEventListener('mousemove', e => {
    mousePos.x = e.clientX - window.innerWidth * 0.7;
    mousePos.y = e.clientY - window.innerHeight * 0.7;

    onHandPosition();
  });
})();
