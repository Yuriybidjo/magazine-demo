export function initSponsorSlider() {
  let position = 0;
  let slidesToShow = 1;
  const slidesToScroll = 1;
  const gap = 20; //  Tailwind gap-5 (20px)

  let touchStartX = 0;
  let touchEndX = 0;

  const sliderWrapper = document.querySelector('.slider-wrapper');
  const track = document.querySelector('.slider-track');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const items = document.querySelectorAll('.slider-item');
  const itemsCount = items.length;

  // 1. Capture the starting position
  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // 2. Capture the ending position and calculate the swipe
  sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const swipeDistance = touchStartX - touchEndX;
    const threshold = 50; // Minimum distance to count as a swipe (in pixels)

    if (swipeDistance > threshold) {
      // Swiped Left -> Go to Next slide
      if (!btnNext.disabled) handleMove('next');
    } else if (swipeDistance < -threshold) {
      // Swiped Right -> Go to Previous slide
      if (!btnPrev.disabled) handleMove('prev');
    }
  };

  const updateSlider = () => {
    const width = window.innerWidth;

    if (width >= 1260) { slidesToShow = 5; } 
    else if (width >= 992) { slidesToShow = 4; } 
    else if (width >= 768) { slidesToShow = 3; } 
    else if (width >= 576) { slidesToShow = 2; } 
    else { slidesToShow = 1; }

    // Calculate width including the gap logic
    const totalGapWidth = gap * (slidesToShow - 1);
    const itemWidth = (sliderWrapper.clientWidth - totalGapWidth) / slidesToShow;

    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
    });

    position = 0;
    track.style.transform = `translateX(0px)`;
    checkBtns(itemWidth);
  };

  const handleMove = (direction) => {
    const itemWidth = items[0].clientWidth;
    const movePosition = itemWidth + gap;

    if (direction === 'next') {
      position -= movePosition;
    } else {
      position += movePosition;
    }

    track.style.transform = `translateX(${position}px)`;
    checkBtns(itemWidth);
  };

  btnNext.addEventListener('click', () => handleMove('next'));
  btnPrev.addEventListener('click', () => handleMove('prev'));

  const checkBtns = (itemWidth) => {
    const movePosition = itemWidth + gap;
    btnPrev.disabled = position === 0;
    btnNext.disabled = Math.abs(position) >= (itemsCount - slidesToShow) * movePosition;
  };

  window.addEventListener('resize', updateSlider);
  updateSlider();
}