// Smooth scrolling for anchor links using native JavaScript
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOut(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    const easeInOut = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  
    requestAnimationFrame(animation);
  };
  
  document.addEventListener('DOMContentLoaded', async function () {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
      });
    }, { threshold: 0.5 });
  
    // Elements to be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => observer.observe(element));
  
    // Typewriter effect for hero section
    const textElement = document.getElementById('animatedText');
    const professions = ["Developer", "Designer", "Coder"];
    let charIndex = 0;
    let professionIndex = 0;
  
    async function typeWriter() {
      while (charIndex < professions[professionIndex].length) {
        textElement.innerHTML += professions[professionIndex].charAt(charIndex);
        charIndex++;
        await sleep(100);
      }
      await eraseText();
    }
  
    async function eraseText() {
      while (charIndex > 0) {
        textElement.innerHTML = professions[professionIndex].substring(0, charIndex - 1);
        charIndex--;
        await sleep(50);
      }
      professionIndex = (professionIndex + 1) % professions.length;
      await sleep(500);
      typeWriter();
    }
  
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    typeWriter(); // Start the typewriter effect
  
    // Event listener for smooth scrolling on anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
  
        const target = this.getAttribute('href');
        smoothScroll(target, 800);
      });
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
  
    // Toggle Night Mode
    function toggleNightMode() {
      body.classList.toggle('night-mode');
    }
  
    // Add event listener to a button or icon for toggling night mode
    const nightModeToggleBtn = document.getElementById('nightModeToggleBtn');
  
    if (nightModeToggleBtn) {
      nightModeToggleBtn.addEventListener('click', toggleNightMode);
    }
  });
    