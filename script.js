// Loader with fade-out animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  
  // Add fade-out class
  loader.classList.add("fade-out");
  
  // Remove loader after animation completes
  setTimeout(() => {
    loader.style.display = "none";
    // Trigger initial scroll reveal check
    checkReveal();
  }, 800);
});

// Enhanced typing effect with multiple texts and blinking cursor
const texts = [
  "Digital Marketing Specialist",
  "SEO & Growth Strategist",
  "Data-Driven Marketer",
  "Social Media Expert"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const typing = document.querySelector(".typing");

function type() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    // Deleting text
    typing.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Typing text
    typing.innerHTML = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  // When text is fully typed
  if (!isDeleting && charIndex === currentText.length) {
    // Pause at the end before deleting
    isDeleting = true;
    typingSpeed = 1500;
  } 
  // When text is fully deleted
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500;
  }
  
  setTimeout(type, typingSpeed);
}

// Start typing effect after a brief delay
setTimeout(type, 1000);

// Scroll reveal with intersection observer (more efficient)
const reveals = document.querySelectorAll(".reveal");

// Create intersection observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      
      // Add staggered animation delay for cards
      if (entry.target.classList.contains("card-grid")) {
        const cards = entry.target.querySelectorAll(".card");
        cards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.1}s`;
        });
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

// Observe each reveal element
reveals.forEach(el => observer.observe(el));

// Manual check for elements already in view
function checkReveal() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

// Scroll progress bar with smooth animation
let progressBar = document.getElementById("progress-bar");
let isScrolling;
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  // Clear timeout while scrolling
  window.clearTimeout(isScrolling);
  
  // Calculate progress
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / height) * 100;
  
  // Update progress bar with smooth animation
  progressBar.style.width = scrollPercent + "%";
  
  // Detect scroll direction for additional effects
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    document.body.classList.add("scrolling-down");
    document.body.classList.remove("scrolling-up");
  } else {
    // Scrolling up
    document.body.classList.add("scrolling-up");
    document.body.classList.remove("scrolling-down");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  
  // Back to top button
  const topBtn = document.getElementById("topBtn");
  if (scrollTop > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = scrollTop / 1000;
    hero.style.transform = `translateY(${scrolled * 30}px)`;
    hero.style.opacity = 1 - scrolled * 0.5;
  }
  
  // Set timeout to run after scrolling stops
  isScrolling = setTimeout(() => {
    // Scrolling has stopped
    document.body.classList.remove("scrolling-down", "scrolling-up");
  }, 150);
});

// Enhanced copy function with visual feedback
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Copied to clipboard: <strong>${text}</strong></span>
    `;
    
    // Style notification
    notification.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      background: linear-gradient(135deg, #4facfe, #00f2fe);
      color: #000;
      padding: 15px 25px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      transform: translateX(150%);
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(150%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
    
    // Add click animation to the clicked element
    const clickedElement = event.target.closest('.contact-card');
    if (clickedElement) {
      clickedElement.classList.add('copied');
      setTimeout(() => {
        clickedElement.classList.remove('copied');
      }, 1000);
    }
    
  }).catch(err => {
    console.error('Failed to copy: ', err);
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      
      // Show success notification anyway
      const notification = document.createElement('div');
      notification.className = 'copy-notification';
      notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Copied to clipboard: <strong>${text}</strong></span>
      `;
      notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: #000;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        transform: translateX(150%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 10);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
      
    } catch (err) {
      // Show error notification
      const errorNotification = document.createElement('div');
      errorNotification.className = 'copy-notification error';
      errorNotification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>Failed to copy. Please select and copy manually.</span>
      `;
      errorNotification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #ff6b6b, #ffa726);
        color: #000;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        transform: translateX(150%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
      `;
      
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        errorNotification.style.transform = 'translateX(0)';
      }, 10);
      
      setTimeout(() => {
        errorNotification.style.transform = 'translateX(150%)';
        setTimeout(() => {
          document.body.removeChild(errorNotification);
        }, 500);
      }, 3000);
    }
    
    document.body.removeChild(textArea);
  });
}

// Back to top with smooth scroll
document.getElementById("topBtn").onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  
  // Add click animation
  const btn = document.getElementById("topBtn");
  btn.style.transform = "scale(0.9)";
  setTimeout(() => {
    btn.style.transform = "";
  }, 200);
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add CSS for the copy animation
const style = document.createElement('style');
style.textContent = `
  .copy-notification {
    font-family: 'Inter', sans-serif;
  }
  
  .contact-card.copied {
    animation: copiedPulse 0.5s ease;
  }
  
  @keyframes copiedPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  #loader.fade-out {
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  
  .scrolling-down #topBtn {
    transform: translateY(5px);
  }
  
  .scrolling-up #topBtn {
    transform: translateY(-5px);
  }
`;
document.head.appendChild(style);

// Add hover effect for cards on touch devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Initialize tooltips for contact cards
document.querySelectorAll('.contact-card').forEach(card => {
  card.setAttribute('title', 'Click to copy');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  const topBtn = document.getElementById('topBtn');
  
  if (e.key === 'Escape' && topBtn.style.display !== 'none') {
    topBtn.focus();
  }
  
  if (e.key === 'Enter' && document.activeElement === topBtn) {
    topBtn.click();
  }
});

// Page visibility change handling
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Page became visible again, retrigger animations
    checkReveal();
  }
});

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body for CSS transitions
  document.body.classList.add('loaded');
  
  // Initialize any other components here
  console.log('Portfolio loaded successfully!');
});
