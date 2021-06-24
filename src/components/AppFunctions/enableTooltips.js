function enableTooltips() {
  const disableTooltip = (event) => {
    event.target.removeEventListener('mouseleave', disableTooltip);
    const active = document.querySelector('.tooltip.active');
    if (active === null) return;
    active.classList.remove('active');
  };

  document.querySelector('body').addEventListener('mouseover', event => {
    if (event.target.matches('.tooltip-trigger')) {
      const target = event.target.dataset.tooltipTarget;
      const targetElement = document.getElementById(`tooltip-${target}`);
      targetElement.classList.add('active');
      event.target.addEventListener('mouseleave', disableTooltip);

      const rect = event.target.getBoundingClientRect();
      targetElement.style.bottom = window.innerHeight - rect.top - 10 + 'px';
      targetElement.style.left = Math.max(
        Math.min(rect.left + rect.width / 2 - 200, window.innerWidth - 400),
        0
      ) + 'px';
    }
  });
}

export default enableTooltips;