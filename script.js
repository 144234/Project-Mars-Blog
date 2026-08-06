// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

// Close sidebar when clicking a link
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => {
    toggleSidebar();
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Scroll Animation for Cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.category-card, .post-card, .contact-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Add Active State to Navigation
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-right a, .sidebar-link').forEach(link => {
  if (link.getAttribute('href') === currentPath.split('/').pop()) {
    link.style.color = 'var(--light-blue)';
    if (link.classList.contains('sidebar-link')) {
      link.style.borderLeftColor = 'var(--medium-blue)';
      link.style.background = 'var(--dark-blue)';
    }
  }
});

// Reading Progress Bar (for article pages)
function createReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--medium-blue), var(--light-blue));
    width: 0%;
    z-index: 1002;
    transition: width 0.1s;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize on article pages
if (document.querySelector('.article-content')) {
  createReadingProgress();
}

// Add Share Buttons
function addShareButtons() {
  const shareContainer = document.createElement('div');
  shareContainer.className = 'share-buttons';
  shareContainer.style.cssText = `
    margin: 30px 0;
    padding: 25px;
    background: var(--bg-beige);
    border-radius: 8px;
    border: 2px solid var(--medium-blue);
  `;
  
  const shareTitle = document.createElement('p');
  shareTitle.textContent = 'Share this article:';
  shareTitle.style.cssText = `
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--darkest-blue);
    font-size: 1.1rem;
  `;
  
  const platforms = [
    { name: 'Twitter', url: 'https://twitter.com/intent/tweet' },
    { name: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/shareArticle' }
  ];
  
  const shareButtons = platforms.map(platform => {
    const btn = document.createElement('a');
    btn.textContent = `Share on ${platform.name}`;
    btn.href = '#';
    btn.target = '_blank';
    btn.style.cssText = `
      display: inline-block;
      padding: 10px 20px;
      margin: 5px;
      background: var(--dark-blue);
      color: var(--white);
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    `;
    
    btn.onmouseover = () => {
      btn.style.background = 'var(--medium-blue)';
      btn.style.transform = 'translateY(-2px)';
    };
    
    btn.onmouseout = () => {
      btn.style.background = 'var(--dark-blue)';
      btn.style.transform = 'translateY(0)';
    };
    
    return btn;
  });
  
  shareContainer.appendChild(shareTitle);
  shareButtons.forEach(btn => shareContainer.appendChild(btn));
  
  const articleContent = document.querySelector('.article-content');
  if (articleContent) {
    articleContent.insertBefore(shareContainer, articleContent.lastChild);
  }
}

// Initialize share buttons
if (document.querySelector('.article-content')) {
  addShareButtons();
}

console.log('Project Mars Blog loaded successfully! 🚀');