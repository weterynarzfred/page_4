function startHoverDetection() {
  let hasHover = false;
  let lastTouchTime = 0;

  document.addEventListener('touchstart', () => {
    lastTouchTime = new Date();
    if (!hasHover) return;
    document.body.classList.remove('has-hover');
    hasHover = false;
  });

  document.addEventListener('mousemove', () => {
    if (hasHover) return;
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add('has-hover');
    hasHover = true;
  });
}

export default startHoverDetection;