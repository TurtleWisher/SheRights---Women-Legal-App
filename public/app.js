document.addEventListener('DOMContentLoaded', () => {
  const mainTitle = document.getElementById('main-title');
  const backgroundTagline = document.getElementById('background-tagline');

  console.log('mainTitle:', mainTitle);
  console.log('backgroundTagline:', backgroundTagline);

  if (mainTitle && backgroundTagline) {
    mainTitle.addEventListener('mouseenter', () => {
      backgroundTagline.style.opacity = '1';
      backgroundTagline.style.zIndex = '2';
      backgroundTagline.style.fontWeight = '600';
      backgroundTagline.style.position = 'absolute';
      backgroundTagline.style.top = '50%';
      backgroundTagline.style.left = '50%';
      backgroundTagline.style.transformOrigin = 'center center';
      backgroundTagline.style.transform = 'translate(-50%, -50%) scale(0.7)';
      backgroundTagline.style.width = '80%';
      backgroundTagline.style.background = 'linear-gradient(to right, #dcdcdc, #007bff)';
      backgroundTagline.style.backgroundClip = 'text';
      backgroundTagline.style.webkitBackgroundClip = 'text';
      backgroundTagline.style.color = 'transparent';
      mainTitle.style.transform = 'translateY(-20%) scale(0.7)';
      mainTitle.style.opacity = '0.7';
      mainTitle.style.zIndex = '1';
      mainTitle.style.transition = 'all 0.5s ease';
      mainTitle.style.background = 'linear-gradient(to right, #dcdcdc, #007bff)';
      mainTitle.style.backgroundClip = 'text';
      mainTitle.style.webkitBackgroundClip = 'text';
      mainTitle.style.color = 'transparent';
    });

    mainTitle.addEventListener('mouseleave', () => {
      backgroundTagline.style.opacity = '0.6';
      backgroundTagline.style.zIndex = '1';
      backgroundTagline.style.fontWeight = '300';
      backgroundTagline.style.position = 'absolute';
      backgroundTagline.style.top = '50%';
      backgroundTagline.style.left = '50%';
      backgroundTagline.style.transformOrigin = 'center center';
      backgroundTagline.style.transform = 'translate(-50%, -50%) scale(1)';
      backgroundTagline.style.width = '90%';
      backgroundTagline.style.background = '';
      backgroundTagline.style.backgroundClip = '';
      backgroundTagline.style.webkitBackgroundClip = '';
      backgroundTagline.style.color = 'rgba(0, 0, 0, 0.15)';
      mainTitle.style.transform = 'scale(0.9)';
      mainTitle.style.opacity = '1';
      mainTitle.style.zIndex = '2';
      mainTitle.style.transition = 'all 0.5s ease';
      mainTitle.style.background = '';
      mainTitle.style.backgroundClip = '';
      mainTitle.style.webkitBackgroundClip = '';
      mainTitle.style.color = 'white';
    });
  }

  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('click', () => {
      hero.classList.toggle('flipped');
    });
  }

  const footer = document.querySelector('footer');
  if (footer) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 10) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    });
  }
});
